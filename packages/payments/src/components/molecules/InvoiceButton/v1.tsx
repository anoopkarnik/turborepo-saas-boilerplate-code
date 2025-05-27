"use client"

import { Button } from '@repo/ui/atoms/shadcn/button'
import React from 'react'

const InvoiceBtn = ({id}:{id:string}) => {

  return (
    <a href={`${process.env.NEXT_PUBLIC_DODO_PAYMENTS_URL}/invoices/payments/${id}`} target='_blank'>
        <Button variant={"ghost"} size={"sm"} className='text-xs gap-2 text-muted-foreground px-1' >
            Invoice
        </Button>
    </a>
  )
}

export default InvoiceBtn