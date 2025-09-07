"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentsGetOne } from "../_utils/types"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { Badge } from "@repo/ui/atoms/shadcn/badge"


export const columns: ColumnDef<AgentsGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <div className="font-semibold capitalize">{row.original?.name}</div>
        </div>
        <div className="flex items-center gap-x-2">
            <CornerDownRightIcon className="size-3 text-muted-foreground"/>
            <span className="text-sm text-muted-foreground max-w-[200px] truncate">
                {row.original?.instructions}
            </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
        <Badge variant={'outline'} className='flex items-center gap-x-2 [&>svg]:size-4 max-w-36 py-2'>
            <VideoIcon className="text-blue-700" />
            {row.original?.meetingCount} {row.original?.meetingCount === 1 ? "meeting" : "meetings" }
        </Badge>
    )
    
  }
]