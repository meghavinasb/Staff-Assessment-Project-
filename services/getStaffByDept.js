// services/getStaffByDept.js
import { db } from '../plugins/firebase.js';
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getStaffByDept(department) {
  try {
    const staffCollection = collection(db, "Staff");
    const q = query(staffCollection, where("Dept", "==", department));

    const querySnapshot = await getDocs(q);
    const staffData = [];

    querySnapshot.forEach((doc) => {
      const staff = {
        id: doc.id, // Document ID (staff ID)
        ...doc.data(), 
      };
      staffData.push(staff);
    });
    console.log("Staff Data",staffData);
    return staffData;
    

  } catch (error) {
    console.error("Error fetching staff data:", error);
    return []; // Return an empty array on error
  }
}