import { createApiClient } from './config';

export const getVMs = async (nodeId) => {
  try {
    const api = createApiClient();
    const response = await api.get(`/nodes/${nodeId}/qemu`);
    const sortedVMs = response.data.data.sort((a, b) => {
      return a.vmid - b.vmid;
    });
    return sortedVMs;
  } catch (error) {
    console.error('Error fetching VMs:', error);
    throw error;
  }
};

export const startVM = async (nodeId, vmid) => {
  try {
    const api = createApiClient();
    await api.post(`/nodes/${nodeId}/qemu/${vmid}/status/start`);
  } catch (error) {
    console.error(`Error starting VM ${vmid}:`, error);
    throw error;
  }
};

export const stopVM = async (nodeId, vmid) => {
  try {
    const api = createApiClient();
    await api.post(`/nodes/${nodeId}/qemu/${vmid}/status/stop`);
  } catch (error) {
    console.error(`Error stopping VM ${vmid}:`, error);
    throw error;
  }
};