import { Octokit } from "octokit";
import {GithubCommit} from "@prisma/client"
import db from "@repo/prisma-db/client";
import axios from "axios";
import { aiSummariseCommit } from "@repo/ai/openai/github";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const getCommitHashes = async (githubUrl: string): Promise<GithubCommit> => {
    const [owner, repo] = githubUrl.split("/").slice(-2);   
    if (!owner || !repo) {
        throw new Error("Invalid GitHub URL");
    }
    const {data} = await octokit.rest.repos.listCommits({owner,repo})
    const sortedCommits:any = data.sort((a:any, b:any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime());
    return sortedCommits.slice(0,10).map((commit:any) => ({
        commitHash: commit.sha,
        commitMessage: commit.commit.message,
        commitAuthorName: commit.commit.author.name,
        commitAuthorAvatar: commit.author.avatar_url,
        commitDate: commit.commit.author.date,
    }))
 }

 export const pollCommits = async (projectId: string) =>{
    const { githubUrl} = await fetchProjctGithubUrl(projectId)
    const commitHashes:any = await getCommitHashes(githubUrl);
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
    const summaryResponses = await Promise.allSettled(
        unprocessedCommits.map(commit=>{
            return summariseCommit(githubUrl, commit.commitHash)
        })
    )
    const summaries = summaryResponses.map((response:any) => {
        if (response.status === "fulfilled") {
            return response.value as string;
        } 
        return ""
    })

    await db.githubCommit.createMany({
        data: summaries.map((summary, index) => ({
            projectId,
            commitHash: unprocessedCommits[index].commitHash,
            commitMessage: unprocessedCommits[index].commitMessage,
            commitAuthorName: unprocessedCommits[index].commitAuthorName,
            commitAuthorAvatar: unprocessedCommits[index].commitAuthorAvatar,
            commitDate: unprocessedCommits[index].commitDate,
            summary
        })),
    })
    return unprocessedCommits
 }
 
 async function summariseCommit(githubUrl: string, commitHash: string){
    const {data} = await axios.get(`${githubUrl}/commit/${commitHash}.diff`,{
        headers:{
            Accept: "application/vnd.github.v3.diff",
        }
    })
    return await aiSummariseCommit(data);
 }

 

 async function fetchProjctGithubUrl(projectId: string) {
    const project = await db.githubProject.findUnique({
        where: {
            id: projectId,
        },
        select: {githubUrl: true},
    });
    if (!project) {
        throw new Error("Project not found");
    }
    return {project, githubUrl: project.githubUrl};
}

async function filterUnprocessedCommits(projectId: string, commitHashes: any[]) {
    const processedCommits = await db.githubCommit.findMany({
        where: {
            projectId: projectId,
        },
    });
    const unprocessedCommits = commitHashes.filter((commit) => {
        return !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash);
    });
    return unprocessedCommits;
}

