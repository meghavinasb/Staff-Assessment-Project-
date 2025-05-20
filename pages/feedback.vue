<template>
  <div class="h-screen bg-white bg-opacity-40 backdrop-blur-md">
    <Header />
    <!-- Toast Message -->
    <Toast
      v-if="showToast"
      :message="
        toastMessage ||
        'Welcome to Staff Assessment! Kindly answer the following questions.'
      "
      :isVisible="showToast"
      @hide-toast="showToast = false"
    />
    <!-- Feedback Form Section -->
    <div v-if="!showToast" class="flex justify-center items-center h-50 pt-10">
      <div
        class="w-full max-w-4xl border-2 border-blue-950 bg-white bg-opacity-40 rounded-lg p-4 max-h-screen overflow-auto shadow-lg"
      >
        <h2 class="text-center text-xl font-semibold mb-4">Assessment</h2>

        <!-- Stepper -->
        <div class="stepper flex justify-evenly mb-4">
          <div
            v-for="(step, index) in 10"
            :key="index"
            :class="{
              'bg-blue-950 text-white': index + 1 <= currentStep,
              'bg-gray-300 text-gray-700': index + 1 > currentStep,
            }"
            class="step p-1 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            @click="goToStep(index + 1)"
          >
            {{ index + 1 }}
          </div>
        </div>

        <!-- Feedback Question -->
        <p class="text-center text-xl font-medium mb-4">
          {{ questions[currentStep - 1] }}
        </p>

        <!-- Feedback Table -->
        <table class="w-full text-center border-collapse mb-4">
          <thead>
            <tr class="bg-blue-950 text-white">
              <th class="p-2 border border-blue-950">Professor</th>
              <th class="p-2 border border-blue-950">0</th>
              <th class="p-2 border border-blue-950">1</th>
              <th class="p-2 border border-blue-950">2</th>
              <th class="p-2 border border-blue-950">3</th>
              <th class="p-2 border border-blue-950">4</th>
              <th class="p-2 border border-blue-950">5</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="teacher in teachers"
              :key="teacher.name"
              class="border border-blue-950"
            >
              <td class="p-2 border border-blue-950">
                {{ teacher.name }} <br />({{ teacher.subjectName }})
              </td>
              <td
                v-for="score in 6"
                :key="score"
                class="p-2 border border-blue-950"
              >
                <input
                  type="radio"
                  class="h-5 w-5"
                  :name="`step${currentStep}-${teacher.name}-${teacher.subjectCode}`"
                  :value="score - 1"
                  v-model="teacher.responses[currentStep - 1]"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-4">
          <button
            class="bg-blue-950 cursor-pointer text-white py-1 px-2 rounded hover:bg-blue-700"
            :disabled="currentStep === 1"
            @click="prevStep"
          >
            PREVIOUS
          </button>
          <button
            v-if="currentStep < 10"
            class="bg-blue-950 text-white py-1 px-4 rounded hover:bg-blue-700"
            @click="nextStep"
          >
            NEXT
          </button>
          <button
            v-else
            class="bg-blue-950 text-white py-1 px-2 rounded hover:bg-blue-700"
            @click="submitForm"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { navigateTo } from "#app";
import Header from "~/components/Header.vue";
import { ref, onMounted } from "vue";
import { organizeFeedback, storeFeedback } from "~/services/feedbacklogic.js"; // Import storeFeedback
import { getFirestore } from "firebase/firestore"; // Assuming you're using Firestore v9

const db = getFirestore(); // Initialize Firestore

const currentStep = ref(1);
const questions = ref([
  "How consistently does the teacher arrive on time for class?",
  "How well is the class time utilized in an efficient and productive manner?",
  "How well does the teacher explain the subject clearly and in ways that are easy to understand, offer alternative explanations or additional examples, and address any confusion? ",
  "How easy is it to approach the teacher with questions and concerns, and how quickly do you receive a response?",
  "How well are tests and assignments corrected and returned to me by the teacher, and  I know where I stand in the class in terms of  my grade? ",
  "How consistently does the teacher supply you with study materials and question banks to support your academic preparation?",
  "How well does the teacher guide you in making use of the college lab, library, and other resources? ",
  "How effectively does your teacher explain and guide you through lab experiments?",
  "How effectively do you feel the teacher supports and facilitates your growth and development? ",
  " How well does the teacher treat all students equally?",
]);

const teachers = ref([]); // Initialize as empty array
const showToast = ref(true); // Show toast initially
const toastMessage = ref(""); // Initialize toastMessage as an empty string

onMounted(async () => {
  const subjects = JSON.parse(localStorage.getItem("Subjects")) || {};
  const subjectCodes = Object.keys(subjects);
  const teachersArray = [];

  for (const subjectCode of subjectCodes) {
    try {
      const professors = JSON.parse(localStorage.getItem(subjectCode)) || [];
      professors.forEach((professor) => {
        teachersArray.push({
          name: professor,
          subjectCode: subjectCode,
          subjectName: subjects[subjectCode], // Get subject name
          responses: Array(10).fill(null),
        });
      });
    } catch (error) {
      console.error("Error parsing professors from localStorage:", error);
    }

    // Hide toast after 3 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
 
  teachers.value = teachersArray;
});

function goToStep(step) {
  currentStep.value = step;
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function nextStep() {
  const allAnswered = teachers.value.every(
    (teacher) => teacher.responses[currentStep.value - 1] !== null
  );
  if (allAnswered && currentStep.value < 10) {
    currentStep.value++;
  } else if (!allAnswered) {
    toastMessage.value = "Please answer the question to continue."; // Set the toast message
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000); // Hide toast after 3 seconds
  }
}

function submitForm() {
  const allAnswered = teachers.value.every((teacher) =>
    teacher.responses.every((response) => response !== null)
  );
  if (allAnswered) {

    // console.log("teachers array",teachers.value);

    const structuredFeedback = organizeFeedback(teachers.value);
    console.log("structured feedback",structuredFeedback);
    navigateTo("/personality");
    storeFeedback(structuredFeedback, db); // Call storeFeedback here
  } else {
    toastMessage.value = "Please complete all questions before submitting."; // Set the toast message for submission
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 3000); // Hide toast after 3 seconds
  }
}

function resetToast() {
  showToast.value = false;
}
</script>

<style scoped>
.stepper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.step {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

.step.active {
  background-color: #4f46e5; /* blue-950 */
  color: white;
}

.step.inactive {
  background-color: #d1d5db; /* gray-300 */
  color: #374151; /* gray-700 */
}

#toast-warning {
  background-color: #fef3c7; /* yellow-100 */
  color: #92400e; /* orange-700 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
