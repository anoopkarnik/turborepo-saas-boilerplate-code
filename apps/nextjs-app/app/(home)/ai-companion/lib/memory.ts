import { Redis} from "@upstash/redis";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone as PineconeClient} from "@pinecone-database/pinecone"
import { PineconeStore } from "@langchain/pinecone";
import { Document } from "@langchain/core/documents";

export type CompanionKey = {
    companionName: string;
    modelName: string;
    userId: string;
}

export class MemoryManager {
    private static instance: MemoryManager;
    private history: Redis;
    private vectorDBClient: PineconeClient;

    public constructor() {
        this.history = Redis.fromEnv();
        this.vectorDBClient = new PineconeClient({
            apiKey: process.env.PINECONE_API_KEY!,
        });
    }

    public async vectorSearch(recentChatHistory: string,companionfileName: string){
        const pineconeIndex = this.vectorDBClient.index(process.env.PINECONE_INDEX!);
        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API_KEY!}),
            {pineconeIndex}
        )

        const similarDocs = await vectorStore.similaritySearch(
            recentChatHistory, 3, {fileName: companionfileName}
        ).catch((e) => {
            console.log("Failed to get vector search results", e);
        });


        return similarDocs;
    }

    public static async getInstance(): Promise<MemoryManager> {
        if (!MemoryManager.instance) {
            MemoryManager.instance = new MemoryManager();
        }
        return MemoryManager.instance;
    }

    private generateRedisCompanionKye(companionKey: CompanionKey):string{
        return `${companionKey.companionName}-${companionKey.modelName}-${companionKey.userId}`;
    }

    public async writeToHistory( text: string, companionKey: CompanionKey){
        if (!companionKey || typeof companionKey.userId == "undefined") {
            console.log("Companion key set incorrectly");

        }

        const key = this.generateRedisCompanionKye(companionKey);
        const result = await this.history.zadd(key, {
            score: Date.now(),
            member: text
        })

        return result;
    }

    public async readLatestHistory(companionKey: CompanionKey):Promise<string>{
        if (!companionKey || typeof companionKey.userId == "undefined") {
            console.log("Companion key set incorrectly");
            return "";
        }
        const key = this.generateRedisCompanionKye(companionKey);
        let result = await this.history.zrange(key, 0, Date.now(),{
            byScore: true,
        })
        result = result.slice(-30).reverse();
        const recentChats = result.reverse().join("\n")
        return recentChats;
    }
    
    public async seedChatHistory(seedContent: string, delimiter: string = "\n",
         companionKey: CompanionKey){
            const key = this.generateRedisCompanionKye(companionKey);
            if (await this.history.exists(key)){
               console.log("Chat history already exists");
                return;
            }

            const content = seedContent.split(delimiter);
            let counter = 0;

            for (const line of content) {
                await this.history.zadd(key, {
                    score: counter,
                    member: line
                })
                counter+=1;
            }

    }

    public async addToPinecone(text: string, companionKey: CompanionKey, fileName: string) {
        const pineconeIndex = this.vectorDBClient.index(process.env.PINECONE_INDEX!);
        const vectorStore = await PineconeStore.fromExistingIndex(
          new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY! }),
          { pineconeIndex }
        );
      
        // Wrap message as LangChain Document with metadata
        const doc = new Document({
          pageContent: text,
          metadata: {
            fileName,
            companionName: companionKey.companionName,
            modelName: companionKey.modelName,
            userId: companionKey.userId,
          },
        });
      
        await vectorStore.addDocuments([doc]);
      }
      

   

}