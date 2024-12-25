import { createRouter, createWebHistory } from 'vue-router';
import { pveConfig } from './stores/pveConfig';
import ConfigForm from './components/ConfigForm.vue';
import VMList from './components/VMList.vue';

const routes = [
  {
    path: '/',
    redirect: to => {
      console.log(pveConfig.value,9999)
      return pveConfig.value.isConfigured ? '/vms' : '/config';
    }
  },
  {
    path: '/config',
    component: ConfigForm
  },
  {
    path: '/vms',
    component: VMList,
    beforeEnter: (to, from, next) => {
      if (!pveConfig.value.isConfigured) {
        next('/config');
      } else {
        next();
      }
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});