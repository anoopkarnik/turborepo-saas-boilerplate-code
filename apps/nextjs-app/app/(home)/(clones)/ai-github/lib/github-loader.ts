import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github"
import { Document } from "@langchain/core/documents"
import { summariseCode } from "@repo/ai/openai/github"
import { generateEmbedding } from "@repo/ai/openai/base"
import db from "@repo/prisma-db/client"
import { Octokit } from "octokit"

const getFileCount = async (path: string, octokit: Octokit, githubOwner: string, githubRepo: string, acc:number=0)=>{
    const {data} = await octokit.rest.repos.getContent({
        owner: githubOwner,
        repo: githubRepo,
        path
    })
    if (!Array.isArray(data) && data.type === 'file'){
        return acc + 1
    }
    if (Array.isArray(data)){
        let fileCount = 0
        const directories: string[] = []

        for (const item of data) {
            if (item.type === 'dir') {
                directories.push(item.path);
            } else {
                fileCount += 1; // Count files directly
            }
        }
        if (directories.length > 0) {
            const directoryCounts = await Promise.all(
                directories.map(dirPath =>
                    getFileCount(dirPath, octokit, githubOwner, githubRepo, 0)
                )
            )
            fileCount += (directoryCounts as number[]).reduce((acc: number, count: number) => acc + count, 0);
        }
        return acc + fileCount;
    }
    return acc;

}

export const checkCredits = async (githubUrl: string, githubToken?: string) => {
    // find out how many files are in the repo
    const octokit = new Octokit({auth: process.env.GITHUB_TOKEN || githubToken})
    const githubOwner = githubUrl.split('/')[3]
    const githubRepo = githubUrl.split('/')[4]
    if (!githubOwner || !githubRepo) {
        throw new Error("Invalid GitHub URL");
    }
    const fileCount = await getFileCount('', octokit, githubOwner, githubRepo,0)
    return fileCount

}

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