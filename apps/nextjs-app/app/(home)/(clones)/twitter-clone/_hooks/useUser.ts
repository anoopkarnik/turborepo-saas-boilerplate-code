"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUser = (userId:string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['user'], // Unique key for the query
    queryFn: async () => {
        if (!userId) return;
      const response = await axios.get(`/api/twitter/users/${userId}`);
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

export default useUser;