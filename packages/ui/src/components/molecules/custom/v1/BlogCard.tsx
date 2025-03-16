'use client'
import { blogProps } from '@repo/ts-types/landing-page/blog'
import React from 'react'
import { Card, CardContent } from '../../shadcn/card'
import Image from 'next/image'
import { Badge } from '../../../atoms/shadcn/badge'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

const BlogCard = ({blog}:{blog:blogProps}) => {
  const router = useRouter()
  return (
    <Card onClick={()=>router.push('blog/'+blog.slug)} className='flex flex-col gap-2 w-[300px] relative cursor-pointer opacity-80 hover:opacity-100'>
        <Image src={process.env.NEXT_PUBLIC_STRAPI_URL+  blog.cover.formats.thumbnail.url} 
        alt={blog.title} width={300} height={300}/>
        <div className='flex items-center justify-start gap-4 mx-2 w-full '>
           {blog.categories.map(category => (
               <Badge key={category.name}>{category.name}</Badge>
            ))}
        </div>
        <p className='text-wrap p-2'>{blog.title}</p>
        <div className='p-2 flex items-center justify-between'>
          <span className='text-description'>
            By
            <span className='text-xs text-primary'> {blog.author.name}</span>
          </span>
          <span className='text-description'>{formatDistanceToNow(blog.publishedAt,{addSuffix:true})}</span>
        </div>
    </Card>
  )
}

export default BlogCard