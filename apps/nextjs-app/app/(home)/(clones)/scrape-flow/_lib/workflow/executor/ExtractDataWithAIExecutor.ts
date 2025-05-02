import { ExecutionEnvironment } from '@repo/ts-types/scrape-flow/workflow';
import { ExtractDataWithAITask } from '../tasks/ExtractDataWithAI';
import db from '@repo/prisma-db/client';
import { symmetricDecrypt } from '../../../../../../../lib/helper/encryption';
import { chatCompletion } from '@repo/ai/openai/base';

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>,
): Promise<boolean> {
  try {
    const apiKeys = environment.getInput('API Keys');
    if (!apiKeys) {
      environment.log.error('API Key not provided');
      return false;
    }

    const prompt = environment.getInput('Prompt');
    if (!prompt) {
      environment.log.error('Prompt not provided');
      return false;
    }

    const content = environment.getInput('Content');
    if (!content) {
      environment.log.error('Content not provided');
      return false;
    }

    const connection = await db.connection.findUnique({
      where: {
        id: apiKeys,
      },
    });

    if (!connection) {
      environment.log.error('Connection not found');
      return false;
    }
    if (!connection.details) {
      environment.log.error('Connection details not found');
      return false;
    }
    const details = JSON.parse(connection.details);
    if (!details.apiKey) {
      environment.log.error('API Key not found in connection');
      return false;
    }
    const plainConnectionAPIKey = symmetricDecrypt(details.apiKey);
    if (!plainConnectionAPIKey) {
      environment.log.error('Failed to decrypt API Key');
      return false;
    }

    const response = await chatCompletion({
        apiKey: plainConnectionAPIKey,
        model: 'gpt-4o-mini',
        systemMessage: `
            You are a webscraper helper that extracts data from HTML or text. 
            You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. 
            The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. 
            Analyze the input carefully and extract data precisely based on the prompt. 
            If no data is found, return an empty JSON array. 
            Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text.
            `,
        userMessages: [content, prompt],
        temperature: 1
    })

    environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`)
    environment.log.info(`Completion tokens: ${response.usage?.completion_tokens}`)


    if (!response.choices || response.choices.length === 0) {
      environment.log.error('No response from AI');
      return false;
    }
    const choice = response.choices[0]
    if (!choice || !choice.message || !choice.message.content) {
      environment.log.error('Invalid or empty response from AI');
      return false;
    }

    const extractedData = choice.message.content;

    environment.setOutput('Extracted data', extractedData);

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
}
