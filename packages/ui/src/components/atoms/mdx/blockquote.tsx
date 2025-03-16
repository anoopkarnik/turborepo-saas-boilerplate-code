import React from 'react'
import { Card, CardContent } from '../../molecules/shadcn/card'

const blockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="border-indigo-400 bg-indigo-50 rounded-lg my-8 shadow-sm">
    <CardContent className="italic p-5">
      {children}
    </CardContent>
  </Card>
  )
}

export default blockquote