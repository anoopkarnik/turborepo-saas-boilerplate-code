export interface authorProps {
    name: string;
    email: string;
}

export interface categoryProps {
    name: string;
}

export interface imageProps {
    url: string
}

export interface formatProps {
    large: imageProps;
    medium: imageProps;
    small: imageProps;
    thumbnail: imageProps;
}

export interface coverProps{
    name: string;
    formats: formatProps;
}

export interface blockProps {
    __component: string;
    body: string;
}

export interface blogProps {
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    categories: categoryProps[];
    author: authorProps;
    cover: coverProps;
    blocks: blockProps[];
}