import { useQuery } from 'react-query';
import apiClient from './client';

const fetchNotifications = async () => {
  const response = await apiClient.get('/c/c3fe-1100-48fa-90f3');
  console.log('API response:', response.data); // Log the response data
  return response.data;
};

export const useNotifications = () => {
  return useQuery('notifications', fetchNotifications, {
    onError: (error) => {
      console.error('Failed to fetch notifications:', error);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
