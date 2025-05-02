export enum ConnectionType {
    OAuth2 = 'OAuth2',
    ApiKey = 'ApiKey',
    Misc = 'Misc',
}
export interface ConnectionCardProps {
    title: string;
    description: string;
    logo: string;
    darkLogo: string;
    type: ConnectionType;
    clientId?: string;
    clientSecret?: string;
    oauthUrl?: string;
    published: boolean;
    showModal?: boolean;
    formElements?: ConnectionCardFormProps[];
}

export interface ConnectionCardFormProps {
    label: string;
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
}
