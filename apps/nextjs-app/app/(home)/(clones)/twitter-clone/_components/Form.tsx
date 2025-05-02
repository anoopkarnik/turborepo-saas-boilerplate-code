import React, { useCallback, useState } from 'react'
import useCurrentUser from '../_hooks/useCurrentUser';
import usePosts from '../_hooks/usePosts';
import { useToast } from '@repo/ui/hooks/use-toast';
import axios from 'axios';
import Avatar from './Avatar';
import { Button } from '@repo/ui/atoms/shadcn/button';
import usePost from '../_hooks/usePost';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form = ({placeholder,isComment,postId}:FormProps) => {

  const {data: currentUser} = useCurrentUser();
  const {refetch} = usePosts()
  const {refetch:refetchPost} = usePost(postId as string)
  const {toast} = useToast();

  const [body,setBody] = useState('');
  const [isLoading, setLoading] = useState(false);
  const onSubmit = useCallback(async() => {
    try{
      setLoading(true)

      const url = isComment ? '/api/twitter/comments' : '/api/twitter/posts'

      await axios.post(url,{userId:currentUser.id,body,postId})
      toast({title:'Success',description:'Post created successfully',variant:'success'})
      setBody('')
      refetch()
      refetchPost()

    }catch(error){
      toast({title:'Error',description: error as string,variant:'destructive'})
    }finally{
      setLoading(false)
    }
  },[body,refetch,refetchPost,currentUser,postId,isComment,toast])

  return (
    <div className='border-b-[1px] border-border px-5 py-2'>
      <div className='flex gap-4 my-4'>
        <div>
          <Avatar user={currentUser} />
        </div>
        <div className='w-full'>
          <textarea disabled={isLoading} value={body} onChange={(e)=>setBody(e.target.value)} 
          placeholder={placeholder} className='resize-none disabled:opacity-80 peer  w-full bg-background ring-0 
          outline-none text-lg placeholder-description text-foreground'/>
          <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-border transition'/>
          <div className='mt-4 flex justify-end'>
            <Button onClick={onSubmit} disabled={isLoading || !body} variant='default'>
              {isComment ? 'Reply' : 'Tweet'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form