import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github"
import { Document } from "@langchain/core/documents"
import { summariseCode } from "@repo/ai/openai/github"
import { generateEmbedding } from "@repo/ai/openai/base"
import db from "@repo/prisma-db/client"


export const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: process.env.GITHUB_TOKEN || githubToken,
        branch: "main",
        ignoreFiles:['**/package-lock.json', '**/yarn.lock', '**/pnpm-lock.yaml',
            "**/atoms/**/*",
            "**/molecules/**/*",
        ],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 5
    })
    const docs = await loader.load()
    return docs
}


export const indexGithubRepo = async (projectId: string, githubUrl: string, githubToken?: string) => {
    const docs = await loadGithubRepo(githubUrl, githubToken)
    const allEmbeddings = await generateEmbeddings(docs)
    await Promise.allSettled(allEmbeddings.map(async (embedding,index)=> {
        console.log(`processing ${index} with length: ${embedding.embedding.length} of ${allEmbeddings.length}`)
        if (!embedding) return
        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
            data: {
                projectId,
                summary: embedding.summary,
                sourceCode: embedding.sourceCode,
                fileName: embedding.fileName
            }
        })
        const embeddingValues = `[${embedding.embedding.join(',')}]`
        const sqlString = `
            UPDATE "github_schema"."SourceCodeEmbedding"
            SET "summaryEmbedding" = '${embeddingValues}'::vector
            WHERE "_id" = '${sourceCodeEmbedding.id}';
            `;

         await db.$executeRawUnsafe(sqlString);
          
    }))
}


const generateEmbeddings = async (docs: Document[]) =>{
    return await Promise.all(docs.map( async doc =>{
        const summary = await summariseCode(doc)
        const embedding = await generateEmbedding(summary)
        return {
            summary,
            embedding,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
            fileName: doc.metadata.source,
        }
    }))
}