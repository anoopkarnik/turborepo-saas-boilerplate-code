import * as z from 'zod'

export const TrainModel = z.object({
    name: z.string().max(30),
    type: z.string().max(30),
    age: z.number().min(0).max(100),
    ethnicity: z.string(),
    eyeColor: z.string(),
    bald: z.boolean(),
    zippedImages: z.string().max(500),
})
