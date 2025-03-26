"use client"
import React from 'react'
import {Category, Companion} from '@prisma/prisma/client'
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/molecules/shadcn/form';
import { Separator } from '@repo/ui/atoms/shadcn/separator';
import { ImageUploader } from './ImageUpload';
import { Input } from '@repo/ui/atoms/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/select';
import { Textarea } from '@repo/ui/atoms/shadcn/textarea';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { Wand2Icon } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@repo/ui/hooks/use-toast';
import { ELON_MUSK_FEWSHOT_EXAMPLES, ELON_MUSK_INSTRUCTIONS } from '../lib/constants';
import { useRouter } from 'next/navigation';

interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1,{message: "Name is required"}),
    description: z.string().min(1,{message: "Description is required"}),
    instructions: z.string().min(200,{message: "Instructions required at least 200 characters"}),
    seed:  z.string().min(200,{message: "Instructions required at least 200 characters"}),
    src: z.string().min(1,{message: "Image is required"}),
    categoryId: z.string().min(1,{message: "Category is required"}) 
})

const CompanionForm = ({categories,initialData}:CompanionFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            instructions: '',
            seed: '',
            src: '',
            categoryId: undefined
        }
    })

    const isLoading = form.formState.isSubmitting

    const {toast} = useToast()

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            if (initialData){
                // Update the companion
                await axios.patch(`/api/ai-companion/${initialData.id}`, values)
            }else{
                // Create a new companion
                await axios.post(`/api/ai-companion`, values)
            }
            toast({
                title: "Companion saved successfully",
                description : "Your companion has been saved successfully",
                variant: "success"
            })
            router.refresh()
            router.push('/ai-companion')
        } catch(error){
            console.log(error)
            toast({
                title: "Failed to save companion",
                description : "An error occured while saving your companion",
                variant: "destructive"
            })
        }
    }
  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
                <div className='space-y-2 w-full col-span-2'>
                    <div>
                        <h3 className='text-lg font-medium'>
                            General Information
                        </h3>
                        <p className='text-description'>
                            General information about the AI companion
                        </p>
                    </div>
                    <Separator className='bg-primary/10' />
                </div>
                <FormField
                    control={form.control}
                    name="src"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-center justify-center space-y-4">
                            <FormControl>
                                <ImageUploader value={field.value } onChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                        name='name'
                        control={form.control}
                        render={({field}) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                 <FormLabel>Name</FormLabel>
                                 <FormControl>
                                    <Input disabled={isLoading} placeholder ="Elon Musk" {...field} />
                                 </FormControl>
                                 <FormDescription>
                                    This is the name of the AI companion
                                 </FormDescription>
                                 <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='description'
                        control={form.control}
                        render={({field}) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                 <FormLabel>Description</FormLabel>
                                 <FormControl>
                                    <Input disabled={isLoading} 
                                    placeholder ="CEO of SpaceX and Tesla" 
                                    {...field} />
                                 </FormControl>
                                 <FormDescription>
                                    Short description of the AI companion
                                 </FormDescription>
                                 <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='categoryId'
                        control={form.control}
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>Category</FormLabel>
                                <Select 
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue=''
                                >
                                    <FormControl>
                                        <SelectTrigger className='bg-background'>
                                            <SelectValue 
                                            defaultValue={field.value} 
                                            placeholder="Select a Category"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                </Select>
                                <FormDescription>
                                    Select the category of the AI companion
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='space-y-2 w-full'>
                    <div>
                        <h3 className='text-lg font-medium'>
                            Configuration
                        </h3>
                        <p className='text-description'>
                            Detailed instructions for AI Behaviour
                        </p>
                    </div>
                    <Separator className='bg-primary/10' />
                </div>
                <FormField
                    name='instructions'
                    control={form.control}
                    render={({field}) => (
                        <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>Instructions</FormLabel>
                                <FormControl>
                                    <Textarea 
                                    className='bg-background resize-none'
                                    rows={7}
                                    disabled={isLoading} 
                                    placeholder ={ELON_MUSK_INSTRUCTIONS}
                                    {...field} />
                                </FormControl>
                                <FormDescription>
                                  Describe in detail your companion&apos;s backstory and 
                                  relavant details. 
                                </FormDescription>
                                <FormMessage/>
                        </FormItem>
                    )}
                />
                 <FormField
                    name='seed'
                    control={form.control}
                    render={({field}) => (
                        <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>Seed Chat</FormLabel>
                                <FormControl>
                                    <Textarea 
                                    className='bg-background resize-none'
                                    rows={7}
                                    disabled={isLoading} 
                                    placeholder ={ELON_MUSK_FEWSHOT_EXAMPLES}
                                    {...field} />
                                </FormControl>
                                <FormDescription>
                                  Provide few examples of how the AI companion will respond to user queries.
                                </FormDescription>
                                <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className='w-full flex justify-center'>
                    <Button size='lg' disabled={isLoading} >
                        {initialData ? " Edit your Companion" : "Create your Companion"}
                        <Wand2Icon className='w-4 h-4 ml-2'/>
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default CompanionForm