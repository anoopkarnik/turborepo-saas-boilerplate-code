import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { DEFAULT_PAGE } from "../_utils/constants";

export const useMeetingsFilters = () => {
    return useQueryStates({
        search: parseAsString.withDefault("").withOptions({clearOnDefault: true}),
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault: true})
    })
}