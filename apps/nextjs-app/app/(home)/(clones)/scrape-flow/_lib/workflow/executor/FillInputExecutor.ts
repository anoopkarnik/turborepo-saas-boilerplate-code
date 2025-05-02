import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { FillInputTask } from '../tasks/FillingInputTask'

export async function FillInputExecutor(
    environment:ExecutionEnvironment<typeof FillInputTask>):Promise<boolean>{
    try{
        const selector = environment.getInput("Selector")
        if(!selector){
            environment.log.error("Selector not provided")
            return false
        }

        const value = environment.getInput("Value")
        if(!value){
            environment.log.error("Value not provided")
            return false
        }
        await environment.getPage()!.type(selector,value)
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}