"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUsers = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['users'], // Unique key for the query
    queryFn: async () => {
      const response = await axios.get('/api/twitter/users');
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

export default useUsers;