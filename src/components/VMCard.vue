<script setup>
import { ref } from 'vue';
import { startVM, stopVM } from '../api/vms';

const props = defineProps({
  vm: {
    type: Object,
    required: true
  }
});
const emit = defineEmits();
const loading = ref(false);

const handleAction = async (action) => {
  emit('loading');
  loading.value = true;
  try {
    if (action === 'start') {
      await startVM(props.vm.nodeId, props.vm.vmid);
    } else {
      await stopVM(props.vm.nodeId, props.vm.vmid);
    }
  } catch (error) {
    console.error('Action failed:', error);
  } finally {
    loading.value = false;
    emit('update')
  }
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ vm.name }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          ID: {{ vm.vmid }}
        </p>
        <div class="mt-2">
          <span
            :class="{
              'px-2 py-1 text-xs font-semibold rounded-full': true,
              'bg-green-100 text-green-800': vm.status === 'running',
              'bg-red-100 text-red-800': vm.status === 'stopped'
            }"
          >
            {{ vm.status }}
          </span>
        </div>
      </div>
      <div class="flex space-x-2">
        <button
          @click="handleAction('start')"
          :disabled="loading || vm.status === 'running'"
          class="px-3 py-1 bg-green-500 text-white rounded-md disabled:opacity-50"
        >
          Start
        </button>
        <button
          @click="handleAction('stop')"
          :disabled="loading || vm.status === 'stopped'"
          class="px-3 py-1 bg-red-500 text-white rounded-md disabled:opacity-50"
        >
          Stop
        </button>
      </div>
    </div>
  </div>
</template>