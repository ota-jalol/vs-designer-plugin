import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'designer',
      component: () => import('./modules/designer/pages/DesignerPage.vue')
    }
  ]
});

export default router;
