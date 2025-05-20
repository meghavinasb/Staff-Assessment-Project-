<template>
  <header
    class="absolute top-0 left-0 right-0 bg-transparent z-20 edu-vic-wa-nt-beginner-bold"
  >
    <nav
      class="container mx-auto p-4 md:p-6 flex flex-wrap justify-between items-center"
    >
      <!-- Group the logo and college name together -->
      <div class="flex items-center gap-2 md:gap-4">
        <img src="assets/img/msec.png" class="h-12 w-auto md:h-14" alt="logo" />
        <nuxt-link
          to="/"
          class="text-md md:text-2xl text-white space-grotesk-regular"
        >
          <h2>
            Meenakshi Sundararajan Engineering College (Autonomous) Chennai - 24
          </h2>
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script></script>

<style scoped>
/* Ensure the header scales properly on mobile */
header {
  padding: 0.5rem; /* Responsive padding for mobile */
}

@media (min-width: 768px) {
  header {
    padding: 1.5rem; /* Larger padding for tablets and up */
  }
}

img {
  height: 3rem; /* Increase height for mobile */
}

@media (min-width: 768px) {
  img {
    height: 3.5rem; /* Increase height for tablets and up */
  }
}

nuxt-link {
  font-size: 1.25rem; /* Smaller font size for mobile */
}

@media (min-width: 768px) {
  nuxt-link {
    font-size: 2rem; /* Larger font size for tablets and up */
  }
}

.container {
  width: 100%;
  max-width: 100%;
}
</style>
