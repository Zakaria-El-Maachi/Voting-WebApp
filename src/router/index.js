import { createRouter, createWebHistory } from 'vue-router';
import AuthComponent from '../components/AuthComponent.vue';
import { auth } from "../firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import UserProfile from '@/components/UserProfile.vue';
import EventsList from '@/components/EventsList.vue';
import EventForm from '@/components/EventForm.vue';

const routes = [
  { path: '/', name: 'AuthComponent', component: AuthComponent },
  { path: '/events', name: 'Events', component: EventsList, meta: { requiresAuth: true } },
  { path: '/create', name: 'EventCreate', component: EventForm, meta: { requiresAuth: true } },
  { path: '/profile', name: 'UserProfile', component: UserProfile, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isAuthChecked = false;

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!isAuthChecked) {
    onAuthStateChanged(auth, (user) => {
      isAuthChecked = true;

      if (requiresAuth && !user) {
        next('/');
      } else {
        next();
      }
    });
  } else {
    const user = auth.currentUser;
    if (requiresAuth && !user) {
      next('/');
    } else {
      next();
    }
  }
});


export default router;

