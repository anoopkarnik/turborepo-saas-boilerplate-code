import OpenAI from "openai";
import { getApiKeyFromType } from "./baseServer";

export const chatCompletion = async ({apiKey,model,systemMessage,userMessages,temperature}:{
    apiKey:string, model:string, systemMessage:string, userMessages:string[], temperature?:number   
}) => {
    if(!apiKey){
        throw new Error('API key is missing')
    }
    const openai = new OpenAI({apiKey});

    let messages:any = []
    messages.push({role: 'system', content: systemMessage })
    userMessages.forEach((message) => {
        messages.push({ role: 'user',content: message })})

    const response = await openai.chat.completions.create({
        model: model,messages: messages, temperature: temperature});
    return response
}

export async function generateEmbedding(summary: string,modelType:string='text-embedding-3-small',
    apiKey?:string
) {
    if(!apiKey){
        apiKey = await getApiKeyFromType('openai')
    }
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    
    const embeddingResponse = await openai.embeddings.create({
        model: modelType,
        input: summary,
      });
    
      return embeddingResponse.data[0]?.embedding || [];
}