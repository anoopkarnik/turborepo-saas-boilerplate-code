"use client"
import React, { useState } from 'react'
import Heading from '../_components/Heading'
import { Download, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Empty from '../_components/Empty'
import Loader from '../_components/Loader'
import { amountOptions, imageFormSchema, resolutionOptions } from '../lib/constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/select'
import { Card, CardFooter } from '@repo/ui/molecules/shadcn/card'
import Image from 'next/image'
import { useToast } from '@repo/ui/hooks/use-toast'


const ImageGeneration = () => {

    const [images, setImages] = useState<string[]>([])
    const form = useForm<z.infer<typeof imageFormSchema>>({
        resolver: zodResolver(imageFormSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })

    const isLoading = form.formState.isSubmitting

    const router = useRouter()

    const {toast} = useToast()


    const onSubmit = async (values: z.infer<typeof imageFormSchema>) => {
        try{
            setImages([])
            const response = await axios.post('/api/ai-generation/image-generation', values)
            const urls = response.data.map((image: {url:string})=>image.url)
            setImages(urls)
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
        <Heading title="Image Generation" description='Our model is okish.' 
        icon={ImageIcon} iconColor='text-pink-500' bgColor='bg-pink-500/10'/>
        <div >
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className='rounded-lg border w-full p-4 px-3 md:px6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                    <FormField name="prompt" 
                       render={({field})=>(
                        <FormItem className="col-span-12 lg:col-span-6">
                            <FormControl className='m-0 p-0'>
                                <Input className='border-0 outline-none focus-visible:ring-0 bg-transparent
                                focus-visible:ring-transparent' disabled={isLoading} 
                                placeholder='A picture of a horse in Swiss Alps' {...field}/>
                            </FormControl>
                        </FormItem>
                       )}
                    />
                    <FormField name="amount" control={form.control}
                        render={({field})=>(
                            <FormItem className='col-span-12 lg:col-span-2'>
                                <Select disabled={isLoading} onValueChange={field.onChange} 
                                value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {amountOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField name="resolution" control={form.control}
                        render={({field})=>(
                            <FormItem className='col-span-12 lg:col-span-2'>
                                <Select disabled={isLoading} onValueChange={field.onChange} 
                                value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {resolutionOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
            {images.length===0 && !isLoading && (
                <Empty label='No images generated'/>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4
             mt-8'>
                {images.map((image, index) => (
                    <Card key={index} className='rounded-lg overflow-hidden'>
                        <div className='relative aspect-square'>
                            <Image src={image} layout='fill' objectFit='cover' alt="image"/>
                        </div>
                        <CardFooter className='p-2'>
                            <Button variant={'secondary'} className='w-full' 
                             onClick={() => window.open(image, '_blank')}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ImageGeneration