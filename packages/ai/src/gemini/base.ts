import { GoogleGenerativeAI } from "@google/generative-ai";


export async function chatCompletion(message: string[], modelType: string = 'gemini-1.5-flash',
    apiKey:string
) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: modelType
    })
    const response = await model.generateContent(message)
    return response.response.text()
}


export async function generateEmbedding(summary: string,modelType:string='text-embedding-004',
    apiKey:string
) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: modelType
    })
    const result = await model.embedContent(summary)
    return result.embedding
}