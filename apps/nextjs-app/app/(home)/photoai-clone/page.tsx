import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/tabs'
import React from 'react'
import Packs from './_components/Packs'
import GenerateImage from './_components/GenerateImage'
import TrainModelForm from './_components/TrainModelForm'
import Images from './_components/Images'

const PhotoAIClone = () => {
  return (
    <div className='flex justify-center items-center my-10 w-full'>
      <Tabs defaultValue='generate' className='w-full'>
        <TabsList className='flex gap-4'>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value='generate'>Generate</TabsTrigger>
          <TabsTrigger value="packs">Packs</TabsTrigger>
          <TabsTrigger value="train">Train</TabsTrigger>
        </TabsList>
        <TabsContent value='images'>
           <Images/>
        </TabsContent>
        <TabsContent value='generate'>
           <GenerateImage/>
        </TabsContent>
        <TabsContent value='packs'>
           <Packs/>
        </TabsContent>
        <TabsContent value='train'>
           <TrainModelForm/>
        </TabsContent>
       </Tabs>
    </div>
  )
}

export default PhotoAIClone