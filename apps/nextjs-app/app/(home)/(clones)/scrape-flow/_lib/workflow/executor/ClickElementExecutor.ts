import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { ClickElementTask } from '../tasks/ClickElementTask'

export async function ClickElementExecutor(environment:ExecutionEnvironment<typeof ClickElementTask>):Promise<boolean>{
    try{
        const selector = environment.getInput("Selector")
        if(!selector){
            environment.log.error("Selector not provided")
            return false
        }


        await environment.getPage()!.click(selector)
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}