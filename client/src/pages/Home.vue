<template>
  <div
    class="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4"
  >
    <div
      class="card w-full max-w-lg bg-white shadow-xl border border-gray-200 rounded-lg p-6 text-center"
    >
      <h1 class="text-4xl font-extrabold mb-4 text-primary">
        Welcome to Asset Manager
      </h1>
      <p class="text-lg mb-6 text-gray-700">
        This page is part of the Online Asset Management test. It demonstrates a
        simple implementation of basic asset management features.
      </p>

      <div class="flex justify-center gap-4">
        <router-link to="/user" class="btn btn-primary btn-lg"
          >Go to User Page</router-link
        >
        <router-link to="/product" class="btn btn-primary btn-lg"
          >Go to Product Page</router-link
        >
      </div>
    </div>
  </div>
</template>
