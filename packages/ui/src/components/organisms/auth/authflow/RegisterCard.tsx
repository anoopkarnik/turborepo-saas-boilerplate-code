"use client"
import {z} from "zod"
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/molecules/shadcn/card';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input';
import { FormResult } from './FormResult';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { RegisterSchema } from "@repo/auth/utils/zod";
import { RegisterCardProps } from "@repo/auth/utils/typescript";
const RegisterCard = ({showEmail,showGoogleProvider,showGithubProvider,showLinkedinProvider,
  onEmailSubmit,onGoogleProviderSubmit,onGithubProviderSubmit,onLinkedinProviderSubmit, errorMessage}:RegisterCardProps
) => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  })

  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(data: z.infer<typeof RegisterSchema>) {
    setIsPending(true)
    const {error} = await onEmailSubmit(data)
    if (error){
      setError(error)
    }
    else{
      setSuccess("Registration successful! Please verify your email before logging in!")
      setError(null)
    }
    setIsPending(false)
  }
  return (
    <Card className='w-[400px] shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-4xl font-bold text-center '>Register</div>
        <div className='text-md font-extralight text-center'>Create an account</div>
      </CardHeader>
      {showEmail &&
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6 '>
                {['name','email','password','confirmPassword'].map((field) => (
                      <FormField 
                          key={field} 
                          name={field as keyof z.infer<typeof RegisterSchema>}
                          render={({ field: fieldProps }) => (
                              <FormItem>
                                  <FormLabel>
                                      {field.charAt(0).toUpperCase() + field.slice(1)}
                                  </FormLabel>
                                  <FormControl>
                                      <Input 
                                          type={field.includes('password') ? 'passdword' : field === 'email' ? 'email' : 'text'} 
                                          placeholder={`Enter your ${field}`} 
                                          autoComplete='off'
                                          {...fieldProps} 
                                          className='bg-white text-black'
                                      />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          )}
                      />
                  ))}
              <FormResult type="error" message={error as string}/>
              <FormResult type="success" message={success as string}/>
              <Button  disabled={isPending}  variant="default" className="w-full" type="submit" > Register</Button>
            </form>
          </Form>
        </CardContent>}
      <CardFooter className='fle rounded-2xl gap-4 '>
        {showGoogleProvider && 
        <Button onClick={onGoogleProviderSubmit} variant='secondary' className="w-full" >
          <FcGoogle/>
        </Button>}
        {showGithubProvider && <Button onClick={onGithubProviderSubmit} variant='secondary' className="w-full"><FaGithub/></Button>}
        {showLinkedinProvider && <Button onClick={onLinkedinProviderSubmit} variant='secondary' className="w-full"><FaLinkedin/></Button>}
      </CardFooter>
      <CardFooter className='flex justify-center'>
        <button onClick={()=>router.push('/sign-in')} className='text-sm text-center cursor-pointer hover:underline'>
          Already have an Account!
        </button>
      </CardFooter>
      <CardFooter className='text-description text-wrap mx-2 text-center'>
        <span>
          By signing up, you agree to our <button
            onClick={() => router.push('/landing/legal/terms-of-service')} 
            className='cursor-pointer text-blue-400 hover:text-blue-800'> Terms of Service, </button> 
          <button
            onClick={() => router.push('/landing/legal/privacy-policy')} 
            className='cursor-pointer text-blue-400 hover:text-blue-800'> Privacy Policy.
          </button>
        </span>
      </CardFooter>
    </Card>
  )
}

export default RegisterCard;