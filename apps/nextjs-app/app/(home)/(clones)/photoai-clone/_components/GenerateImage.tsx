"use client"
import { Button } from '@repo/ui/atoms/shadcn/button'
import { Textarea } from '@repo/ui/atoms/shadcn/textarea'
import React, { useEffect, useState } from 'react'
import { generateImage, getModels } from '../_actions/server';
import { PhotoModel} from "@prisma/client"
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton';

const GenerateImage = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [models, setModels] = useState<PhotoModel[]>([]);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [modelLoading, setModelLoading] = useState(true)
    
    useEffect(() => {
        const fetchModels= async () => {
            try {
                const response = await getModels()
                setModels(response.models);
                setSelectedModel(response.models[0]?.id || null);
                setModelLoading(false)
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        fetchModels();
    }, []);

    const handleGenerateImage = async () => {
        if (!prompt || !selectedModel) {
            alert('Please select a model and enter a prompt');
            return;
        }
        try {
            const response = await generateImage(prompt, selectedModel);
            console.log('Generated image:', response);
        } catch (error) {
            console.error('Error generating image:', error);
        }
    }


  return (
    <div className='mt-[100px] max-w-4xl mx-auto '>
        <h3 className='text-2xl pb-2'>Select Model</h3>
        <div className='' >
            <div className='flex flex-wrap gap-2 mb-10'>
                {models?.map((model:PhotoModel)  => (
                    <div key={model.id} className={cn("cursor-pointer text-center bg-background",
                        selectedModel === model.id ? " border-2 border-red-300":"")} onClick={()=>{setSelectedModel(model.id)}}>
                        <Image src={model.thumbnail as string} alt='pack image' width={200} height={300}/>
                        {model.name}
                    </div>
                ))}
                {modelLoading && [1,2,3,4,5].map((item) => (
                    <Skeleton key={item} className="w-[200px] h-[300px] rounded-md" />
                ))}
            </div>
            <Textarea placeholder="Describe the image that you'd like to see here"
            className='py-4 px-4 w-full border min-w-[600px]' 
            onChange={(e)=>setPrompt(e.target.value)} />
            <div className='flex justify-center pt-4'>
                <Button variant={'secondary'} onClick={handleGenerateImage}>
                    Create Image
                </Button>
            </div>
        </div>
    </div>
  )
}

export default GenerateImage