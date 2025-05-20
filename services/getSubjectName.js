// services/getSubjectName.js
import { db } from '../plugins/firebase.js';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export async function getSubjectData(department, semester, subjectCode) {
  try {
    const subjectDocRef = doc(db, 'Subjects', department, semester, subjectCode);
    const docSnap = await getDoc(subjectDocRef);

    if (docSnap.exists()) {
      const subjectName = docSnap.data().Subject_name;

      // Fetch ratings from the "Response" collection
      const responseCollection = collection(subjectDocRef, 'Response');
      const responseDocs = await getDocs(responseCollection);

      const ratings = {}; // Use an object to store ratings by feature name

      responseDocs.forEach((doc) => {
        const featureName = doc.id;
        const docData = doc.data();
        ratings[featureName] = Object.values(docData); // Get all values (ratings)
      });

      return {
        subjectName: subjectName,
        ratings: ratings,
      };
    } else {
      console.error("Subject document not found:", subjectCode);
      return null;
    }
  } catch (error) {
    console.error("Error fetching subject data:", error);
    return null;
  }
}