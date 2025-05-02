import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { DeliverViaWebhookTask } from '../tasks/DeliverViaWebhook'

export async function DeliverViaWebhookExecutor(environment:ExecutionEnvironment<typeof DeliverViaWebhookTask>):Promise<boolean>{
    try{
        const targetUrl = environment.getInput("Target URL")
        if(!targetUrl){
            environment.log.error("target url not provided")
            return false
        }
        const body = environment.getInput("Body")
        if(!body){
            environment.log.error("body not provided")
            return false
        }

        const payload: Record<string, any> = {
            content:body,
            username: "ScrapeFlow Notification",
        };

        const response = await fetch(targetUrl,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if(response.status!== 200 && response.status !== 204){
            environment.log.error(`Failed to deliver via webhook. Status: ${response.status}`)
            return false
        }



        // const responseBody = await response.json()
        // environment.log.info(`Delivered via webhook. Response: ${JSON.stringify(responseBody)}`)
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}