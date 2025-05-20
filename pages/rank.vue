<template>
  <div>
    <Headerd />

    <div class="relative overflow-x-auto pt-16 pb-5 pl-5 pr-5">
      <div class="max-w-3xl mx-auto">
        <table
          class="w-full text-left text-sm text-black rtl:text-right dark:text-black"
        >
          <thead
            class="bg-blue-950 text-xs uppercase text-gray-700 dark:bg-blue-950 dark:text-white text-center font-bold"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Faculty</th>
              <th scope="col" class="px-6 py-3">Department</th>
              <th scope="col" class="px-6 py-3">Score</th>
              <th scope="col" class="px-6 py-3">Rank</th>
            </tr>
          </thead>
          <tbody
            class="border border-blue-950 bg-white dark:border-blue-950 dark:bg-white text-center font-bold"
          >
            <tr
              class="border border-blue-950 bg-white dark:border-blue-950 dark:bg-white"
            >
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-black"
              >
                Mrs.Jayapriya
              </th>
              <td class="px-6 py-4 font-bold">AI&DS</td>
              <td class="font-bold"></td>
              <td class="px-6 py-4 font-bold">1</td>
            </tr>
            <tr
              class="border border-blue-950 bg-white dark:border-blue-950 dark:bg-white"
            >
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-bold text-gray-900 dark:text-black"
              >
                Mrs.Jariya Begum
              </th>
              <td class="px-6 py-4 font-bold">AI&DS</td>
              <td class="font-bold"></td>
              <td class="px-6 py-4 font-bold">2</td>
            </tr>
            <tr class="bg-white dark:bg-white border border-blue-950">
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-bold text-black dark:text-black"
              >
                Mrs.Priskilla
              </th>
              <td class="px-6 py-4 font-bold">IT</td>
              <td class="font-bold"></td>
              <td class="px-6 py-4 font-bold">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.max-w-3xl {
  max-width: 768px; /* Limits the width of the table to 768px */
}
</style>
