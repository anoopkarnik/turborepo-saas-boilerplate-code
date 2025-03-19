
import { serialize } from "next-mdx-remote/serialize"
import { blockProps } from "@repo/ts-types/landing-page/doc";
import DocPostPage from "@repo/ui/organisms/custom/landing/v1/DocPostPage";
import { getDocPost } from "../../../../actions/strapi/docs";


export default async function DocPost({params}:{params:{docId:string}}) {
    const { docId } = params;
    const docPost = await getDocPost(docId);
    if (!docPost){
        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        )
    }
    const richTextBlock = docPost[0].blocks.find((block:blockProps) => block.__component === "shared.rich-text");
    const mdxSource = await serialize(richTextBlock ? richTextBlock.body : "");

    return (
        <DocPostPage docPost={docPost[0]} mdxSource={mdxSource} />
    )

}