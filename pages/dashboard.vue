<template>
  <div class="min-h-screen">
    <Headerd />
    <div class="container mx-auto pt-28">
      <div class="grid grid-cols-4 gap-4 justify-items-center mb-20">
        <!-- AI&DS Department -->
        <NuxtLink
          :to="{
            path: '/departmentdetails',
            query: { department: 'Artificial Intelligence and Data Science' },
          }"
          class="department transform hover:scale-110 transition duration-300 text-center text-cyan-400"
        >
          <div class="flex flex-col items-center">
            <img src="/assets/img/ai.png" alt="AI&DS" class="w-24 h-24" />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center"
            >
              Artificial Intelligence and Data Science
            </div>
          </div>
        </NuxtLink>

        <!-- IT Department -->
        <NuxtLink
          :to="{
            path: '/departmentdetails',
            query: { department: 'Information Technology' },
          }"
          class="department transform text-center text-cyan-400 transition duration-300 hover:scale-110"
        >
          <div class="flex flex-col items-center">
            <img src="/assets/img/it.png" alt="IT" class="h-24 w-24" />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center"
            >
              Information Technology
            </div>
          </div>
        </NuxtLink>

        <!-- Humanities and Sciences Department -->
        <NuxtLink
          :to="{
            path: '/departmentdetails',
            query: { department: 'Humanties and Sciences' },
          }"
          class="department transform hover:scale-110 transition duration-300 text-center text-cyan-400"
        >
          <div class="flex flex-col items-center">
            <img
              src="/assets/img/humanities.png"
              alt="Humanities"
              class="w-24 h-24"
            />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center"
            >
              Humanities and Sciences
            </div>
          </div>
        </NuxtLink>

        <!-- CSE Department -->
        <NuxtLink
          :to="{
            path: '/departmentdetails',
            query: { department: 'Computer Science Engineering' },
          }"
          class="department transform hover:scale-110 transition duration-300 text-center text-cyan-400"
        >
          <div class="flex flex-col items-center">
            <img src="/assets/img/cse.png" alt="CSE" class="w-24 h-24" />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center"
            >
              Computer Science Engineering
            </div>
          </div>
        </NuxtLink>

        <!-- ECE Department -->
        <NuxtLink
          :to="{
            path: '/departmentdetails',
            query: { department: 'Electronics and Communication Engineering' },
          }"
          class="department transform hover:scale-110 transition duration-300 text-center text-cyan-400"
        >
          <div class="flex flex-col items-center">
            <img src="/assets/img/ece.png" alt="ECE" class="w-24 h-24" />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center truncate"
            >
              Electronics and Communication Engineering
            </div>
          </div>
        </NuxtLink>

        <!-- MECH Department -->
        <NuxtLink
          :to="{
            path: '/departmentdetails',
            query: { department: 'Mechanical' },
          }"
          class="department transform hover:scale-110 transition duration-300 text-center text-cyan-400"
        >
          <div class="flex flex-col items-center">
            <img src="/assets/img/mech.png" alt="MECH" class="w-24 h-24" />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center"
            >
              Mechanical Engineering
            </div>
          </div>
        </NuxtLink>

        <!-- CIVIL Department -->
        <NuxtLink
          :to="{
            path: '/departmentdetails',
            query: { department: 'Civil' },
          }"
          class="department transform hover:scale-110 transition duration-300 text-center text-cyan-400"
        >
          <div class="flex flex-col items-center">
            <img src="/assets/img/civil.png" alt="CIVIL" class="w-24 h-24" />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center"
            >
              Civil Engineering
            </div>
          </div>
        </NuxtLink>

        <!-- EEE Department -->
        <NuxtLink
          :to="{
            path: '/departmentdetails',
            query: { department: 'Electrical and Electronics Engineering' },
          }"
          class="department transform hover:scale-110 transition duration-300 text-center text-cyan-400"
        >
          <div class="flex flex-col items-center">
            <img src="/assets/img/eee.png" alt="EEE" class="w-24 h-24" />
            <div
              class="details bg-blue-950 text-white mt-2 px-4 py-1 rounded-lg text-center"
            >
              Electrical and Electronics Engineering
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import Headerd from "~/components/Headerd.vue";

export default {
  components: {
    Headerd,
  },
};
</script>

<style scoped>
.department {
  width: 100%;
  max-width: 300px; /* Adjust as needed */
}

.details {
  font-size: 0.875rem; /* Adjust font size if needed */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflowing text */
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
  column-gap: 0rem;
  row-gap: 4rem;
}

@media (max-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
