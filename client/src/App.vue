<script setup>
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="navbar bg-primary text-primary-content shadow-lg">
      <div class="flex-1 px-4">
        <h1 class="text-xl font-bold">My App</h1>
      </div>
      <div class="flex-none px-2">
        <nav class="menu menu-horizontal px-1">
          <router-link class="btn btn-ghost rounded-btn" to="/"
            >Home</router-link
          >
          <router-link class="btn btn-ghost rounded-btn" to="/user"
            >User</router-link
          >
          <router-link class="btn btn-ghost rounded-btn" to="/product"
            >Product</router-link
          >
        </nav>
      </div>
    </header>

    <Toaster position="top-center" expand richColors closeButton theme="dark" />

    <main class="flex-1 p-4 bg-base-200">
      <router-view />
    </main>

    <footer class="footer p-4 bg-primary text-primary-content text-center">
      <p>© 2025 My App</p>
    </footer>
  </div>
</template>
