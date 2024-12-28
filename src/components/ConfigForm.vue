<script setup>
import { pveConfig } from '../stores/pveConfig';
import { useRouter } from 'vue-router';

const router = useRouter();

const saveConfig = () => {
  console.log(pveConfig.value)
  if (pveConfig.value.domain && pveConfig.value.tokenId && pveConfig.value.tokenSecret) {
    pveConfig.value.isConfigured = true;
    router.push('/vms');
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">PVE Configuration</h2>
      
      <form @submit.prevent="saveConfig" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Domain(handle CORS is required)
          </label>
          <input
            v-model="pveConfig.domain"
            type="text"
            placeholder="192.168.6.226:8006"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Token ID
          </label>
          <input
            v-model="pveConfig.tokenId"
            placeholder="mytoken"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Token Secret
          </label>
          <input
            v-model="pveConfig.tokenSecret"
            type="password"
            placeholder="4d88c8ff-ebae-4fe6-ae8b-ea0d60195e37"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Configuration
        </button>
      </form>
    </div>
  </div>
</template>