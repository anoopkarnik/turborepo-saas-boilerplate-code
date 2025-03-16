import React from 'react'
import {Badge} from '../shadcn/badge'

const MdxBadge = ({children}:{children:React.ReactNode}) => {
  return (
    <Badge className="my-2 inline-block">{children}</Badge>
  )
}

export default MdxBadge