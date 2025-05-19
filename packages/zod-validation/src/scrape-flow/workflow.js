import { z } from 'zod';
export const createWorkflowSchema = z.object({
    name: z.string().max(80),
    description: z.string().optional(),
});
export const duplicateWorkflowSchema = createWorkflowSchema.extend({
    workflowId: z.string()
});
