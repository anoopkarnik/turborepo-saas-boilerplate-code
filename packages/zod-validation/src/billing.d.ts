import { z } from 'zod';
export declare const billingAddressSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipcode: z.ZodString;
    country: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}, {
    name: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}>;
export type billingAddressSchemaType = z.infer<typeof billingAddressSchema>;
//# sourceMappingURL=billing.d.ts.map