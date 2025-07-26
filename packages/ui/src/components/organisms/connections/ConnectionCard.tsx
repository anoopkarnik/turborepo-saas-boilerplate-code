'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { ConnectionCardProps, ConnectionType } from '@repo/connections/lib/ts-types';
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card';
import { Button } from '@repo/ui/atoms/shadcn/button';
import AddApiKeyConnectionDialog from './AddApiKeyConnectionsDialog';
import { useTheme } from 'next-themes';
import AddOAuthConnectionsDialog from './AddOAuthConnectionsDialog';


const ConnectionCard = ({connection}:{connection:ConnectionCardProps }) => {
    const {theme} = useTheme();
      // State for controlling if the dialog is open
  const [isDialogOpen] = useState(false);

    useEffect(() => {

    }, [theme]);

  return (
    <Card className="flex flex-col items-center justify-between bg-sidebar min-h-[250px] max-h-[250px] min-w-[250px] max-w-[250px] overflow-hidden">
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
        {connection.type === ConnectionType.ApiKey && <AddApiKeyConnectionDialog connection={connection}/>}
        {connection.type === ConnectionType.OAuth2 && <AddOAuthConnectionsDialog connection={connection}/>}
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