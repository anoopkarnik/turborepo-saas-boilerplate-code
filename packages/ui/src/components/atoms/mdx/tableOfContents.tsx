import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../molecules/shadcn/table'

const tableOfContents = ({ headings }: { headings: string[] }) => {
  return (
    <Table className="my-8">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Table of Contents</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {headings.map((heading, index) => (
          <TableRow key={index}>
            <TableCell>{heading}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default tableOfContents