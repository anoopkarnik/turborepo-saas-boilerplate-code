import React from 'react'
import { motion } from "framer-motion";


const h2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.h2
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-3xl font-serif font-bold  my-4"
  >
    {children}
  </motion.h2>
  )
}

export default h2