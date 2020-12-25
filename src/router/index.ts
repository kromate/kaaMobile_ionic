import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
const Book= () => import("@/views/Book.vue");
const Video= () => import("@/views/Video.vue");
const Article= () => import("@/views/Article.vue");
const Upload= () => import("@/views/Upload.vue");
const Guide= () => import("@/views/Guide.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Guide
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
