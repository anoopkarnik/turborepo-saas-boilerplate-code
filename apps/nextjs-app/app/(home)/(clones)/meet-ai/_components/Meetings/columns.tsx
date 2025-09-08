"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MeetingsGetMany } from "../../_utils/types"
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, CornerDownRightIcon, LoaderIcon, LucideClockAlert} from "lucide-react"
import { Badge } from "@repo/ui/atoms/shadcn/badge"
import { format} from "date-fns"
import { cn } from "@repo/ui/lib/utils"
import { formatDuration } from "../../_utils/functions"
import {AgentMeetingStatus} from "@prisma/client"

const statusIconsMap: Record<AgentMeetingStatus, React.ElementType> = {
  [AgentMeetingStatus.UPCOMING]: ClockArrowUpIcon,
  [AgentMeetingStatus.ONGOING]: LoaderIcon,
  [AgentMeetingStatus.COMPLETED]: CircleCheckIcon,
  [AgentMeetingStatus.PROCESSING]: LoaderIcon,
  [AgentMeetingStatus.CANCELLED]: CircleXIcon
}
  
const statusColorsMap: Record<AgentMeetingStatus, string> = {
  [AgentMeetingStatus.UPCOMING]: "bg-yellow-800/20 text-yellow-800 border-yellow-800/5",
  [AgentMeetingStatus.ONGOING]: "bg-blue-800/20 text-blue-800 border-blue-800/5",
  [AgentMeetingStatus.COMPLETED]: "bg-emerald-800/20 text-emerald-800 border-emerald-800/5",
  [AgentMeetingStatus.PROCESSING]: "bg-gray-800/20 text-gray-800 border-gray-800/5",
  [AgentMeetingStatus.CANCELLED]: "bg-rose-500/20 text-rose-800 border-rose-800/5"
}

type Meeting = MeetingsGetMany['items'][number]
export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original?.name}</span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground"/>
            <span className="text-sm text-muted-foreground max-w-[200px] truncate">
                {row.original?.agent?.name || 'No Agent'}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {row.original?.startedAt ? format(row.original.startedAt, "MMM d"): ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const Icon = statusIconsMap[row.original?.status as keyof typeof statusIconsMap];

        return (
            <Badge 
                variant={'outline'} 
                className={cn('capitalize [&>svg]:size-4 text-muted-foreground flex items-center gap-x-2 max-w-36',
                  statusColorsMap[row.original?.status as keyof typeof statusColorsMap]
                )}
            >
                <Icon  />
                {row.original?.status}
            </Badge>
        )
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
        <Badge variant={'outline'} className='capitalize [&>svg]:size-4 text-muted-foreground flex items-center gap-x-2 max-w-36'>
            <LucideClockAlert className="text-blue-700" />
            {row.original?.duration ? formatDuration(row.original.duration) : "No duration"}
        </Badge>
    )
  }
]
    