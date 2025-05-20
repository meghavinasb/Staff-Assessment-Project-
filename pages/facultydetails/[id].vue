<template>
  <div class="min-h-screen overflow-auto">
    <Headerreport :isPrintMode="isPrintMode" />
    <div class="print-button-container">
      <button
        @click="printPage"
        class="text-blue-950 px-4 py-2 border border-blue-950 rounded-lg shadow-md hover:bg-blue-950 hover:text-white"
      >
        Print
      </button>
    </div>
    <div
      class="a4-container bg-white shadow-xl rounded-lg text-gray-900 border border-blue-950 p-8"
    >
      <h2 class="space-grotesk-regular text-xl text-black"
        >Faculty Assessment By Students</h2>
      <div v-if="isLoading" class="text-center">Loading...</div>

      <div v-else-if="staff" class="flex items-start mt-6">
        <div class="flex flex-col items-center">
          <router-link
            :to="{ name: 'facultydetails-id', params: { id: staff.id } }"
          >
            <div
              class="relative w-28 h-36 rounded-full overflow-hidden -mt-2 cursor-pointer"
            >
              <img
                class="object-cover w-full h-full"
                :src="staff.Image_url"
                alt="Teacher Image"
              />
            </div>
          </router-link>
          <div class="text-center mt-4">
            <div class="text-blue-950 text-md font-semibold">
              {{ staff.Name }}
            </div>

            <div class="text-blue-950 text-xs font-normal">
              {{ staff.Designation }}
            </div>
            <div class="pt-1 text-blue-950 text-xs font-normal">
              {{ staff.id }}
            </div>
          </div>
        </div>

        <!-- Add the new card to the right of the text block -->
        <div class="ml-8 flex-grow flex items-center">
          <p class="text-blue-950 text-md mt-6">
            <span v-if="quotesLoading">Loading quotes...</span>
            <span v-else-if="staffQuotes">
              {{ staffQuotes.top_quote }}
            </span>
            <span v-else>No data found</span>
          </p>

          <!-- New Card Added Here -->
          <div
            class="ml-2 flex-shrink-0 w-30 text-center h-24 bg-white shadow-lg rounded-lg p-4"
          >
            <h5 class="text-blue-950 text-lg font-semibold">Score</h5>
            <p v-if="overallPercentage !== null">{{ overallPercentage }}%</p>
            <p v-else>Loading score...</p>
          </div>

          <div
            class="ml-2 flex-shrink-0 w-30 text-center h-24 bg-white shadow-lg rounded-lg p-4"
          >
            <h5 class="text-blue-950 text-lg font-semibold">Rank</h5>
            <p v-if="staffRank !== null">{{ staffRank }}</p>
            <p v-else>Loading rank...</p>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-red-500">Staff member not found.</div>
      <!-- Additional Cards Section -->

      <div class="mt-4 grid grid-cols-1 gap-8">
        <!-- First Row: Two Cards -->
        <div class="grid grid-cols-2 h-32 gap-8">
          <!-- Card 1 -->
          <div
            class="relative flex flex-col text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl"
          >
            <div class="p-6">
              <h5
                class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
              >
                Subjects Handled
              </h5>
              <div v-if="staffSubjects.length > 0">
                <p v-for="subject in staffSubjects" :key="subject">
                  {{ subject }}
                  <span v-if="getSubject(subject)">
                    - {{ getSubject(subject) }}%
                  </span>
                </p>
              </div>
              <span v-else> No subjects found </span>
            </div>
          </div>

          <!-- Card 2 -->
          <div
            class="relative flex flex-col text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl"
          >
            <div class="p-6">
              <h5
                class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
              >
                Future Goals
              </h5>
              <p
                class="block font-sans text-base antialiased font-light leading-relaxed text-inherit"
              >
                <span v-if="quotesLoading">Loading quotes...</span>
                <span v-else-if="staffQuotes">
                  {{ staffQuotes.low_quote }}
                </span>
                <span v-else>Quotes not available.</span>
              </p>
            </div>
          </div>
        </div>
        <!-- Second Row: One Card with Adjusted Size -->
        <div class="grid grid-cols-1 gap-8 mt-8">
          <!-- Added mt-8 to lower this row -->
          <!-- Card 3 -->
          <div
            class="relative flex flex-col text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl"
          >
            <div class="p-4 max-h-fit">
              <!-- Adjust height to 12rem or 192px -->
              <h5
                class="block mb-2 font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
              >
                Chart
              </h5>
              <div class="w-full h-50 overflow-hidden">
                <!-- Replace the image with the canvas element -->
                <canvas id="myChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Third Row: Two Cards -->
        <div class="grid grid-cols-2 gap-8 mt-0">
          <!-- Added mt-8 to lower this row -->
          <!-- Card 4 -->
          <div
            class="relative flex flex-col h-40 text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl"
          >
            <div class="p-6">
              <h5
                class="block mb-2 font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
              >
                Remarks
              </h5>
            </div>
          </div>

          <!-- Card 5 -->
          <div
            class="relative flex flex-col h-full text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl"
          >
            <div class="flex-grow"></div>
            <!-- Empty div to push content to the bottom -->
            <div class="p-6">
              <h5
                class="block mb-2 font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
              >
                Secretary Signature
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Headerreport from "~/components/Headerreport.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "#app";
import { getStaffById } from "~/services/getStaffById.js";
import { getSubjectData } from "~/services/getSubjectName.js";
import {calculateQuestionAverages} from "~/services/biaas.js";
import { createChart } from "~/services/chart.js";
import { getDoc, doc } from "firebase/firestore";
import { db } from "~/plugins/firebase.js";

const staff = ref(null);
const isLoading = ref(true);
const route = useRoute();
const staffSubjects = ref([]);
const subjectAverages = ref({});
const chartInstance = ref(null);
const staffQuotes = ref(null); // To store the fetched quotes
const quotesLoading = ref(false); // To track the loading state of the quotes
const staffRank = ref(null); // To store the staff's rank
const overallPercentage = ref(null);
const isPrintMode = ref(false); // Reactive variable to track print mode

onMounted(async () => {
  const staffId = route.params.id;
  staff.value = await getStaffById(staffId);
  isLoading.value = false;

  const combinedSubjectRatings = {}; // Object to store combined ratings

  if (staff.value) {
    console.log("Subjects Handled");
    for (const subjectEntry of staff.value.Subject) {
      const [subjectCode, department] = subjectEntry.split("_");
      const semester = staff.value.Subsem[subjectCode];

      if (subjectCode && department && semester) {
        const subjectData = await getSubjectData(
          department,
          semester,
          subjectCode
        );
       
        console.log(department,semester,subjectCode);
       

        if (subjectData) {
          staffSubjects.value.push(subjectData.subjectName);
          Object.assign(combinedSubjectRatings, subjectData.ratings);
        }

        try {
      const staffRankDocRef = doc(db, "Scores", staffId);
      const staffRankDocSnap = await getDoc(staffRankDocRef);
      const scoreKey = `${subjectCode}_${semester}`
      
      //Fetching Rank, Overallpercentage and Subject percentage from Firebase

      if (staffRankDocSnap.exists()) {
        staffRank.value = staffRankDocSnap.data().rank;
        overallPercentage.value = staffRankDocSnap.data().overallPercentage;
        subjectAverages.value[subjectData.subjectName] = staffRankDocSnap.data()[scoreKey];
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching rank from Firestore:", error);
    }
      }
    }
  }

  //personality statement from Api 

  if (staff.value) {
    const staffId = staff.value.id; // Assuming 'id' is the staff ID field
    quotesLoading.value = true; // Set loading state to true

    try {
      const { data } = await useFetch(
        `https://yk2109.pythonanywhere.com/get_staff_data/${staffId}`
      );

      staffQuotes.value = data.value; // Store the fetched quotes
    } catch (error) {
      console.error("Error fetching quotes:", error);
      // Handle the error appropriately (e.g., display an error message)
    } finally {
      quotesLoading.value = false; // Set loading state to false
    }
  }

  // Fetching question avarage from bias.js code
  const questionAverages = calculateQuestionAverages(combinedSubjectRatings);
  // console.log("Question Averages:", questionAverages);

  chartInstance.value = createChart(questionAverages);
});

// Main function call to get the subjects
const getSubject = (subjectName) => {
  return subjectAverages.value[subjectName];
};

//printing the score card
function printPage() {
  isPrintMode.value = true; // Set print mode to true
  window.print();
  isPrintMode.value = false; // Reset print mode after printing
}
</script>


<style scoped>
.a4-container {
  width: 210mm; /* A4 width */
  height: 297mm; /* A4 height */
  margin: 40px auto; /* Centers the container horizontally and adds top and bottom margin */
  padding: 21px; /* Adjust padding if needed */
}

.print-button-container {
  position: absolute;
  top: 130px; /* Adjust this value as needed to position below the header */
  right: 20px;
}

@media print {
  body * {
    visibility: hidden; /* Hide everything on the page */
  }
  .a4-container,
  .a4-container * {
    visibility: visible; /* Make the container and its children visible */
  }
  .a4-container {
    position: absolute;
    left: 0;
    top: -40;
    width: 210mm;
    height: 320mm;
    margin: 0;
    padding: 20mm;
    overflow: hidden; /* Hide overflow for better page fit */
  }
  .print-button-container {
    display: none; /* Hide the print button during printing */
  }
}

.relative.w-28.h-36 {
  width: 7rem; /* Adjust width */
  height: 9rem; /* Adjust height */
}

.text-center {
  /* Ensure text does not wrap and keeps in a single line */
  white-space: nowrap;
}

.text-blue-950.text-md.font-semibold {
  /* Adjust text size for name */
  font-size: 1.125rem; /* Adjust as needed */
}

.text-blue-950.text-xs.font-normal {
  /* Adjust text size for designation and id */
  font-size: 0.875rem; /* Adjust as needed */
}

.text-blue-950.text-md {
  /* Adjust text size for quotes */
  font-size: 1rem; /* Adjust as needed */
}
</style>
