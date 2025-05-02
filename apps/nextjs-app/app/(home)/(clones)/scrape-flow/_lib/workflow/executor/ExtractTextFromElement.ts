import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import * as cheerio from 'cheerio';
import { ExtractTextFromElementTask } from '../tasks/ExtractTextFromElementTask';

export async function ExtractTextFromElementExecutor(
    environment:ExecutionEnvironment<typeof ExtractTextFromElementTask>):Promise<boolean>{
    try{
        const selector = environment.getInput("Selector")
        if(!selector){
            environment.log.error("Selector not defined")
            return false
        }
        const html = environment.getInput("Html")
        if(!html){
            environment.log.error("Html not found")
            return false
        }
        const $ = cheerio.load(html)
        const element = $(selector)

        if(!element){
            environment.log.error("Element not found")
            return false
        }

        const extractedText = $.text(element)

        if(!extractedText){
            environment.log.error("Failed to extract text")
            return false
        }

        environment.setOutput("Extracted Text",extractedText)

        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}