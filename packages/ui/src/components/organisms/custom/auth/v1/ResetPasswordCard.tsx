import { FormResult } from './FormResult';
import { Card, CardContent, CardFooter, CardHeader } from '../../../../molecules/shadcn/card';

import { ResetPasswordCardProps } from '@repo/ts-types/auth/v1';
import { Button } from '../../../../atoms/shadcn/button';
import {   Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, } from '../../../../molecules/shadcn/form';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema } from '@repo/zod/auth';
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { Input } from '../../../../atoms/shadcn/input';
import { useRouter } from 'next/navigation';

const ResetPasswordCard = ({errorMessage,successMessage,token,resetFunction}:ResetPasswordCardProps) => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues:{
      password: '',
    },
  })
  const [error, setError] = useState<string | undefined>(errorMessage)
  const [success, setSuccess] = useState<string | undefined>(successMessage)

  const [isPending, startTransition] = useTransition()

  function handleSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    setError("")
    setSuccess("")
    startTransition(()=>{
      resetFunction(token,data.password)
      .then((data:any)=>{
            setError(data?.error);
            setSuccess(data?.success);
      })
    })
  }
  const router = useRouter();
  return (
    <Card className='w-[40%] bg-white text-black shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-6xl font-bold text-center'>Reset Password</div>
        <div className='text-md font-extralight text-center'>Enter New Password</div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <div className='space-y-4 mb-4'>
              <FormField control={form.control} name="password" render={({field})=>(
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending}type="password" placeholder='******'  className='bg-white text-black'  {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </div>
            <FormResult type="error" message={error }/>
            <FormResult type="success" message={success}/>
            <Button  disabled={isPending} variant="default" type="submit">Reset Password</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <button onClick={()=>router.push('/auth/login')} className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>Go to Login Page</button>
      </CardFooter>
    </Card>
  )
}

export default ResetPasswordCard;