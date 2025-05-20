// services/getStaffById.js
import { db } from '../plugins/firebase.js';
import { doc, getDoc } from "firebase/firestore";

export async function getStaffById(staffId) {
  try {
    const staffDocRef = doc(db, "Staff", staffId);
    const docSnap = await getDoc(staffDocRef);

    if (docSnap.exists()) {
      // You don't need to call getStaffByDept here
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such document!");
      return null; 
    }

  } catch (error) {
    console.error("Error fetching staff data:", error);
    return null; 
  }
}