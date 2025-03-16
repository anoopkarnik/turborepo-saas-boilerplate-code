import React from 'react'
import { motion } from "framer-motion";


const h3 = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.h3
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-2xl font-serif font-semibold  my-3"
  >
    {children}
  </motion.h3>
  )
}

export default h3