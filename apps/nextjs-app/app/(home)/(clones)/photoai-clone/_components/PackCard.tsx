import Image from 'next/image'
import React from 'react'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { generatePack } from '../_actions/server'



const PackCard = ({id,name,description,imageUrl1,imageUrl2,modelId}:{
    id:string;
    name:string;
    description:string;
    imageUrl1:string;
    imageUrl2:string;
    modelId:string;
}) => {
    const handleGeneratePack = async () => {
            if (!modelId) {
                alert('Please select a model');
                return;
            }
            try {
                const response = await generatePack(id, modelId); ;
                console.log('Generated images:', response);
            } catch (error) {
                console.error('Error generating image:', error);
            }
        }
    
  return (
    <div className='border hover:border-red-300 hover:border-1 mx-auto max-w-[500px] p-4 rounded-md flex flex-col
        justify-between'>
        <div className='flex items-center justify-center'> 
            <Image src={imageUrl1} alt='pack image' width={200} height={300}/>
            <Image src={imageUrl2} alt='pack image' width={200} height={300}/>
        </div>
        <div className='text-md text-center'>
            {name}
        </div>
        <div className='text-description text-center'>
            {description}
        </div>
        <Button variant='outline' className='w-full mt-6'  onClick={handleGeneratePack}>
            Generate
        </Button>
    </div>
  )
}

export default PackCard