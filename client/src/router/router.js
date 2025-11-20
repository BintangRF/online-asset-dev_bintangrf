import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import UserPage from "../pages/UserPage.vue";
import ProductPage from "../pages/ProductPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "UserPage",
    component: UserPage,
  },
  {
    path: "/product",
    name: "ProductPage",
    component: ProductPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
