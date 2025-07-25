import { Alert, AlertDescription, AlertTitle } from '@repo/ui/atoms/shadcn/alert'
import { Skeleton } from '@repo/ui/molecules/shadcn/skeleton'
import { ShieldIcon, ShieldOffIcon, LockKeyholeIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import { Card } from '@repo/ui/molecules/shadcn/card'
import AddConnectionsList from '@repo/ui/organisms/connections/AddConnectionsList'
import { formatDistanceToNow } from 'date-fns'
import DeleteConnectionDialog from '@repo/ui/organisms/connections/DeleteConnectionDialog'
import { GetConnectionsForUser } from '@repo/connections/connections'

const page = () => {
  return (
    <div className='flex flex-1 flex-col h-full p-4'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Connections</h1>
          <p className='text-muted-foreground'> Manage your Connections</p>
        </div>
      </div>
      <div className='h-full py-6 space-y-8'>
        <Alert>
          <ShieldIcon className='h-4 w-4 stroke-primary'/>
          <AlertTitle className='text-primary'>Encryption</AlertTitle>
          <AlertDescription>
            All information is securely encrypted, ensuring your data remains safe
          </AlertDescription>
        </Alert>
        <Suspense fallback={ <Skeleton className='h-[300px] w-full'/>}>
          <UserConnections/>
        </Suspense>
        <AddConnectionsList/>
      </div>
    </div>
  )
}

async function UserConnections(){
  const connections = await GetConnectionsForUser()
  if(!connections){
    return <div> Something went wrong</div>
  }
  if (connections.length ==0){
    return (
      <Card className='bg-sidebar w-full p-4'>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
            <ShieldOffIcon size={40} className='stroke-primary'/>
          </div>
          <div className='flex flex-col gap-1 text-center'>
            <p className='text-bold'>No connections added yet</p>
            <p className='text-sm text-muted-foreground'> 
              Add new connections from the list below
            </p>
          </div>
        </div>
      </Card>
    )
  }
  return (
    <div className='flex gap-2 flex-wrap'>
      {connections.map((connection) => {
        const createdAt = formatDistanceToNow(connection.createdAt,{addSuffix:true})
        return (
            <Card key={connection.id} className='bg-sidebar w-full p-4 flex justify-between'>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center'>
                  <LockKeyholeIcon size={18} className='stroke-primary'/>
                </div>
                <div>
                  <p className='font-bold'>{connection.name}</p>
                  <p className='text-xs text-muted-foreground'>{createdAt}</p>
                </div>
              </div>
              <DeleteConnectionDialog name={connection.name}/>
            </Card>
        )})}
    </div>
  )
}

export default page