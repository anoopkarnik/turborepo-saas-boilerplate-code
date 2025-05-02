import React, { useEffect, useState } from 'react'
import SettingsHeading from '../../../molecules/settings/SettingsHeader/v1'
import { ConnectionCardProps } from '@repo/ts-types/home/v1'
import ConnectionCard from '../../../molecules/connections/ConnectionCard/v1'
import { deleteConnectionAction, getConnectionsAction } from '@repo/server-utils/connections'
import { useSession} from "@repo/auth/better-auth/auth-client";
import Image from 'next/image'
import { Button } from '../../../atoms/shadcn/button'
import ConfirmDialog from '../../../molecules/misc/ConfirmDialog/v1'
import { useTheme } from 'next-themes'


const MyConnectionsSettings = ({connections}:{connections:ConnectionCardProps[] | undefined}) => {
    const title = 'My Connections'
    const description = 'All your Third Party Connections in one place'
    const { data:session } = useSession();   
    const [myConnections, setMyConnections] = useState<any>([])
    const {theme} = useTheme();
    
    useEffect(() => {

    }, [theme]);

    const getMyConnections = async () =>{
        const myConnections = await getConnectionsAction(session?.user?.id as string)
        const modifiedMyConnections = myConnections?.map((connection:any) => {
            const connectionDetails = connections?.filter((conn) => conn.title === connection.type)[0]
            return {
                ...connection,
                ...connectionDetails
            }
        })

        setMyConnections(modifiedMyConnections)
    }

    useEffect(() =>{
        getMyConnections()
    },[])

    const deleteConnection = async (id:string) =>{
        await deleteConnectionAction(id)
        await getMyConnections()
    }

  return (
    <SettingsHeading title={title} description={description}>
        <div className='flex items-center justify-between border-b-2 pb-2'>
            <div className='text-description'>Connection</div>
            <div className='text-description'>Actions</div>
        </div>
        {myConnections?.map((connection:any, index:string) => (
            <div key={index} className='flex items-center justify-between border-b-2'>
                <div className='flex items-center justify-start gap-2 py-2'>
                     {theme === "dark" ?
                        <Image src={connection.darkLogo} alt='/next.svg' width={15} height={15} /> : 
                        <Image src={connection.logo} alt='/next.svg' width={15} height={15} />}
                    <div className='text-paragraph'>{connection.name}</div>
                </div>
                <div className='cursor-pointer opacity-100 hover:opacity-50 '>
                    <ConfirmDialog
                        alertActionFunction={()=>deleteConnection(connection.id)} 
                        alertTitle='Delete Connection' 
                        alertDescription='Are you sure you want to delete this connection? You will lose other data associated with this connection'
                        buttonDiv={
                            <Button size="xs" variant="destructive">
                                Delete
                            </Button>
                        }
                        alertActionText='Delete'
                    /> 

                </div>
            </div>
        ))}
        <div className='text-emphasis mt-4'>
            Discover New Connections
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-4 pb-20'>
            {connections?.map((connection, index) => (
                <div key={index} >
                    <ConnectionCard connection={connection}/>
                </div>
            ))}
        </div>

    </SettingsHeading>
  )
}

export default MyConnectionsSettings