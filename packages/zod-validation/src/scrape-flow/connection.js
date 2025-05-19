import { z } from 'zod';
export const addApiKeyConnectionSchema = z.object({
    connection: z.string().max(30),
    name: z.string().max(30),
    description: z.string().max(80).optional(),
    apiKey: z.string().max(500),
});
export const addOAuthConnectionSchema = z.object({
    connection: z.string().max(30),
    name: z.string().max(30),
    description: z.string().max(80).optional(),
    clientId: z.string().max(500),
    clientSecret: z.string().max(500),
});
