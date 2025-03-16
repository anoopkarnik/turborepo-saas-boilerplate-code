"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { components } from '../../../../atoms/mdx/mdxComponents';
import { docProps } from '@repo/ts-types/landing-page/doc';
import { formatDistanceToNow } from "date-fns";

const DocPostPage = ({ docPost, mdxSource }: { docPost: docProps; mdxSource: MDXRemoteSerializeResult }) => {
  const router = useRouter();
  return (
    <div className="container max-w-5xl mx-auto px-6 py-16  my-10 relative">
      <div className="leading-normal mb-10">
        <h1 className="text-5xl font-serif font-bold drop-shadow-sm text-primary ">
          {docPost.title}
        </h1>
        <p className="text-description ">
          Last Updated {formatDistanceToNow(new Date(docPost.updatedAt), { addSuffix: true })}
        </p>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose prose-xl mx-auto prose-headings:font-serif prose-headings:text-gray-800"
      >
        <MDXRemote {...mdxSource} components={components} />
      </motion.article>
    </div>
  );
};

export default DocPostPage;