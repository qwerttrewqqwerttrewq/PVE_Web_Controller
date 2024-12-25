import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

export const pveConfig = ref({
  domain: useStorage('pve-domain', ''),
  tokenId: useStorage('pve-token-id', ''),
  tokenSecret: useStorage('pve-token-secret', ''),
  isConfigured: useStorage('pve-configured', false)
});