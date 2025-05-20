import { doc, getDoc } from "firebase/firestore";
import { useNuxtApp } from '#app';

export async function getStudentDetails() {
  const { $db } = useNuxtApp();
  const uid = localStorage.getItem('uid');

  if (!uid) {
    console.error("User is not authenticated");
    return null;
  }

  try {
    const studentDocRef = doc($db, "Student", uid);
    const studentDocSnap = await getDoc(studentDocRef);

    if (studentDocSnap.exists()) {
      const studentDetails = studentDocSnap.data();

      // Store Dept, Batch, and Semester in localStorage
      localStorage.setItem('dept', studentDetails.Dept);
      localStorage.setItem('batch', studentDetails.Batch);
      localStorage.setItem('semester', studentDetails.Semester);
      localStorage.setItem('Reg_no', studentDetails.Reg_no); 
      localStorage.setItem('Subjects', JSON.stringify(studentDetails.Subjects)); // Assuming 'Semester' field exists

      // console.log("Student details fetched and stored in localStorage:", studentDetails);
      return studentDetails;
    } else {
      console.error("No such student document found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
    return null;
  }
}