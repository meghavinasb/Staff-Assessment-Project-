<template>
  <header class="shadow-sm shadow-blue-950 bg-transparent font-bold h-17">
    <nav
      class="p-6 flex justify-between items-center w-full"
      aria-label="Main Navigation"
    >
      <div class="flex items-center gap-4">
        <img src="assets/img/msec.png" class="h-10 w-auto" alt="logo" />
        <nuxt-link to="/about" class="space-grotesk-regular text-xl text-black">
          Meenakshi Sundararajan Engineering College (Autonomous) Chennai - 24
        </nuxt-link>
      </div>
      <ul class="flex gap-4 text-black space-grotesk-regular">
        <li class="text-md">
          <nuxt-link
            to="/about"
            :class="{ underline: isActiveRoute('/about') }"
            aria-current="page"
            v-if="isActiveRoute('/about')"
          >
            About Me
          </nuxt-link>
          <nuxt-link
            to="/about"
            :class="{ underline: isActiveRoute('/about') }"
            v-else
          >
            About Me
          </nuxt-link>
        </li>
        <li class="text-md">
          <nuxt-link
            to="/feedback"
            :class="{ underline: isActiveRoute('/feedback') }"
            aria-current="page"
            v-if="isActiveRoute('/feedback')"
          >
            Assesment
          </nuxt-link>
          <nuxt-link
            to="/feedback"
            :class="{ underline: isActiveRoute('/feedback') }"
            v-else
          >
            Assesment
          </nuxt-link>
        </li>
        <li class="text-md">
          <nuxt-link
            to="/personality"
            :class="{ underline: isActiveRoute('/personality') }"
            aria-current="page"
            v-if="isActiveRoute('/personality')"
          >
            Personality
          </nuxt-link>
          <nuxt-link
            to="/personality"
            :class="{ underline: isActiveRoute('/personality') }"
            v-else
          >
            Personality
          </nuxt-link>
        </li>
        <nuxt-link to="/logout" class="text-md pr-5">Logout</nuxt-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    isActiveRoute(route) {
      return this.$route.path === route;
    },
    logout() {
      try {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.replace("/login");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } catch (error) {
        console.error("Logout error:", error);
        // Handle the error appropriately, e.g., display an error message to the user.
      }
    },
  },
};
</script>
