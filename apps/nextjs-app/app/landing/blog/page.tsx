"use client"
import React, { useEffect, useState } from 'react'
import { InboxIcon } from 'lucide-react';
import BlogListPage from '@repo/ui/templates/landing/BlogListPage/v1';
import { getBlogs } from '@repo/storage/strapi/blogs';

export default function  Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const blogs = await getBlogs();
            setBlogs(blogs);
        };
        fetchData();
    }, []);


    if (blogs.length === 0){
        return (
            <div className='flex flex-col gap-4 h-full items-center'>
                <div className='rounded-full w-20 h-20 flex items-center justify-center'>
                    <InboxIcon size={40} className='stroke-primary'/>
                </div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='text-emphasized'>No Blogs Created Youtube</p>

                </div>
            </div> 
        )
    }
    return (
        <BlogListPage blogs={blogs}/>
    )
}