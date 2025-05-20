<template>
  <div class="relative min-h-screen">
    <Headerh />

    <img
      src="assets/img/clg.jpeg"
      alt="background"
      class="absolute inset-0 w-full h-full object-cover"
      style="z-index: -1"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 h-full w-full bg-black bg-opacity-60"></div>

    <!-- Header -->

    <!-- Content -->
    <div
      class="relative overflow-hidden p-6 md:p-12 text-center flex items-center justify-center"
      style="min-height: 100vh"
    >
      <div class="relative z-10 text-white mt-14">
        <!-- Adjust the text size to be responsive and fill the page -->
        <h2
          class="mb-4 text-[8vw] md:text-[8vw] lg:text-[6vw] font-qwitcher-grypen-regular italic leading-tight"
        >
          Staff Assessment by Students
        </h2>

        <button
          type="button"
          class="rounded border-2 border-neutral-50 px-6 pb-[10px] pt-[12px] text-xs md:text-sm lg:text-base font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 mt-8"
          @click="goToLogin"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Headerh from "@/components/Headerh.vue";
</script>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Prevent page scrolling */
html,
body {
  overflow: hidden;
}
</style>
