<template>
  <div class="relative min-h-screen">
    <!-- Background Image -->
    <img
      src="assets/img/clg.jpeg"
      alt="background"
      class="absolute inset-0 h-full w-full object-cover"
      style="z-index: -1"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 h-full w-full bg-black bg-opacity-60"></div>

    <!-- Header -->
    <Headerh class="h-17" />

    <!-- Content -->
    <section
      class="relative flex min-h-screen pt-5 items-center justify-center"
    >
      <!-- Glass Effect Container -->
      <div
        class="relative z-10 mt-14 w-full max-w-md rounded-lg bg-white bg-opacity-10 p-6 shadow-lg backdrop-blur-md sm:p-8 md:space-y-6"
      >
        <h1
          class="mb-6 text-center text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
        >
          Admin Login
        </h1>
        <form @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6">
          <div>
            <label
              for="username"
              class="mb-2 block text-sm text-white dark:text-white"
              >Username</label
            >
            <input
              type="text"
              name="username"
              id="username"
              v-model="username"
              class="focus:ring-primary-600 focus:border-primary-600 border border-white block w-full rounded-lg bg-gray-50 bg-opacity-60 p-2.5 text-gray-900 backdrop-blur-lg dark:bg-gray-700 dark:bg-opacity-10 dark:text-white dark:placeholder-gray-400 dark:backdrop-blur-lg dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter your username"
              maxlength="15"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="mb-2 block text-sm text-white dark:text-white"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="••••••••"
              class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-white bg-gray-50 bg-opacity-60 p-2.5 text-gray-900 backdrop-blur-lg dark:bg-gray-700 dark:bg-opacity-10 dark:text-white dark:placeholder-gray-400 dark:backdrop-blur-lg dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mx-auto block rounded-lg border border-white bg-transparent px-5 py-2.5 text-center text-sm text-white hover:text-bold hover:bg-white hover:text-blue-950 focus:outline-none focus:ring-4 dark:border-white"
            style="max-width: 200px"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
    <!-- Toast Component -->
    <Toastl
      :message="'Invalid username or password'"
      :isVisible="showToastl"
      @hide-toastl="showToastl = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Headerh from "~/components/Headerh.vue";
import Toast from "~/components/Toast.vue"; // Import the Toast component

const router = useRouter();
const username = ref("");
const password = ref("");
const showToastl = ref(false); // Declare showToast

const handleSubmit = () => {
  // Temporary authentication
  if (username.value === "admin" && password.value === "msec@123") {
    localStorage.setItem("role", "admin");
    router.push("/dashboard");
  } else {
    showToastl.value = true; // Show toast on failure
    setTimeout(() => {
      showToastl.value = false; // Hide toast after 3 seconds
    }, 3000);
  }
};
</script>

<style scoped>
html,
body {
  overflow: hidden;
}

button:hover {
  font-weight: bold;
}

.toast {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 1000;
}
</style>
