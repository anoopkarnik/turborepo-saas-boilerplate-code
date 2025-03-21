"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useNotification = (userId?:string) => {
    const url = userId ? `/api/twitter/notifications/${userId}` : null;
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['notification',userId], // Unique key for the query
    queryFn: async () => {
        if (!url) return;
      const response = await axios.get(url);
      return response.data;
    },
  });

  return {
    data,
    error,
    isLoading,
    refetch, // Equivalent to `mutate` in SWR
  };
};

export default useNotification;