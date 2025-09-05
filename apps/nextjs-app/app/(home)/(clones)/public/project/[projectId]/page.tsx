import { auth } from '@repo/auth/better-auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import db from '@repo/prisma-db/client';


type Props = {
    params: Promise<{ projectId: string }>
}

const InviteProject = async (props: Props) => {
    const { projectId} = await props.params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        return redirect("/sign-in")
    }
    const project = await db.githubProject.findUnique({
        where: {
            id: projectId,
        }
    });
    if (!project) {
        return redirect("/ai-github")
    }
    try {
        await db.userToGithubProject.create({
            data:{
                userId: session.user.id,
                githubProjectId: projectId,
            }
        })

    }catch (error) {
        console.error("User already in project", error);

    }
    return redirect(`/ai-github`)

}

export default InviteProject 