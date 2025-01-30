import { queryDatabase, createPage, modifyPage, getPage, getBlockChildren, deleteBlock, appendBlockChildren,
     getDatabaseProperties } from './index'; // Adjust the import path accordingly

     export async function queryNotionDatabase({ apiToken, database_id, filters = [], filter_condition = 'and', sorts = [], includes = [], cursor = null }:any) {
        let results = [];
        let { has_more, next_cursor, response } = await fetchNotionData(apiToken, database_id, filters, filter_condition, sorts, cursor);
        
        if (response.results.length > 0) {
            results = await Promise.all(response.results.map(modifyResult));
        }
        
        return { results, has_more, next_cursor };
    }
    
    export async function queryAllNotionDatabase({ apiToken, database_id, filters, filter_condition = 'and', sorts = [] }:any) {
        let results = [];
        let has_more = true;
        let cursor = null;
        
        while (has_more) {
            let { has_more: more, next_cursor, response } = await fetchNotionData(apiToken, database_id, filters, filter_condition, sorts, cursor);
            if (response.results.length > 0) {
                results.push(...(await Promise.all(response.results.map(modifyResult))));
            }
            has_more = more;
            cursor = next_cursor;
        }
        
        return { results };
    }
    
async function fetchNotionData(apiToken:string, database_id:string, filters:any[], filter_condition:string, sorts:any[], cursor:string | null) {
    let body = await constructFilterBody(filters, filter_condition, cursor);
    body = await constructSortBody(body, sorts);
    let response = await queryDatabase({ apiToken, database_id, body });
    return { has_more: response.has_more, next_cursor: response.next_cursor, response };
}

export const getNotionDatabaseProperties = async ({apiToken, database_id}:{apiToken:string, database_id:string}) => {
    const response = await getDatabaseProperties({apiToken,database_id});
    return response;
}

async function constructSortBody(body:any, sorts:any[]) {
    if (sorts.length > 0) {
        body['sorts']= sorts.map(modifySort);
    }
    return body;
}

function modifySort(sort:any) {
    if (sort.type === 'last_edited_time') {
        return { timestamp: 'last_edited_time', direction: sort.direction };
    } else if (['date', 'checkbox', 'multi_select', 'select', 'relation'].includes(sort.type)) {
        return { property: sort.name, direction: sort.direction };
    } else if (sort.type === 'created_time') {
        return { timestamp: 'created_time', direction: sort.direction };
    }
}

async function constructFilterBody(filters:any[],filter_condition:string, cursor:string|null) {
    const filtersBody:any = { filter: { } };
    filtersBody.filter[filter_condition] = [];
    if (cursor) {
        filtersBody['start_cursor'] = cursor;
    }
    filtersBody.filter[filter_condition] = filters.map(modifyFilter);

    return filtersBody;
}

function modifyFilter(filter:any) {
    if (filter.type === 'last_edited_time') {
        return { timestamp: 'last_edited_time', last_edited_time: { [filter.condition]: filter.value } };
    } else if (['date', 'checkbox', 'multi_select', 'select',  'relation', 'status','rich_text','number'].includes(filter.type)) {
        return { property: filter.name, [filter.type]: { [filter.condition]: filter.value } };
    } else if (filter.type === 'created_time'){
        return { timestamp: 'created_time', created_time: { [filter.condition]: filter.value } };
    } else if (filter.type === 'ID'){
        return { property: filter.name, "unique_id": { [filter.condition]: filter.value } };
    }
}

async function modifyResult(result:any){
    const resultBody: any = {};
    const properties = result.properties;
    for (const prop in properties) {
        resultBody[prop] = unmodifyProperty(properties[prop]);
    }
    resultBody['id'] = result.id;
    return resultBody;
}

async function queryPageBlocks(page_id:string, type:string, apiToken:string) {
    const response = await getBlockChildren({apiToken, block_id:page_id});

    if (response.results.length > 0) {
        if (type === 'parent') {
            const results:any = {};
            for (const result of response.results) {
                try {
                    const parentResult = modifyBlock(result);
                    const parentResultId = parentResult?.id;
                    const parentResultName = parentResult?.name;
                    const childResults = await queryPageBlocks(parentResultId, 'child',apiToken);
                    results[parentResultName] = {
                        id: parentResultId,
                        children: childResults
                    };
                } catch (error) {
                    console.log(`Error in ${JSON.stringify(result)}`);
                }
            }
            return results;
        } else if (type === 'child') {
            return response.results.map(result => {
                const childResult = modifyBlock(result);
                const childResultName = childResult?.name;
                return childResultName.includes('\n') ? childResultName.split('\n') : childResultName;
            }).flat();
        }
    }
    return [];
}

function modifyBlock(block:any) {
    if (block.heading_3) {
        return {
            name: block.heading_3.rich_text[0].text.content,
            id: block.has_children ? block.id : undefined
        };
    } else if (block.numbered_list_item) {
        return {
            name: block.numbered_list_item.rich_text[0].text.content,
            id: block.has_children ? block.id : undefined
        };
    } else if (block.code) {
        return {
            name: block.code.rich_text[0].text.content,
            id: block.has_children ? block.id : undefined
        };
    }
}

export const modifyNotionPage = async ({apiToken,page_id, properties}:{apiToken:string, page_id:string, properties:any[]}) => {
    const body:any = await constructUpdateBody(properties);
    console.log(`body - ${JSON.stringify(body)}`);
    const response = await modifyPage({apiToken, page_id, body});
    return modifyResult(response);
}

async function constructUpdateBody(properties:any[]) {
    const propertiesBody:any = {};
    for (let property of properties) {
        propertiesBody[property.name] = await modifyProperty(property);
    };
    return { properties: propertiesBody };
}

export const createNotionPage = async({apiToken,database_id, properties}:{apiToken:string,
     database_id:string, properties:any[]}) => {
    const body:any = await constructCreateBody(database_id, properties);
    console.log(`body - ${JSON.stringify(body)}`);
    const response = await createPage({apiToken,body});
    return modifyResult(response);
}

async function constructCreateBody(database_id:string, properties:any[]) {
    const propertiesBody:any = {};
    for (let property of properties){
        propertiesBody[property.name] = await modifyProperty(property);
    }
    return {
        parent: {
            type: 'database_id',
            database_id: database_id
        },
        properties: propertiesBody
    };
}

async function modifyProperty(property:any) {
    switch (property.type) {
        case 'text':
            return { rich_text: [{ text: { content: property.value } }] };
        case 'title':

            return { title: [{ text: { content: property.value } }] };
        case 'date':
            return { date: { start: property.value || '1900-01-01' } };
        case 'number':
            return { number: property.value };
        case 'file_url':
            return { files: [{ type: 'external', name: 'Cover', external: { url: property.value } }] };
        case 'url':
            return { url: property.value };
        case 'checkbox':
            return { checkbox: property.value };
        case 'select':
            return { select: { name: property.value } };
        case 'multi_select':
            return { multi_select: property.value.map((value:any) => ({ name: value })) };
        case 'relation':
            return { relation: property.value.map((value:any) => ({ id: value })) };
        case 'status':
            return { status: { name: property.value } };
    }
}

function unmodifyProperty(prop:any) {
    const dateOptions = {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }
    switch (prop.type) {
        case 'unique_id':
            return `${prop.unique_id.prefix}-${prop.unique_id.number}`;
        case 'relation':
            return prop.relation.map((x:any) => x.id);
        case 'number':
            return prop.number;
        case 'select':
            return prop.select ? prop.select.name : null;
        case 'title':
            if (prop.title.length > 0) {
                return prop.title[0].plain_text;
            }
            else{
                return '';
            }
        case 'rich_text':
            return prop.rich_text.length > 0 ? prop.rich_text[0].text.content : '';
        case 'rollup':
            return unmodifyProperty(prop.rollup);
        case 'people':
            return prop.people.map((x:any) => x.name);
        case 'status':
            return prop.status ? prop.status.name : null;
        case 'date':
            return prop.date ? prop.date.start : null;
        case 'last_edited_time':
            const date1 = new Date(prop.last_edited_time);
            const day1 = date1.getUTCDate().toString().padStart(2, '0');
            const month1 = date1.toLocaleString('en-GB', { month: 'short' });
            const hours1 = date1.getUTCHours().toString().padStart(2, '0');
            const minutes1 = date1.getUTCMinutes().toString().padStart(2, '0');
            return `${day1} ${month1} ${hours1}:${minutes1}`;
        case 'created_time':
            const date = new Date(prop.created_time);
            const day = date.getUTCDate().toString().padStart(2, '0');
            const month = date.toLocaleString('en-GB', { month: 'short' });
            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
            return `${day} ${month} ${hours}:${minutes}`;
        case 'multi_select':
            return prop.multi_select.map((x:any) => x.name);
        case 'array':
            return prop.array.map((x:any) => unmodifyProperty(x));
        case 'files':
            if (prop.files.length > 0) {
                if(prop.files[0].type === 'external'){
                    return prop.files[0].external.url;
                }
                else if(prop.files[0].type === 'file'){
                    return prop.files[0].file.url;
                }
            }
            return '';
        case 'url':
            return prop.url;
        case 'checkbox':
            return prop.checkbox;
        case 'formula':
            return prop.formula.number || prop.formula.string;
        case 'file_url':
            return prop.files[0].external.url;
    }
}

async function addChildrenToPage(apiToken:string, page_id:string, children:any) {
    const body:any = constructChildrenBody(children);
    const response = await appendBlockChildren({apiToken,block_id:page_id, children:body});
    return { message: 'Added the children' };
}

function constructChildrenBody(children:any) {
    const childrenBodyList = children.map((child:any) => {
        return {
            [child.type]: modifyChildrenProperty(child)
        };
    });
    return { children: childrenBodyList };
}

function modifyChildrenProperty(prop:any) {
    switch (prop.type) {
        case 'table_of_contents':
            return { color: 'default' };
        case 'callout':
            return prop.value;
        case 'embed':
            return { url: prop.value };
        default:
            return { rich_text: [{ text: { content: prop.value } }] };
    }
}

async function deletePageBlocks(apiToken:string,block_id:string) {
    const response = await getBlockChildren({apiToken,block_id});
    if (response.results.length > 0) {
        for (const result of response.results) {
            await deleteBlock({apiToken,block_id:result.id});
        }
    }
    return { message: 'Deleted the children' };
}

export const getNotionPage = async ({apiToken,page_id}:{apiToken:string,page_id:string}) => {
    const response = await getPage({apiToken,page_id});
    return modifyResult(response);
}
