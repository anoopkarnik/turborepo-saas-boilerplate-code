'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { Card, CardDescription, CardHeader, CardTitle } from '../../shadcn/card'
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../shadcn/dialog'
import { ConnectionCardProps } from '@repo/ts-types/home/v1'
import { Button } from '../../../atoms/shadcn/button'
import { DialogContent } from '@radix-ui/react-dialog'
import AddConnectionsModal from '../../../organisms/connections/AddConnectionsModal/v1'
import { useTheme } from 'next-themes'


const ConnectionCard = ({connection}:{connection:ConnectionCardProps }) => {
    const {theme} = useTheme();
      // State for controlling if the dialog is open
  const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {

    }, [theme]);

  return (
    <Card className="flex flex-col items-center justify-between bg-sidebar min-h-[250px] max-h-[250px] max-w-[300px]">
    <CardHeader className="flex flex-col items-center justify-center gap-2">
        <div className="flex aspect-square size-8 items-center justify-center ">
            {theme === "dark" ?
                <Image src={connection.darkLogo} alt='/next.svg' width={30} height={30} /> : 
                <Image src={connection.logo} alt='/next.svg' width={30} height={30} />}
        </div>
      <div className='flex flex-col gap-4'>
        <CardTitle className="text-center text-lg">{connection.title}</CardTitle>
        <CardDescription className=' text-center'>{connection.description}</CardDescription>
      </div>
    </CardHeader>
    { connection.published && <div className="flex flex-col items-center gap-2 p-4 mx-4 ">
     { connection.showModal? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg"  >
              Connect using Keys
            </Button>
          </DialogTrigger>
          <DialogContent className='z-[999999] fixed top-[10%] bg-muted p-4 rounded-md'>
            <DialogHeader>
              <DialogTitle className='flex text-4xl gap-4'>
                {theme === "dark" ?
                <Image src={connection.darkLogo} alt='/next.svg' width={40} height={20} /> : 
                <Image src={connection.logo} alt='/next.svg' width={20} height={20} />}
                <div>{connection.title}</div>
              </DialogTitle>
              <DialogDescription className='py-4 '>{connection.description}</DialogDescription>
            </DialogHeader>
            <AddConnectionsModal type={connection.title} formElements={connection.formElements || []} setIsDialogOpen={setIsDialogOpen}/>
          </DialogContent>
        </Dialog>
      ):(
      <div className=''>
        <a href={connection.oauthUrl as string}>
            <Button size="lg" >
              Connect using OAuth
            </Button>
        </a>  
      </div>)}
    </div>}
    {/* Blur effect when dialog is open */}
    {isDialogOpen && (
        <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm z-[9998]" />
      )}
    {!connection.published && 
    <div className="flex flex-col items-center gap-2 mb-4">
        <Button size="lg" >
          In Progress
        </Button>
    </div>
    }
  </Card>
  )
}

export default ConnectionCard