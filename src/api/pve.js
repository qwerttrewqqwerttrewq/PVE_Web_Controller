import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_PVE_API_URL,
  headers: {
    'Content-Type': 'application/json',
'Authorization':'PVEAPIToken=root@pam!aaa=4d88c8ff-ebae-4fe6-ae8b-ea0d60195e37'
  },
});

export const getVMs = async () => {
  try {
    const response = await api.get('/nodes/PVE/qemu');
    return response.data;
  } catch (error) {
    console.error('Error fetching VMs:', error);
    throw error;
  }
};

export const startVM = async (vmid) => {
  try {
    await api.post(`/nodes/pve/qemu/${vmid}/status/start`);
  } catch (error) {
    console.error(`Error starting VM ${vmid}:`, error);
    throw error;
  }
};

export const stopVM = async (vmid) => {
  try {
    await api.post(`/nodes/pve/qemu/${vmid}/status/stop`);
  } catch (error) {
    console.error(`Error stopping VM ${vmid}:`, error);
    throw error;
  }
};