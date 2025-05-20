<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const sharedData = useSharedStore();
sharedData.authenticated = await sharedData.checkIfAuthenticated();
</script>
