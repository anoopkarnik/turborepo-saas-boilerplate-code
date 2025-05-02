
import { Document } from "@langchain/core/documents"
import { chatCompletion } from "./base"

export const aiSummariseCommit = async (diff: string,apiKey:string,modelType?:string) => {
    const response = await chatCompletion([
        `You are an expert programmer, and you are trying to summarize a git diff. Reminders about the 
        git diff format: 
        For every file, there are a few metadata lines, like (for example):
        \'\'\' 
        diff --git a/lib/index.js b/lib/index.js
        index aadf691..bfef603 100644
        --- a/lib/index.js
        +++ b/lib/index.js
        \'\'\'
        This means that \'lib/index.js\' was modfied in this commit. Note that this is only an example.
        Then there is a specifier of the lines that were modified.
        A line starting with \'+\' means it was added.
        A line starting with \'-\' means that line was deleted.
        A line that starts with neither \'-\' or \'+\' is code given for context and better understanding.
        It is not part of the diff.
        [...]
        EXAMPLE SUMMARY COMMENTS:
        \'\'\'
        * Raised the amount of returned recordings from \'10\' to \'100\' [packages/server/recordings_api.ts
        ], [packages/server/constants.ts] 
        * Fixed a type in the github action name [.github/workflows/gpt-commit-summarizer.yml]
        * Moved the \'octokit\' initialization to a seperate file [src/octokit.ts], [src/index.ts] 
        * Added an OpenAI API for completions [packages/utils/apis/openai.ts]
        * Lowered numeric tolerance for test files
        \'\'\'
        Most commits will have less comments than this examples list.
        The last comment does not include the file names,
        because there were more than two relevant files in the hypothetical commit.
        Do not include parts of the example in your summary.
        It is given only as an example of appropriate comments.`,
        `Please summarise the follwoing diff file: \n\n${diff}`],modelType,apiKey
    )
    return response
}

export async function summariseCode(doc: Document,apiKey:string,modelType?:string) {
    console.log('getting summary for', doc.metadata.source)
    try {
        const code = doc.pageContent.slice(0, 10000)
        const response = await chatCompletion([            
            `You are an intelligent senior software engineer who specialises in onboarding junior software 
            engineers onto projects`,
            `You are onboarding a junior software engineer and explainin to them the purpose of the 
            ${doc.metadata.source} file`,
            `Here is the code:
            ---
            ${code}
            ---
            Give a summary in no mare than 100 words of the code above`],modelType,apiKey)
        return response
    }catch (error) {
        console.error('Error summarising code:', error)
        return ''
    }
}

