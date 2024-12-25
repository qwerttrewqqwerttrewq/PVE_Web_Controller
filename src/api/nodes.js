import { createApiClient } from './config';

export const getNodes = async () => {
  try {
    const api = createApiClient();
    const response = await api.get('/nodes');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching nodes:', error);
    throw error;
  }
};