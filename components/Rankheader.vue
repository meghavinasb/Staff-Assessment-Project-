<template>
  <header class="shadow-sm shadow-blue-950 bg-transparent font-bold h-17">
    <nav class="p-6 flex justify-between items-center w-full">
      <!-- Left Side: Logo and College Name -->
      <div class="flex items-center gap-4">
        <img src="assets/img/msec.png" class="h-10 w-auto" alt="logo" />
        <span class="space-grotesk-regular text-xl text-black">
          <nuxt-link to="/dashboard">
            Meenakshi Sundararajan Engineering College (Autonomous) Chennai - 24
          </nuxt-link>
        </span>
      </div>

      <!-- Right Side: Navigation Links -->
      <ul class="flex gap-4 text-bl space-grotesk-regular">
        <li class="text-md pr-5">
          <nuxt-link to="/adminl">Log Out</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
