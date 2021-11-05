import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { // 场景
    path: '/scene',
    name: 'Scene',
    component: () => import(/* webpackChunkName: "Scene" */ '../views/Scene.vue')
  },
  { // 灯光
    path: '/light',
    name: 'Light',
    component: () => import(/* webpackChunkName: "Light" */ '../views/Light.vue')
  },
  { // 模型
    path: '/model',
    name: 'Model',
    component: () => import(/* webpackChunkName: "Model" */ '../views/Model.vue')
  },
  { // 材质
    path: '/texture',
    name: 'Texture',
    component: () => import(/* webpackChunkName: "Texture" */ '../views/Texture.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
