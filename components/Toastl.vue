<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
  >
    <div
      class="bg-white text-red-800 bg-opacity-50 p-4 rounded border border-red-800 shadow-lg max-w-sm w-full"
    >
      <p class="text-center text-lg">{{ message }}</p>
      <div class="flex justify-center">
        <button
          @click="$emit('hide-toast')"
          class="mt-4 w-auto border border-red-800 text-white py-2 px-4 rounded hover:bg-white hover:text-red-800"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* Add specific styles for Toast if needed */
</style>
