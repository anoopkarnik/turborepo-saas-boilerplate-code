"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const usePosts = (userId?: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['posts', userId], // Unique key for the query
    queryFn: async () => {
      const response = await axios.get(userId ? `/api/twitter/posts?userId=${userId}` : '/api/twitter/posts');
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

export default usePosts;