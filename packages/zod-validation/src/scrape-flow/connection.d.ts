import { z } from 'zod';
export declare const addApiKeyConnectionSchema: z.ZodObject<{
    connection: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    connection: string;
    apiKey: string;
    description?: string | undefined;
}, {
    name: string;
    connection: string;
    apiKey: string;
    description?: string | undefined;
}>;
export type addApiKeyConnectionSchemaType = z.infer<typeof addApiKeyConnectionSchema>;
export declare const addOAuthConnectionSchema: z.ZodObject<{
    connection: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    clientId: z.ZodString;
    clientSecret: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    connection: string;
    clientId: string;
    clientSecret: string;
    description?: string | undefined;
}, {
    name: string;
    connection: string;
    clientId: string;
    clientSecret: string;
    description?: string | undefined;
}>;
export type addOAuthConnectionSchemaType = z.infer<typeof addOAuthConnectionSchema>;
//# sourceMappingURL=connection.d.ts.map