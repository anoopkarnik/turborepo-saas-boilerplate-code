import { blockProps } from "@repo/ts-types/landing-page/blog";
import BlogPostPage from "@repo/ui/templates/landing/BlogPostPage/v1";
import { serialize } from "next-mdx-remote/serialize";
import { getBlogPost } from "@repo/storage/strapi/blogs";


export default async function BlogPost({params}:{params:{blogId:string}}) {
    const { blogId } = params;
    const blogPost = await getBlogPost(blogId);
    if (!blogPost){
        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        )
    }
    const richTextBlock = blogPost[0].blocks.find((block:blockProps) => block.__component === "shared.rich-text");
    const mdxSource = await serialize(richTextBlock ? richTextBlock.body : "");

    return (
        <BlogPostPage blogPost={blogPost[0]} mdxSource={mdxSource}/>
    )

}