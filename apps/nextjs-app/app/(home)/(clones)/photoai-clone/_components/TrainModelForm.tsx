"use client"

import { TrainModel } from '../_lib/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@repo/ui/hooks/use-toast'
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/molecules/shadcn/form'
import { Separator } from '@repo/ui/atoms/shadcn/separator'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/select'
import { ModelyTypeEnum, EthnicityEnum, EyeColorEnum, PhotoModel} from "@prisma/client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import { Wand2Icon } from 'lucide-react'
import { Switch } from '@repo/ui/molecules/shadcn/switch'
import { ImagesUploader } from './ImagesUploader'
import { trainModel } from '../_actions/server'



const TrainModelForm = ({initialData}:{initialData?:PhotoModel}) => {
    const form = useForm<z.infer<typeof TrainModel>>({
        resolver: zodResolver(TrainModel),
        defaultValues: {
            name: "",
            type: "Man",
            age: 20,
            ethnicity: "South_Asian",
            eyeColor: "Brown",
            bald: false,
            zippedImages: ""
        }
    })

    const isLoading = form.formState.isSubmitting
    const {toast} = useToast()

    const onSubmit = async (values: z.infer<typeof TrainModel>) => {
        try{
            console.log(values)
            await trainModel(values)
            

        }catch(error){
            console.log(error)
            toast({
                title: "Error",
                description: "Something went wrong",
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
                            Train a Model
                        </h3>
                        <p className='text-description'>
                            Train a model with a person&apos;s face
                        </p>
                    </div>
                    <Separator className='bg-primary/10' />
                </div>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                    <FormField
                        control={form.control}
                        name="zippedImages"
                        render={({ field }) => (
                            <FormItem className="flex-1 w-full">
                                <FormLabel>Training Images</FormLabel>
                                <FormControl>
                                    <ImagesUploader 
                                    onChange={field.onChange} 
                                    placeholder="Upload 10 - 15 clear images of the person in different backgrounds, dresses, expressions and postures" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                </div>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                    <FormField
                        name='name'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} placeholder ="Anoop" className='bg-background' {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='age'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className=''>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={isLoading} placeholder ="20" 
                                    className='bg-background' {...field}
                                    value={field.value ?? ""} // Ensure no uncontrolled error
                                    onChange={(e) => field.onChange(Number(e.target.value))}  />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                    <FormField
                        name='type'
                        control={form.control}
                        render={({field}) => (
                            <FormItem  className='flex-1'>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className='bg-background'>
                                            <SelectValue 
                                            defaultValue={field.value} 
                                            placeholder="Select a Gender"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                            {Object.keys(ModelyTypeEnum).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='eyeColor'
                        control={form.control}
                        render={({field}) => (
                            <FormItem  className='flex-1'>
                                <FormLabel>Eye Color</FormLabel>
                                <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className='bg-background'>
                                            <SelectValue 
                                            defaultValue={field.value} 
                                            placeholder="Select an Eye Color"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                            {Object.keys(EyeColorEnum).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='ethnicity'
                        control={form.control}
                        render={({field}) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Ethnicity</FormLabel>
                                <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className='bg-background'>
                                            <SelectValue 
                                            defaultValue={field.value} 
                                            placeholder="Select Ethnicity"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                            {Object.keys(EthnicityEnum).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                   
                </div>

                <div className='flex items-center justify-between flex-wrap gap-4'>
                    <FormField
                        name='bald'
                        control={form.control}
                        render={({field}) => (
                            <FormItem className='flex-1 flex flex-col' >
                                <FormLabel>Bald</FormLabel>
                                <FormControl>
                                    <Switch
                                    disabled={isLoading}
                                    checked={field.value}
                                    onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                </div>
                <Button type="submit" size='lg' disabled={isLoading}>
                    {isLoading ? "Training..." : initialData ? "Retrain your Model" : "Train your Model"}
                    <Wand2Icon className='w-4 h-4 ml-2 animate-pulse' />
                </Button>
            </form>
        </Form>
    </div>
  )
}

export default TrainModelForm