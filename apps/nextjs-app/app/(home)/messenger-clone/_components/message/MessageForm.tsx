import React from 'react'
import useConversation from '../../_hooks/useConversation'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@repo/ui/molecules/shadcn/form'
import { Input } from '@repo/ui/atoms/shadcn/input'
import { useRouter } from 'next/navigation'
import { useToast } from '@repo/ui/hooks/use-toast'
import { createMessage } from '../../_actions/message'
import { HiPhoto } from "react-icons/hi2";
import { HiPaperAirplane } from "react-icons/hi2";
import { Button } from '@repo/ui/atoms/shadcn/button'
import { useDropzone } from 'react-dropzone'
import { uploadImageToStrapi } from '../../../../../actions/strapi/image'
import Image from 'next/image'


const formSchema = z.object({
    message : z.string().optional(),
    image: z.any().optional()
})



const MessageForm = () => {
    const { conversationId} = useConversation()

    const router = useRouter()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                message: ""
            }
        })
    const previewImage = form.watch("image");
    
    const isLoading = form.formState.isSubmitting

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;


    try {
        const formData = new FormData();
        formData.append("files", file);
        formData.append("folder", "AI Companions");
        const result = await uploadImageToStrapi(formData);
        if (result?.[0]) {
            form.setValue('image',process.env.NEXT_PUBLIC_STRAPI_URL + result[0].url);
        } else {
            toast({title: "Error", description:"Upload failed" , variant: 'destructive'})
        }
    } catch (e) {
        console.error(e);
        
    } 
}
      

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
          "image/*": []
        },
        multiple: false
      });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            if (!conversationId) {
                throw new Error("Conversation ID is required");
            }
            if (!values.message && !values.image) {
                toast({title: "Error", description:"Message or image is required" , variant: 'destructive'})
                return
            }
            const payload = {
                conversationId,
                message: values.message,
                image: values.image,
              };
            await createMessage(payload)
            form.reset()
        }catch(err){
            toast({title: "Error", description:"Not able to create message" , variant: 'destructive'})
            console.log(err)
        }finally{
            router.refresh()
        }
    }
  return (
    <div className='sticky bottom-0 z-10 bg-background '>
        {previewImage && (
            <div className="px-4 pt-4">
                <div className="relative w-full rounded-lg overflow-hidden opacity-80 shadow-sm">
                <Image
                    src={previewImage}
                    alt="Selected"
                    className="object-cover w-full h-full rounded-lg"
                />
                {/* ✖️ Remove image button */}
                <button
                    type="button"
                    onClick={() => form.setValue("image", undefined)}
                    className="absolute top-1 right-1 bg-background/80 text-sm text-red-500 rounded-full px-2 py-0.5 hover:bg-background/90"
                >
                    ✕
                </button>
                </div>
            </div>
            )}
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} 
            className='flex items-center border-t w-full p-4 px-3 md:px-6 gap-4
            focus-within:shadow-sm '>
                 <FormField name="image" 
                    render={({})=>(
                    <FormItem className="col-span-1 ">
                        <FormControl className='m-0 p-0'>
                            <div
                            {...getRootProps()}
                            className={`p-2 rounded-full hover:bg-muted cursor-pointer ${
                                isDragActive ? "bg-accent" : ""
                            }`}
                            >
                                <input {...getInputProps()} />
                                <HiPhoto size={24} className="text-foreground" />
                            </div>
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField name="message" 
                    render={({field})=>(
                    <FormItem className="w-[85%] ">
                        <FormControl className='m-0 px-2'>
                            <Input className='flex-1' disabled={isLoading} 
                            placeholder='Write a message' {...field}/>
                        </FormControl>
                    </FormItem>
                    )}
                />
                <Button className='rounded-full p-2 cursor-pointer col-span-1'
                 variant="blank">
                    <HiPaperAirplane size={24}  className='text-foreground' />
                </Button>
            </form>
        </Form>
    </div>
  )
}

export default MessageForm