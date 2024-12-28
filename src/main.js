import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router';
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('Service Worker registered with scope: ', registration.scope);
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                alert('New version available. Please refresh the page.');
              } else {
                console.log('Content cached for offline use.');
              }
            }
          };
        };
      }).catch(error => {
        console.log('Service Worker registration failed: ', error);
      });
    });
  }
  
const app = createApp(App);
app.use(router);
app.mount('#app');