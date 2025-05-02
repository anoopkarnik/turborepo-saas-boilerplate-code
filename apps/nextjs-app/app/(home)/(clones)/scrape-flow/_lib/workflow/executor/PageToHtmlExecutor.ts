import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { PageToHtmlTask } from '../tasks/PageToHtmlTask'

export async function PageToHtmlExecutor(
    environment:ExecutionEnvironment<typeof PageToHtmlTask>):Promise<boolean>{
    try{
        const html = await environment.getPage()!.content()
        environment.setOutput("Html",html)
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}