/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */

import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import ExaminerPerformanceOverview from "../nursing/pages/ExaminerPerformanceOverview.component.vue";
import pageNotFoundComponent from "@/public/pages/page-not-found.component.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home',    component: HomeComponent, meta: { title: 'Home' } },
    { path: '/nursing/examiner-performance-overview',    component: ExaminerPerformanceOverview, meta: { title: 'Examiner Performance Overview' } },
    { path: '/',        redirect: '/home' },
    { path: '/:pathMatch(.*)*', component: pageNotFoundComponent },
  ],
});

/**
 * Set Business name as prefix for each page title
 */
router.beforeEach((to, from, next) => {
  let baseTitle = 'Hartford Institute for Geriatric Nursing';
  document.title = `${baseTitle} | ${to.meta['title']}`;
  next();
});

export default router;