import axios from 'axios';
import { pveConfig } from '../stores/pveConfig';

export const getApiConfig = () => {
  const baseURL = `https://${pveConfig.value.domain}/api2/json`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `PVEAPIToken=root@pam!${pveConfig.value.tokenId}=${pveConfig.value.tokenSecret}`
  };
  
  return { baseURL, headers };
};

export const createApiClient = () => {
  const { baseURL, headers } = getApiConfig();
  return axios.create({ baseURL, headers });
};