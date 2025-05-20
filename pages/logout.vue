<template>
  <div>
    <h1 style="margin: 100px">Logout redirect to Student Home page</h1>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: function (to, from) {
    if (localStorage.getItem("role") === "student") {
      localStorage.clear();
      sessionStorage.clear();
      return navigateTo("/login");
    } else if (localStorage.getItem("role") === "admin") {
      localStorage.clear();
      sessionStorage.clear();
      return navigateTo("/adminh");
    } else {
      localStorage.clear();
      sessionStorage.clear();
      return navigateTo("/");
    }
  },
});
</script>
