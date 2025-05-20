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
    <section class="relative flex min-h-screen items-center justify-center">
      <!-- Glass Effect Container -->
      <div
        class="relative mt-16 z-10 w-full max-w-md rounded-lg bg-white bg-opacity-10 p-6 shadow-lg backdrop-blur-md sm:p-8 md:space-y-6"
      >
        <h1
          class="mb-6 text-center text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
        >
          Student Login
        </h1>
        <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
          <div>
            <label
              for="number"
              class="mb-2 block text-sm text-white dark:text-white"
              >Register number</label
            >
            <input
              name="number"
              id="number"
              v-model="reg_no"
              class="focus:ring-primary-600 focus:border-primary-600 border border-white block w-full rounded-lg bg-gray-50 bg-opacity-60 p-2.5 text-gray-900 backdrop-blur-lg dark:bg-gray-700 dark:bg-opacity-10 dark:text-white dark:placeholder-gray-400 dark:backdrop-blur-lg dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="xxxxxxxxxxxx"
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
            class="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mx-auto block rounded-lg border border-white bg-transparent px-5 py-2.5 text-center text-sm text-white hover:bg-white hover:text-blue-950 focus:outline-none focus:ring-4 dark:border-white"
            style="max-width: 200px"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
    <!-- Toast Component -->
    <Toastl
      :message="'Invalid Credential'"
      :isVisible="showToastl"
      @hide-toastl="showToastl = false"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { fetchEmailByRegNo } from "~/services/auth";
import { useRouter } from "vue-router"; // Import useRouter

const reg_no = ref("");
const password = ref("");
const router = useRouter(); // Initialize useRouter
const showToastl = ref(false); // Declare showToastl

async function handleLogin() {
  console.log("Checking credentials...");
  try {
    const result = await fetchEmailByRegNo(reg_no.value, password.value);
    console.log(result);
    if (result === "Logged in successfully") {
      localStorage.setItem("role", "student"); // Set isStudent to true in localStorage
      router.push("/about"); // Redirect to /about
      showToastl.value = false; // Ensure toast is not shown on successful login
    } else if (result === "Admin Logged in successfully") {
      localStorage.setItem("isStudent", "false");
      showToastl.value = false; // Ensure toast is not shown for admin login
    } else {
      localStorage.setItem("isStudent", "None"); // Set isStudent to false if login fails
      showToastl.value = true; // Show toast on failure
      setTimeout(() => {
        showToastl.value = false; // Hide toast after 3 seconds
      }, 3000);
    }
  } catch (error) {
    console.error("Login error:", error);
    localStorage.setItem("isStudent", "false"); // Set isStudent to false on error
    showToastl.value = true; // Show toast on error
    setTimeout(() => {
      showToastl.value = false; // Hide toast after 3 seconds
    }, 3000);
  }
}
</script>

<style scoped>
html,
body {
  overflow: hidden;
}
</style>
