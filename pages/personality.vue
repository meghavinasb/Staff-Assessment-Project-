<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div class="flex-grow m-14 mt-0 flex items-center justify-center pt-10">
      <div
        v-if="!isCompleted && currentTeacher"
        class="bg-white bg-opacity-70 backdrop-blur-md border border-blue-950 p-8 w-full max-w-4xl shadow-lg rounded-lg"
      >
        <div class="flex items-center mb-5 border-b-2 border-blue-950 pb-5">
          <div class="mr-5">
            <img
              :src="currentTeacher.image"
              alt="Teacher Photo"
              class="rounded w-24 h-29 object-cover border border-blue-950"
            />
          </div>
          <div>
            <div class="text-3xl text-blue-950">{{ currentTeacher.name }}
              <br> 
              ({{ currentTeacher.subjectName }}) 
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <div>
            <h3 class="text-lg font-normal text-blue-950 mb-4">
              Select between 3 and 5 Statements that resonate with the teacher's
              personality:
            </h3>
            <div
              v-for="(statement, index) in statements"
              :key="index"
              class="mb-5 p-3 border border-blue-950 rounded-lg bg-white bg-opacity-70"
            >
              <label class="cursor-pointer block p-2 text-blue-950">
                <input
                  type="checkbox"
                  v-model="selectedStatements"
                  :value="statement"
                  class="form-checkbox text-blue-950 mr-2"
                />
                <span class="text-lg">{{ statement }}</span>
              </label>
            </div>
          </div>
          <div class="text-center">
            <button
              v-if="isLastTeacher"
              type="button"
              @click="submitQuestionnaire"
              class="bg-blue-950 text-white py-2 px-5 rounded hover:bg-blue-800 mt-4"
            >
              Submit
            </button>
            <button
              v-else
              type="button"
              @click="navigateNext"
              class="bg-blue-950 text-white py-2 px-5 rounded hover:bg-blue-800 mt-4"
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <!-- Show message when completed -->
      <div v-if="isCompleted" class="text-center text-2xl text-blue-950">
        Questionnaire Completed!
      </div>
      <div
        v-if="!isCompleted && !currentTeacher"
        class="text-center text-2xl text-blue-950"
      >
        Loading faculty data...
      </div>
    </div>

    <!-- Toast Component -->
    <Toast
      :message="toastMessage"
      :isVisible="showToast"
      @hide-toast="showToast = false"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Toast from "@/components/Toast.vue"; // Import Toast component
import { printPersonalityResults } from '~/services/personalityResult.js';
import {getStaffImageUrl} from '~/services/getstaffimage.js'

export default {
  data() {
    return {
      currentTeacherIndex: 0,
      teachers: [],
      statements: [
        "Ability to demonstrate a strong commitment to the profession and to the success of each student.",
        "Ability to remain calm and understanding when students struggle or make mistakes.",
        "Ability to understand and share the feelings of students, showing compassion and support.",
        "Ability to clearly and effectively convey information and instructions.",
        "Ability to inspire and encourage students to achieve their best.",
        "Ability to give full attention to students when they speak, showing that their thoughts and feelings are valued and understood.",
        "Ability to have a deep understanding of the subject matter and stays updated with new information.",
        "Ability to provide help and encouragement to students both academically and personally.",
        "Ability to create a joyful and welcoming classroom environment.",
        "Ability to show respect for students' ideas, opinions, and individuality.",
      ],
      selectedStatements: [],
      isCompleted: false,
      showToast: false,
      toastMessage: "",
      personalityResponses: {}, // Object to store responses for each teacher
    };
  },
  computed: {
    currentTeacher() {
      if (this.currentTeacherIndex >= 0 && this.currentTeacherIndex < this.teachers.length) {
      return this.teachers[this.currentTeacherIndex];
    } else {
      return null; // Or handle the out-of-bounds case differently
    }
    },
    isLastTeacher() {
      return this.currentTeacherIndex === this.teachers.length - 1;
    },
  },
  mounted() {
    this.loadProfessorsFromLocalStorage();
  },
  methods: {
    async loadProfessorsFromLocalStorage() {
      const subjects = JSON.parse(localStorage.getItem('Subjects')) || {};
      const subjectCodes = Object.keys(subjects);
      const teachersArray = [];

      await Promise.all(subjectCodes.map(async (subjectCode) => {
        try {
          const professors = JSON.parse(localStorage.getItem(subjectCode)) || [];
          await Promise.all(professors.map(async (professor) => {
            const staffCodeMap = JSON.parse(localStorage.getItem('staffCodeMap'));
            let staffId = null;
            for (const id in staffCodeMap) {
              if (staffCodeMap[id] === professor) {
                staffId = id;
                break;
              }
            }

            if (staffId) {
              try {
                const imageUrl = await getStaffImageUrl(staffId);
                teachersArray.push({
                  name: professor,
                  subjectCode: subjectCode, 
                  subjectName: subjects[subjectCode], // Get subject name from Subjects object
                  image: imageUrl || "https://via.placeholder.com/96x112",
                  responses: Array(10).fill(null),
                });
              } catch (error) {
                console.error("Error fetching image:", error);
                teachersArray.push({
                  name: professor,
                  subjectCode: subjectCode,
                  subjectName: subjects[subjectCode], // Get subject name from Subjects object
                  image: "https://via.placeholder.com/96x112",
                  responses: Array(10).fill(null),
                });
              }
            } else {
              console.warn(`Staff ID not found for professor: ${professor}`);
            }
          }));
        } catch (error) {
          console.error("Error parsing professors from localStorage:", error);
        }
      }));

      this.teachers = teachersArray;
    },

    handleSubmit() {
      if (
        this.selectedStatements.length < 3 ||
        this.selectedStatements.length > 5
      ) {
        this.toastMessage = "Please select between 3 and 5 statements.";
        this.showToast = true;
        this.$nextTick(() => {
          window.scrollTo(0, 0); // Scroll to the top of the page
        });
        return;
      }

      // Store the responses for the current teacher
      this.personalityResponses[this.currentTeacher.name] = this.selectedStatements;
      console.log("Personality Responses:", this.personalityResponses); 
    },
    navigateNext() {
      if (
        this.selectedStatements.length < 3 ||
        this.selectedStatements.length > 5
      ) {
        this.toastMessage =
          "You need to select between 3 and 5 statements to continue.";
        this.showToast = true;
        this.$nextTick(() => {
          window.scrollTo(0, 0); // Scroll to the top of the page
        });
        return;
      }

      this.handleSubmit(); // Store responses for the current teacher
      this.currentTeacherIndex++; 
      this.selectedStatements = []; 
      window.scrollTo(0, 0); 

      if (this.currentTeacherIndex >= this.teachers.length) { 
        this.isCompleted = true;
        this.toastMessage = "You have completed the feedback for all teachers.";
        this.showToast = true;
      }
    },
    submitQuestionnaire() {
      if (
        this.selectedStatements.length < 3 ||
        this.selectedStatements.length > 5
      ) {
        this.toastMessage = "Please select between 3 and 5 statements.";
        this.showToast = true;
        this.$nextTick(() => {
          window.scrollTo(0, 0); // Scroll to the top of the page
        });
        return;
      }
      this.handleSubmit(); // Store responses for the last teacher
      this.isCompleted = true;
      this.selectedStatements = []; 
      this.toastMessage = "You've completed the form!";
      this.showToast = true;

      // You can add logic here to submit 'this.personalityResponses' to your backend
      printPersonalityResults(this.personalityResponses);
    },
  },
  components: {
    Header,
    Toast,
  },
};
</script>
<style scoped>
/* Add any specific styles here if needed */
</style>
