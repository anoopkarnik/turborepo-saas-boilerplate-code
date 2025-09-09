import { parseAsInteger, parseAsString, useQueryStates, parseAsStringEnum } from "nuqs";
import { DEFAULT_PAGE } from "../_utils/constants";
import { AgentMeetingStatus } from "@prisma/client";

export const useMeetingsFilters = () => {
    return useQueryStates({
        search: parseAsString.withDefault("").withOptions({clearOnDefault: true}),
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault: true}),
        status: parseAsStringEnum(Object.values(AgentMeetingStatus)),
        agentId: parseAsString.withDefault("").withOptions({clearOnDefault: true})
    })
}