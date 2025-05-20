import { collection, query, where, getDocs } from "firebase/firestore";
import { useNuxtApp } from '#app';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function fetchEmailByRegNo(reg_no, password) {
  const { $db, $auth } = useNuxtApp(); 

  const studentsCollection = collection($db, "Student"); // Correct collection path
  const q = query(studentsCollection, where("Reg_no", "==", reg_no));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return "No student found with that registration number";
    }

    let email = null;
    querySnapshot.forEach((doc) => {
      const studentData = doc.data();
      email = studentData.Mail; 
    });

    const userCredential = await signInWithEmailAndPassword($auth, email, password);
    const uid = userCredential.user.uid;
    localStorage.setItem('uid', uid);

    return "Logged in successfully";
  } catch (error) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      return "Invalid registration number or password";
    } else if (error.code === 'auth/invalid-email') {
      return "Invalid email address associated with this registration number";
    } else {
      console.error("Error during authentication:", error); 
      return 'Error during authentication: ' + error.message; 
    }
  }
}