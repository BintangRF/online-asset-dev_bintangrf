import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { Toaster } from "vue-sonner";

const queryClient = new QueryClient();

const app = createApp(App);

app.component("Toaster", Toaster);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.mount("#app");
