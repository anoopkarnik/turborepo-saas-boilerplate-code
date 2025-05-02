import { TaskParamType, TaskType } from "@repo/ts-types/scrape-flow/node";
import { WorkflowTask } from "@repo/ts-types/scrape-flow/workflow";
import { LaunchBrowserTask } from "./LaunchBrowserTask";
import { PageToHtmlTask } from "./PageToHtmlTask";
import { ExtractTextFromElementTask } from "./ExtractTextFromElementTask";
import { FillInputTask } from "./FillingInputTask";
import { ClickElementTask } from "./ClickElementTask";
import { WaitForElementTask } from "./WaitForElementTask";
import { DeliverViaWebhookTask } from "./DeliverViaWebhook";
import { ExtractDataWithAITask } from "./ExtractDataWithAI";
import { ReadPropertyFromJsonTask } from "./ReadPropertyFromJsonTask";
import {  AddPropertyToJsonTask } from "./AddPropertyToJson";
import { NavigateUrlTask } from "./NavigateUrlTask";
import { ScrollToElementTask } from "./ScrollToElementTask";

type Registry = {
    [K in TaskType]: WorkflowTask & {type: K}
}

export const TaskRegistry:Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHtmlTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
    FILL_INPUT: FillInputTask,
    CLICK_ELEMENT: ClickElementTask,
    WAIT_FOR_ELEMENT: WaitForElementTask,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAITask,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
    NAVIGATE_URL: NavigateUrlTask,
    SCROLL_TO_ELEMENT: ScrollToElementTask
}

export const ColorForHandle: Record<TaskParamType,string> = {
    BROWSER_INSTANCE:  "!bg-sky-400",
    STRING: "!bg-amber-400",
    SELECT: "!bg-rose-400",
    APIKEYS: "!bg-teal-400"
}