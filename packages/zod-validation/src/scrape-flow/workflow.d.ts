import { z } from 'zod';
export declare const createWorkflowSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
}>;
export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;
export declare const duplicateWorkflowSchema: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, {
    workflowId: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    name: string;
    workflowId: string;
    description?: string | undefined;
}, {
    name: string;
    workflowId: string;
    description?: string | undefined;
}>;
export type duplicateWorkflowSchemaType = z.infer<typeof duplicateWorkflowSchema>;
//# sourceMappingURL=workflow.d.ts.map