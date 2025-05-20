import { query, collection, where, getDocs } from "firebase/firestore";
import { useNuxtApp } from '#app';

export async function getProfessorsForSubject(subjectCode, dept) {
  const nuxtApp = useNuxtApp();
  const db = nuxtApp.$db;

  const staffRef = collection(db, "Staff");
  const combinedSubject = `${subjectCode}_${dept}`; 

  const q = query(staffRef, where("Subject", "array-contains", combinedSubject));

  const querySnapshot = await getDocs(q);
  const professors = [];

  // Retrieve the existing staffCodeMap from localStorage
  const existingStaffCodeMap = JSON.parse(localStorage.getItem('staffCodeMap')) || {};

  querySnapshot.forEach((doc) => {
    const staffName = doc.data().Name;
    const staffCode = doc.id; 
    professors.push(staffName);
    
    // Update the map with new entries
    existingStaffCodeMap[staffCode] = staffName; 
  });

  // Store the professors array as a JSON string in localStorage
  localStorage.setItem(subjectCode, JSON.stringify(professors)); 

  // Store the updated staff code map in localStorage
  localStorage.setItem('staffCodeMap', JSON.stringify(existingStaffCodeMap));

  return professors;
}