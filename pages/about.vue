<template>
  <div>
    <Header />
    <div class="m-14 mt-0">
      <div class="flex gap-4 pl-60 pt-52">
        <button
          class="rounded-lg bg-blue-950 pb-1 pl-3 pr-3 pt-1 text-white hover:bg-blue-900"
          @click="toggleTable('student')"
        >
          Student Profile
        </button>
        <button
          class="rounded-lg bg-blue-950 pb-1 pl-3 pr-3 pt-1 text-white hover:bg-blue-900"
          @click="toggleTable('subjects')"
        >
          Subjects
        </button>
      </div>

      <div
        v-if="showStudentTable"
        class="relative overflow-x-auto pt-3 pb-5 pl-5 pr-5"
      >
        <div
          class="relative mx-auto h-80 w-3/4 overflow-hidden rounded-lg border border-blue-950 bg-white bg-opacity-70 backdrop-blur-md"
        >
          <table
            class="h-full w-full rounded-lg bg-transparent text-left text-lg text-blue-950"
          >
            <tbody class="font-bold">
              <tr v-if="student">
                <td class="px-4 pl-20 py-2 pt-5">Name</td>
                <td class="px-4 py-2 pt-5 font-semibold">{{ student.Name }}</td>
                <td rowspan="5" class="px-4 py-2 text-center align-middle">
                  <img
                    class="ml-16 h-50 w-40 rounded-lg"
                    :src="student.Image_url"
                    alt="Student Image"
                  />
                </td>
              </tr>
              <tr v-if="student">
                <td class="px-4 pl-20 py-2 pt-5">Register Number</td>
                <td class="px-4 py-2 pt-5 font-semibold">
                  {{ student.Reg_no }}
                </td>
              </tr>
              <tr v-if="student">
                <td class="px-4 pl-20 py-2 pt-5">Semester</td>
                <td class="px-4 py-2 pt-5 font-semibold">
                  {{ student.Semester }}
                </td>
              </tr>
              <tr v-if="student">
                <td class="px-4 pl-20 py-2 pt-5">Department</td>
                <td class="px-4 py-2 pt-5 font-semibold">
                  {{ student.Dept }}
                </td>
              </tr>
              <tr v-if="student">
                <td class="px-4 pl-20 py-2 pt-5">Batch</td>
                <td class="px-4 py-2 pt-5 font-semibold">
                  {{ student.Batch }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-if="showSubjectsTable"
        class="relative overflow-x-auto pt-3 pb-5 pl-5 pr-5"
      >
        <div
          class="relative mx-auto w-3/4 overflow-hidden rounded-lg border border-blue-950 bg-white bg-opacity-70 backdrop-blur-md"
        >
          <table
            class="w-full table-auto rounded-lg bg-transparent text-left text-sm text-blue-950 rtl:text-right"
          >
            <thead
              class="rounded-t-lg bg-blue-950 text-xs uppercase text-white"
            >
              <tr>
                <th scope="col" class="rounded-tl-lg px-6 py-4">
                  Subject Code
                </th>
                <th scope="col" class="px-6 py-4">Subject Name</th>
                <th scope="col" class="px-6 py-4">Professor</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(subjectName, subjectCode) in student.Subjects"
                :key="subjectCode"
                class="border-b border-blue-950 bg-opacity-0"
              >
                <td class="px-6 py-4">{{ subjectCode }}</td>
                <td class="px-6 py-4">{{ subjectName }}</td>
                <td class="px-6 py-4">
                  <ul
                    v-if="
                      professors[subjectCode] &&
                      professors[subjectCode].length > 0
                    "
                  >
                    <li
                      v-for="professor in professors[subjectCode]"
                      :key="professor"
                    >
                      {{ professor }}
                    </li>
                  </ul>
                  <span v-else>No professors found for this subject.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { getStudentDetails } from "~/services/about";
import { getProfessorsForSubject } from "~/services/staff";

export default {
  components: {
    Header,
  },
  data() {
    return {
      showStudentTable: true,
      showSubjectsTable: false,
      student: null,
      professors: {},
    };
  },
  async mounted() {
    try {
      this.student = await getStudentDetails();
      this.fetchProfessors();
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  },
  methods: {
    toggleTable(table) {
      if (table === "student") {
        this.showStudentTable = true;
        this.showSubjectsTable = false;
      } else if (table === "subjects") {
        this.showStudentTable = false;
        this.showSubjectsTable = true;
      }
    },
    async fetchProfessors() {
      if (this.student) {
        for (const subjectCode in this.student.Subjects) {
          const professors = await getProfessorsForSubject(
            subjectCode,
            this.student.Dept
          );
          if (professors && professors.length > 0) {
            this.professors[subjectCode] = professors;
          } else {
            console.log(`No professors found for subject code: ${subjectCode}`);
          }
        }
      }
    },
  },
};
</script>
