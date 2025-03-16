import React from 'react'
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from '../shadcn/alert';

const MdxAlert = ({children,title}:{children:React.ReactNode,title:string}) => {
  return (
    <Alert className="my-8">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

export default MdxAlert