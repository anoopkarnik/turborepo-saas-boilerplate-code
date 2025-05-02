"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCurrentUser = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['currentUser'], // Unique key for the query
    queryFn: async () => {
      const response = await axios.get('/api/twitter/current');
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

export default useCurrentUser;