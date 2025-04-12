import React from 'react'
import { Button } from '../../../atoms/shadcn/button'


const LoadingButton = ({variant,pending, children, onClick}:{
  variant:any, pending:boolean, children: React.ReactNode, onClick?: ()=>void}) => {
  return (
    <Button onClick={onClick} variant={variant} disabled={pending} type="submit" className='w-full'>
      {pending? (
        <div className='flex items-center justify-center'>
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8.009 8.009 0 0 1 12 20Z"
            />
          </svg>
        
        </div>
      ):(children)}
    </Button>
  )
}

export default LoadingButton