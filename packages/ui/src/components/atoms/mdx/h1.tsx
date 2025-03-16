import React from 'react'
import { motion } from "framer-motion";


const h1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.h1
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-5xl font-serif font-bold  my-6"
  >
    {children}
  </motion.h1>
  )
}

export default h1