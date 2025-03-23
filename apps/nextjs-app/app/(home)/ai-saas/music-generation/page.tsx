"use client"
import React, { useState } from 'react'
import Heading from '../_components/Heading'
import { Music } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formSchema } from '../lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Empty from '../_components/Empty'
import Loader from '../_components/Loader'

const MusicGeneration= () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const router = useRouter()
    const [music, setMusic] = useState<string>()
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setMusic(undefined)
            const response = await axios.post("/api/ai-saas/music-generation", values, {
                responseType: "blob", 
              });
          
            const audioBlob = response.data; // Axios puts the blob directly here
            const url = URL.createObjectURL(audioBlob);
            setMusic(url)  

            form.reset()
        }catch(err){
            // @ts-expect-error Object possibly undefined error
            toast({title: "Error", description: err?.response.data.error , variant: 'destructive'})
            console.log(err)
        }finally{
            router.refresh()
        }
    }
  return (
    <div className='px-4 lg:px-8'> 
        <Heading title="Music Generation" description='Our basic music generation model.' 
        icon={Music} iconColor='text-emerald-500' bgColor='bg-emerald-500/10'/>
        <div >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className='rounded-lg border w-full p-4 px-3 md:px6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                    <FormField name="prompt" 
                       render={({field})=>(
                        <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className='m-0 p-0'>
                                <Input className='border-0 outline-none focus-visible:ring-0 bg-transparent
                                focus-visible:ring-transparent' disabled={isLoading} 
                                placeholder='Piano Solo' {...field}/>
                            </FormControl>
                        </FormItem>
                       )}
                    />
                    <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                        Generate
                    </Button>
                </form>
            </Form>
        </div>
        <div className='space-y-4 mt-4 '>
            {isLoading && (
                <Loader/>
            )}
            {!music && !isLoading && (
                <Empty label='No music generated'/>
            )}
            {music && (
                <audio controls className='w-full mt-8'>
                    <source src={music} type="audio/mpeg"/>
                </audio>
            )}
        </div>
    </div>
  )
}

export default MusicGeneration