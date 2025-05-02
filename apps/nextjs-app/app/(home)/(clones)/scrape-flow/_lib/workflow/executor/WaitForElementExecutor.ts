import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { WaitForElementTask } from '../tasks/WaitForElementTask'


export async function WaitForElementExecutor(
    environment:ExecutionEnvironment<typeof WaitForElementTask>):Promise<boolean>{
    try{
        const selector = environment.getInput("Selector")
        if(!selector){
            environment.log.error("Selector not provided")
            return false
        }

        const visibility = environment.getInput("Visibility")
        if(!selector){
            environment.log.error("Selector not provided")
            return false
        }

        await environment.getPage()!.waitForSelector(selector,{visible: visibility === "visible",
            hidden: visibility === "hidden"
        })
        environment.log.info(`Element ${selector} is ${visibility}`)
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}