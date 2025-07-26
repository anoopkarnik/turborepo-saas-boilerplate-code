
import { CONNECTIONS } from "@repo/connections/lib/constants";
import ConnectionCard from "./ConnectionCard";

const AddConnectionsList = () => {
  return (
    <div className='flex flex-1 flex-col h-full p-4'>
        <div className='flex justify-between'>
            <div className='flex flex-col'>
                <h1 className='text-3xl font-bold'>Add New Connections</h1>
                <p className='text-muted-foreground'>Add New Connections</p>
            </div>
        </div>
        <div className='flex items-center justify-start flex-wrap gap-4 my-4 pb-20'>
            {CONNECTIONS.filter((conn)=>conn.published).map((connection, index) => (
                <div key={index} >
                    <ConnectionCard connection={connection}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AddConnectionsList