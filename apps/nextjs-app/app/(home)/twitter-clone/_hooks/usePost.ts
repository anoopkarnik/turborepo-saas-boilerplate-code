"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const usePost = (postId:string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['post',postId], // Unique key for the query
    queryFn: async () => {
        if (!postId) return;
      const response = await axios.get(`/api/twitter/posts/${postId}`);
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

export default usePost;