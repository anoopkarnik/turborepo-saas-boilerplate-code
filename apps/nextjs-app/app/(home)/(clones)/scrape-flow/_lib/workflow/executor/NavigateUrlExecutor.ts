import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { NavigateUrlTask } from '../tasks/NavigateUrlTask'

export async function NavigateUrlExecutor(
    environment:ExecutionEnvironment<typeof NavigateUrlTask>):Promise<boolean>{
    try{
        const url= environment.getInput("URL")
        if(!url){
            environment.log.error("input-> url not provided")
            return false
        }

        await environment.getPage()!.goto(url)
        environment.log.info(`Navigated to ${url}`)
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}