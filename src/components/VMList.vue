<script setup>
import { ref, onMounted } from 'vue';
import { getNodes } from '../api/nodes';
import { getVMs } from '../api/vms';
import VMCard from './VMCard.vue';
import { useRouter } from 'vue-router';
import { pveConfig } from '../stores/pveConfig';
const startLoading = () => {
  loading.value = true;
};
const router = useRouter();
const nodes = ref([]);
const vms = ref([]);
const loading = ref(true);
const error = ref(null);
const fetchNewData = async () => {
  loading.value = true;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchData());
    }, 5000);
  });

};
const fetchData = async () => {
  try {
    loading.value = true;
    const nodeList = await getNodes();
    nodes.value = nodeList;
    
    if (nodeList.length > 0) {
      const nodeId = nodeList[0].node;
      const vmList = await getVMs(nodeId);
      vms.value = vmList.map(vm => ({ ...vm, nodeId }));
    }
  } catch (err) {
    error.value = 'Failed to fetch data';
  } finally {
    loading.value = false;
  }
};

const resetConfig = () => {
  pveConfig.value.isConfigured = false;
  router.push('/config');
};

onMounted(fetchData);
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
    <header class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        PVE VM Control
      </h1>
      <button
        @click="resetConfig"
        class="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Change Server
      </button>
    </header>

    <main>
      <div v-show="loading" class="text-center py-8">
        <p class="text-gray-600 dark:text-gray-400">Loading VMs...</p>
      </div>

      <div v-show="error" class="text-center py-8">
        <p class="text-red-600">{{ error }}</p>
        <button
          @click="fetchData"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>

      <div v-show="!loading&&!error" class="space-y-4">
        <button
          @click="fetchData"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Refresh
        </button>
        <VMCard
          v-for="vm in vms"
          :key="vm.vmid"
          :vm="vm"
          @update="fetchNewData"
          @loading="startLoading"
        />
      </div>
    </main>
  </div>
</template>