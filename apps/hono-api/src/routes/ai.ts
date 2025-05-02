import { chatCompletion } from "@repo/ai/openai/chatCompletion";
import { Hono } from "hono";


const aiRoutes = new Hono<{ Bindings: CloudflareBindings }>()


aiRoutes.post("/chatCompletion", async (c) => {
    const { model, systemMessage, userMessages, temperature } = await c.req.json();
    // @ts-ignore
    const apiKey = c.env.OPENAI_API_KEY;
    if(!apiKey) {
      return c.json({ error: 'OpenAI API key is missing' }, 400);
    }
    const response = await chatCompletion({ apiKey, model, systemMessage, userMessages, temperature });
    return c.json(response);
});


export default aiRoutes;