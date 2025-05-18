import { BaseModel } from "./BaseModel.js";
import { fal} from "@fal-ai/client"

import dotenv from "dotenv";
dotenv.config();

export class FalAIModel extends BaseModel{
    constructor() {
        super()
    }

    public async generateImage(prompt: string, tensorPath: string){
        const {request_id, response_url} = await fal.queue.submit("fal-ai/flux-lora",{
            input: {
                prompt: prompt,
                loras: [{path: tensorPath, scale: 1}],
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/image`,
        })
        return {request_id, response_url}
    }

    public async trainModel(zipUrl: string, triggerWord: string){
        const { request_id,response_url } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
            input: {
              images_data_url: zipUrl,
              trigger_word: triggerWord,
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/train`,
          });
        return {request_id, response_url}
    }

    public async generateImageSync(tensorPath: string){
        const response = await fal.subscribe("fal-ai/flux-lora", {
            input: {
                prompt: "Generate a head shot for this user in front of a white background",
                loras: [{path: tensorPath, scale: 1}],
              },
            })
        return {
            imageUrl: response.data.images[0]?.url as string
        }
        
    }


}