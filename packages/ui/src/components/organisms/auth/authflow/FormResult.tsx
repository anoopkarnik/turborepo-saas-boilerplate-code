import { FormResultProps } from '@repo/auth/utils/typescript';
import { BsExclamationTriangle,BsExclamationCircle } from 'react-icons/bs';
export const FormResult = ({type,message}:FormResultProps) => {
    if (!message) return null
    if (type === 'success') return (
        <div className=' bg-green-700/15 text-green-700 p-3 text-success flex items-center gap-x-2 text-sm rounded-md'>
            <BsExclamationCircle className='h-4 w-4'/>  
            <p>{message}</p>
        </div>
    )
    else return (
        <div className='bg-destructive/15 p-3 text-destructive flex items-center gap-x-2 text-sm rounded-md'>
            <BsExclamationTriangle className='h-4 w-4'/>  
            <p>{message}</p>
        </div>
    )
}