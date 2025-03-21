"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import usePost from '../../_hooks/usePost'
import { ClipLoader } from 'react-spinners'
import PostItem from '../../_components/posts/PostItem'
import Form from '../../_components/Form'
import CommentFeed from '../../_components/posts/CommentFeed'

const PostView = ({params}:{params:{postId:string}}) => {
    const {postId} = params
    const router = useRouter()

    const {data: fetchedPost, isLoading} = usePost(postId)

    if(isLoading || !fetchedPost){
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightgreen" size={80} />
            </div>
        )
    }

  return (
    <>
    <PostItem postId={fetchedPost.id}/>
    <Form postId={postId as string} isComment placeholder='Tweet your Reply'/>
    <CommentFeed comments={fetchedPost.comments}/>
    </>
  )
}

export default PostView