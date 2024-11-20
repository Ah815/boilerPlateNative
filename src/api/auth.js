import { useMutation } from 'react-query';
import apiClient from './client';
import StorageService from '../service/storageService';

const loginUser = async ({ email, password }) => {
  const response = await apiClient.post('/c/78fc-1522-40ed-a637', { email, password });
  console.log('API Response:', response.data); 
  return response.data;
};

export const useLogin = (options = {}) => {
  return useMutation(loginUser, {
    onSuccess: async (data) => {
      console.log('Login successful:', data);

      const token = data.token;
      if (token) {
        await StorageService.store('authToken', token); 
        await StorageService.logToken(); 
      } else {
        console.warn('No token found in API response');
      }

      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
    ...options,
  });
};
