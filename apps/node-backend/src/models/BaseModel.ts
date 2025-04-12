export abstract class BaseModel {
    constructor(){}

    abstract generateImage(prompt: string, tensorPath: string):Promise<{request_id: string, response_url: string}>

    abstract trainModel(zipUrl: string, triggerWord: string):Promise<{request_id: string, response_url: string}>
}