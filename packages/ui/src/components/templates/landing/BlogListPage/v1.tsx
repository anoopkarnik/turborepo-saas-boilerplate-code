"use client"
import { blogProps } from '@repo/ts-types/landing-page/blog'
import React, { useEffect, useState } from 'react'
import { Input } from '../../../atoms/shadcn/input'
import { useRouter } from 'next/navigation'
import { CircleChevronLeft } from 'lucide-react'
import BlogCard from '../../../molecules/blog/BlogCard/v1'

const BlogListPage = ({blogs}:{blogs:blogProps[]}) => {
    const [search, setSearch] = React.useState('')
    const [filteredBlogs, setFilteredBlogs] = useState<blogProps[]>(blogs)
    const router = useRouter()

    useEffect(() => {
        if(search === ''){
            setFilteredBlogs(blogs)
        }else{
            setFilteredBlogs(blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase())))
        }
    },[search])
  return (
    <div className='flex flex-col items-center justify-center mt-10 mx-4 gap-4'>
         <CircleChevronLeft className='absolute top-4 left-4 cursor-pointer opacity-80 hover:opacity-100' onClick={()=>router.back()}/>
        <h1 className='text-3xl font-bold'>
            Blogs
        </h1>
        <Input placeholder='Search Blogs' className='w-1/2' onChange={(e)=>setSearch(e.target.value)}/>
        <div className='flex flex-wrap items-center justify-around gap-4 w-full'>
            {filteredBlogs.map(blog => (
                <BlogCard key={blog.title} blog={blog}/>
            ))}
        </div>
    </div>
  )
}

export default BlogListPage