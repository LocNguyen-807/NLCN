import { createWebHistory, createRouter } from 'vue-router';
import Index from '@/pages/Index.vue';

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/pages/NotFound.vue'),
    },

    // {
    //     path: '/contact/:id',
    //     name: 'contact.edit',
    //     component: () => import('@/views/ContactEdit.vue'),
    //     props: (route) => ({ contactId: route.params.id })
    // },

    // {
    //     path: '/contact/add',
    //     name: 'contact.add',
    //     component: () => import('@/views/ContactAdd.vue'),
    // }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
}); 

export default router;