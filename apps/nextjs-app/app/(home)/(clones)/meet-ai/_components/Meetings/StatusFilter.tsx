import { AgentMeetingStatus } from "@prisma/client";
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, LoaderIcon } from "lucide-react";
import { useMeetingsFilters } from "../../_hooks/useMeetingsFilters";
import CommandSelect from "./CommandSelect";

const options = [
    {id: AgentMeetingStatus.CANCELLED, value: AgentMeetingStatus.CANCELLED,
        children:(<div className="flex items-center gap-x-2 capitalize">
            <CircleXIcon/> {AgentMeetingStatus.CANCELLED.toLowerCase()}
        </div>)
    },
    {id: AgentMeetingStatus.COMPLETED, value: AgentMeetingStatus.COMPLETED,
        children:(<div className="flex items-center gap-x-2 capitalize">
            <CircleCheckIcon/> {AgentMeetingStatus.COMPLETED.toLowerCase()}
        </div>)
    },
    {id: AgentMeetingStatus.ONGOING, value: AgentMeetingStatus.ONGOING,
        children:(<div className="flex items-center gap-x-2 capitalize">
            <LoaderIcon/> {AgentMeetingStatus.ONGOING.toLowerCase()}
        </div>)
    },
    {id: AgentMeetingStatus.PROCESSING, value: AgentMeetingStatus.PROCESSING,
        children:(<div className="flex items-center gap-x-2 capitalize">
            <LoaderIcon/> {AgentMeetingStatus.PROCESSING.toLowerCase()}
        </div>)
    },
    {id: AgentMeetingStatus.UPCOMING, value: AgentMeetingStatus.UPCOMING,
        children:(<div className="flex items-center gap-x-2 capitalize">
            <ClockArrowUpIcon/> {AgentMeetingStatus.UPCOMING.toLowerCase()}
        </div>)
    }
]

export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilters()
    return (
        <CommandSelect placeholder="Status" className="h-9 max-w-xs" options={options} 
        onSelect={value => setFilters({status: value as AgentMeetingStatus})} 
        value={filters.status ?? ""}
        />
    )
}