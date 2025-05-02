"use client";
import { useQuery } from '@tanstack/react-query';
import { GetMessengerUserDetails } from '../_actions/users';

const useCurrentUser = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['currentUser'], // Unique key for the query
    queryFn: async () => {
      const response = await GetMessengerUserDetails();
      return response;
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