import puppeteer from 'puppeteer'
import { ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow'
import { LaunchBrowserTask } from '../tasks/LaunchBrowserTask'
// import { exec } from 'child_process';
// import { waitFor } from '../../helper/waitFor';
import chromium from "@sparticuz/chromium";
// import puppeteerCore from "puppeteer-core";
chromium.setGraphicsMode =false

// const BROWSER_WS = process.env.BROWSER_WS

// Node.js Puppeteer - launch devtools locally  
    
// const openDevtools = async (page:any, client:any) => {  
//     // get current frameId  
//     const frameId = page.mainFrame()._id;  
//     // get URL for devtools from scraping browser  
//     const { url: inspectUrl } = await client.send('Page.inspect', { frameId });  
//     // open devtools URL in local chrome  
//     exec(`google-chrome "${inspectUrl}"`, error => {  
//         if (error)  
//             throw new Error('Unable to open devtools: ' + error);  
//     });  
//     // wait for devtools ui to load  
//     await waitFor(5000);  
// };  
  
export async function LaunchBrowserExecutor(
    environment:ExecutionEnvironment<typeof LaunchBrowserTask>):Promise<boolean>{
    try{
        environment.log.info('Launching browser...')
        const websiteUrl = environment.getInput('Website Url')

        const isLocal = process.env.NEXT_PUBLIC_URL?.includes('localhost')

        const browser = await puppeteer.launch({
            args: isLocal ? ['--no-sandbox', '--disable-setuid-sandbox'] : chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: isLocal ? undefined : await chromium.executablePath(),
            headless: isLocal ? false : chromium.headless
        })

        environment.log.info('Browser launched successfully')
        environment.setBrowser(browser as any)
        const page = await browser.newPage()

        // ***********launch with proxy************
        // const browser = await puppeteer.launch({
        //     headless:false,
        //     args: ['--no-sandbox', '--disable-setuid-sandbox',
        //         {`--proxy-server=${process.env.PROXY_SERVER}`},
        //     ],})
        // environment.log.info("Browser launched Successfully")
        // environment.setBrowser(browser)
        // const page = await browser.newPage()
        // await page.authenticate({
        //     username: process.env.PROXY_USERNAME,
        //     password: process.env.PROXY_PASSWORD,
        // })
        
        // ********launch remote browser with brightdata proxy**********
        // const browser = await puppeteer.connect({
        //     browserWSEndpoint: BROWSER_WS,
        // });
        // environment.log.info("Browser launched Successfully")
        // environment.setBrowser(browser)
        // const page = await browser.newPage()
        // const client = await page.createCDPSession();
        // await openDevtools(page,client)

        await page.goto(websiteUrl as string)
        environment.setPage(page as any)
        environment.log.info(`Opened page at ${websiteUrl}`)
        return true
    } catch(e:any){
        environment.log.error(e.message)
        return false
    }
}