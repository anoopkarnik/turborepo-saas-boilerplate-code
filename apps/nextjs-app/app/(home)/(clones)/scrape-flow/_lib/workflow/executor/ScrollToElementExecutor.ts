import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { ScrollToElementTask } from '../tasks/ScrollToElementTask'

export async function ScrollToElementExecutor(
    environment:ExecutionEnvironment<typeof ScrollToElementTask>):Promise<boolean>{
    try{
        const selector = environment.getInput("Selector")
        if(!selector){
            environment.log.error("Selector not provided")
            return false
        }

        await environment.getPage()!.evaluate((selector)=>{
            const element = document.querySelector(selector)
            if(!element){
                throw new Error(`Element with selector ${selector} not found`)
            }
            const top = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({top})

        },selector)

        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}