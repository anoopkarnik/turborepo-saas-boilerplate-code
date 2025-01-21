import { TaskType } from "@repo/ts-types/scrape-flow/node";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnvironment, WorkflowTask } from "@repo/ts-types/scrape-flow/workflow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElement";

type ExecutorFn<T extends WorkflowTask> = (environment:ExecutionEnvironment<T >) => Promise<boolean>;

type RegistryType = {
    [K in TaskType]: ExecutorFn<WorkflowTask & {type: K}>;
}

export const ExecutorRegistry:RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor
}