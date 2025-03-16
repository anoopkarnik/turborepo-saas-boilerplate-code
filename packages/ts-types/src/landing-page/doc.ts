export interface docCategoryProps {
    title: string;
    order: number;
    slug: string;
    description: string;
}

export interface blockProps {
    __component: string;
    body: string;
}

export interface docProps {
    title: string;
    slug: string;
    description: string;
    order: number;
    category: docCategoryProps;
    blocks: blockProps[];
    updatedAt: string;
    createdAt: string;
}