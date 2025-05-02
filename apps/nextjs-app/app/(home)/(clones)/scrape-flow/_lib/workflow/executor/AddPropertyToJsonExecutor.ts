import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { AddPropertyToJsonTask } from '../tasks/AddPropertyToJson';

export async function AddPropertyToJsonExecutor(
    environment:ExecutionEnvironment<typeof AddPropertyToJsonTask>):Promise<boolean>{
    try{
        const jsonData = environment.getInput("JSON") as string;
        if (!jsonData) {
            environment.log.error("input-> JSON not defined");
            return false;
        }

        const propertyName = (environment.getInput("Property name") as string).trim();
        if (!propertyName) {
            environment.log.error("input-> Property name not defined");
            return false;
        }

        const propertyValue= (environment.getInput("Property value") as string).trim();
        if (!propertyValue) {
            environment.log.error("input-> Property value not defined");
            return false;
        }

        let json;
        try {
            json = JSON.parse(jsonData);
        } catch (e:any) {
            environment.log.error(`Failed to parse JSON: ${e.message}`);
            return false;
        }

        json[propertyName] = propertyValue;       


        environment.setOutput("Updated JSON",JSON.stringify(json));
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}