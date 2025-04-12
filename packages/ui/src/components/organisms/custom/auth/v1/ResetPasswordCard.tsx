"use client"
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
import { Input } from '../../../../atoms/shadcn/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingButton from '../../../../molecules/custom/v1/LoadingButton';

const ResetPasswordCard = ({errorMessage,successMessage,token,resetFunction}:ResetPasswordCardProps) => {
  const [pending, setPending] = useState(false)
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues:{
      password: '',
      confirmPassword: '',
    },
  })

  async function handleSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    setPending(true)
     await resetFunction(token,data.password)
      setPending(false)
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
                    <Input type="password" placeholder='******'  className='bg-white text-black'  {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
              <FormField control={form.control} name="confirmPassword" render={({field})=>(
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder='******'  className='bg-white text-black'  {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </div>
            <FormResult type="error" message={errorMessage }/>
            <FormResult type="success" message={successMessage}/>
            <LoadingButton variant="default" pending={pending}>
              Reset Password
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <button onClick={()=>router.push('/sign-in')} className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>Go to Login Page</button>
      </CardFooter>
    </Card>
  )
}

export default ResetPasswordCard;