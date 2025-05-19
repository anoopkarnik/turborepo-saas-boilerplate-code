import { z } from 'zod';
export const billingAddressSchema = z.object({
    name: z.string().max(100),
    email: z.string().email(),
    street: z.string().max(100),
    city: z.string().max(100),
    state: z.string().max(100),
    zipcode: z.string().max(10),
    country: z.string().max(100),
});
