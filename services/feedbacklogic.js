import { useNuxtApp } from '#app';
import { doc, updateDoc } from "firebase/firestore"; // Import updateDoc
// import { getProfessorsForSubject } from './staff'; // Assuming staff.js is in the same directory

const features = [
  "Punctuality",
  "Class_time_utilization",
  "Explanation_and_clarity",
  "Approachability_and_response",
  "Grading_and_feedback",
  "Exam_preparation_resources",
  "Aiding_resource_utilization",
  "Lab_session",
  "Personal_growth_support",
  "Equality",
];

export function organizeFeedback(teachers) {
  const organizedFeedback = {};
  teachers.forEach((teacher) => {
    organizedFeedback[`${teacher.name}_${teacher.subjectCode}`] = teacher.responses.map((response, index) => ({
      feature: features[index],
      response: response,
    }));
  });
  return organizedFeedback;
}

export async function storeFeedback(organizedFeedback) {
  try {
    const { $db } = useNuxtApp();
    const dept = localStorage.getItem('dept');
    const semester = localStorage.getItem('semester');
    const studentRegisterNumber = localStorage.getItem('Reg_no');

    if (!dept || !semester || !studentRegisterNumber) {
      console.error('Missing data in local storage.');
      return;
    }

    for (const professor_subject in organizedFeedback) {
      let subjectName = null;
      let professor = null;
      // for (let i = 0; i < localStorage.length; i++) {
      //   const key = localStorage.key(i);
      //   // Skip the 'allProfessors' key
      //   if (key === 'staffCodeMap') continue;
      //   const value = localStorage.getItem(key);
      //   if (value.includes(professor)) {
      //     subjectName = key;
      //     break;
      //   }
      // }

      [professor, subjectName] = professor_subject.split('_');

      if (!subjectName) {
        console.error('Subject name not found for', professor);
        continue;
      }

      // if (subjectName) {
      //   await getProfessorsForSubject(subjectName, dept);
      // }

      const professorFeedback = organizedFeedback[professor_subject];
      // console.log("professor feedback",professorFeedback);
      professorFeedback.forEach(async ({ feature, response }) => {
        try {
          // Construct the document path

          const featureDocRef = doc(
            $db,
            'Subjects',
            dept,
            semester,
            subjectName,
            'Response',
            feature
          );

          //console mesaage for checking the path
          // console.log( professor,subjectName,featureDocRef.path);


          // Update the document
          await updateDoc(featureDocRef, {
            [studentRegisterNumber]: response
          });
          console.log('Feedback for', professor, subjectName,"\n",'stored successfully!');
        } catch (error) {
          if (error.code === 'not-found') { // Check for "not-found" error code
            const path = error.message.split(': ')[1]; // Extract document path from error message
            console.error(`Document not found for ${professor}, subject: ${subjectName}, path: ${path}`);
          } else {
            console.error('Error storing feedback:', error);
          }
        }
      });
    }

    // (2) Call getProfessorsForSubject for each subject after storing feedback
    // for (const professor in organizedFeedback) {
    //   let subjectName = null;
    //   for (let i = 0; i < localStorage.length; i++) {
    //     const key = localStorage.key(i);
    //     if ( key !== 'staffCodeMap') { // Skip irrelevant keys
    //       const value = localStorage.getItem(key);
    //       if (value.includes(professor)) {
    //         subjectName = key;
    //         break;
    //       }
    //     }
    //   }
      
    // }

  } catch (error) {
    console.error("Error in storeFeedback function:", error);
  }
}