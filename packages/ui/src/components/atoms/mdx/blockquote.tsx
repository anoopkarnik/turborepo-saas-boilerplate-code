import React from 'react'
import { Card, CardContent } from '../../molecules/shadcn/card'

const blockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="border-l-[1px] border-primary pl-4 italic text-foreground/60 my-4">
      {children}
    </blockquote>
  )
}

export default blockquote