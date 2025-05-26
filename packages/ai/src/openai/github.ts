import { Document } from "@langchain/core/documents";
import { chatCompletion } from './base';
import { getApiKeyFromType } from './baseServer';


export const aiSummariseCommit = async (diff: string,type:string="OpenAI") => {
  const systemPrompt = `
You are an expert programmer, and you are trying to summarize a git diff. Reminders about the 
git diff format: 
For every file, there are a few metadata lines, like:
'''
diff --git a/lib/index.js b/lib/index.js
index aadf691..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js
'''
Then there are lines prefixed with '+' (added), '-' (deleted), or neither (context). 

EXAMPLE SUMMARY COMMENTS:
'''
* Raised the amount of returned recordings from '10' to '100' [packages/server/recordings_api.ts], [packages/server/constants.ts] 
* Fixed a typo in the GitHub action name [.github/workflows/gpt-commit-summarizer.yml]
* Moved 'octokit' initialization to a separate file [src/octokit.ts], [src/index.ts] 
* Added an OpenAI API for completions [packages/utils/apis/openai.ts]
* Lowered numeric tolerance for test files
'''

Summarize the following git diff into a concise list of meaningful commit comments. Do not include parts of the example in your answer.
`;

  const userPrompt = `Please summarise the following diff:\n\n${diff}`;
  const apiKey = await getApiKeyFromType(type);

 const response = await chatCompletion({
    apiKey: apiKey,
    model: 'gpt-3.5-turbo-0125',
    systemMessage: systemPrompt,
    userMessages: [userPrompt],
    temperature: 0.3,
 })

  return response.choices[0]?.message?.content?.trim() || '';
};

export async function summariseCode(doc: Document,type:string="OpenAI") {
  console.log('getting summary for', doc.metadata.source);
  try {
    const code = doc.pageContent.slice(0, 10000);
    const systemPrompt = `
      ou are a senior software engineer onboarding a junior developer. You explain files in a simple and clear way.`;
    const userPrompt =  `
      You're explaining the purpose of the file: ${doc.metadata.source}

      Here is the code:
      ---
      ${code}
      ---
      Please summarize its purpose in less than 100 words.`

    ;
    const apiKey = await getApiKeyFromType(type);

    const response = await chatCompletion({
      apiKey: apiKey,
      model: 'gpt-3.5-turbo-0125',
      systemMessage: systemPrompt,
      userMessages: [userPrompt],
      temperature: 0.4,
   })


    return response.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Error summarising code:', error);
    return '';
  }
}
