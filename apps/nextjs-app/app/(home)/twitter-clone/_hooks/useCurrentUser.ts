"use client"
import useSWR from 'swr';

import fetcher from '../_lib/fetcher';


const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/twitter/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;