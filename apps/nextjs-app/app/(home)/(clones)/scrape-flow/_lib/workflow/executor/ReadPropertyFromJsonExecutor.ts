import {  ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { ReadPropertyFromJsonTask } from '../tasks/ReadPropertyFromJsonTask'

export async function ReadPropertyFromJsonExecutor(environment:ExecutionEnvironment<typeof ReadPropertyFromJsonTask>):Promise<boolean>{
    try{
        const jsonData = environment.getInput("JSON") as string;
        if (!jsonData) {
            environment.log.error("input-> JSON not defined");
            return false;
        }

        const propertyName = (environment.getInput("Property name") as string).trim();
        if (!propertyName) {
            environment.log.error("input-> Property name not defined");
            return false;
        }

        let json;
        try {
            json = JSON.parse(jsonData);
        } catch (e:any) {
            environment.log.error(`Failed to parse JSON: ${e.message}`);
            return false;
        }
        
        const propertyValue = json[propertyName]
        if(!propertyValue){
            environment.log.error(`Property ${propertyName} not found in JSON`)
            return false
        }


        environment.setOutput("Property value",propertyValue)
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}