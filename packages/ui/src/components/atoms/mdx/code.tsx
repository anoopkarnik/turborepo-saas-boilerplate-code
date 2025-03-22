import React from 'react'
import { Card, CardContent } from '../../molecules/shadcn/card'

const code = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="bg-background/50 rounded-lg my-8 shadow-lg overflow-x-auto">
    <CardContent className="p-4">
      <pre className="text-sm text-foreground font-mono whitespace-pre-wrap break-words">
        {children}
      </pre>
    </CardContent>
  </Card>
  )
}

export default code