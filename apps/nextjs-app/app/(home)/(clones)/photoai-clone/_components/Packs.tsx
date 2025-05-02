"use client"
import React, { useEffect, useState } from 'react'
import PackCard from './PackCard';
import { getModels, getPacks } from '../_actions/server';
import { PhotoModel } from '@prisma/prisma/client';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton';
import type { Packs } from '@prisma/prisma/client';

export interface TPack {
    name: string;
    imageUrl1: string;
    imageUrl2: string;
    description: string;
}

const Packs = () => {
    const [packs, setPacks] = useState<Packs[]>([]);
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

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                const response = await getPacks();
                setPacks(response.packs);
            } catch (error) {
                console.error('Error fetching packs:', error);
            }
        };

        fetchPacks();
    }, []);
  return (
    <div className='mt-10 max-w-6xl mx-auto '>
        <h3 className='text-2xl pb-2'>Select Model</h3>
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
        <div className='flex flex-wrap gap-4 '>
            {packs?.map(p=> <PackCard {...p} key={p.name} modelId={selectedModel as string}/>)}
        </div>
    </div>
  )
}

export default Packs