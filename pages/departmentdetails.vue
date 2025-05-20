<template>
  <div class="min-h-screen overflow-auto">
    <Headerd />

    <div class="container mx-auto pt-28">
      <div v-if="isLoading" class="text-center text-white">Loading...</div>

      <div v-else class="grid grid-cols-4 gap-8 justify-items-center mb-20">
        <nuxt-link
          v-for="staff in staffData"
          :key="staff.id"
          :to="`/facultydetails/${staff.id}`"
          class="department transform hover:scale-110 transition duration-300 text-center text-cyan-400"
        >
          <div class="flex flex-col items-center">
            <img :src="staff.Image_url" alt="Staff Image" class="h-24 w-24" />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center"
            >
              {{ staff.Name }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Headerd from "~/components/Headerd.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // Make sure to import this
import { getStaffByDept } from "~/services/getStaffByDept.js";

const staffData = ref([]);
const isLoading = ref(true);
const departmentName = useRoute().query.department;
console.log(departmentName);


const fetchStaffData = async () => {
  try {
    const data = await getStaffByDept(departmentName);
    staffData.value = data;
  } catch (error) {
    console.error("Error fetching staff data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Use a single onMounted hook
onMounted(() => {
  fetchStaffData();
});
</script>

<style scoped>
.department {
  width: 100%;
  max-width: 300px;
}

.details {
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container {
  max-width: 1200px; /* Adjust as needed */
  padding-left: 1rem;
  padding-right: 1rem;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  row-gap: 6rem; /* Adjust the gap as needed */
}

@media (max-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
