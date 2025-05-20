import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

export async function getStaffImageUrl(staffId) {
  try {
    // Reference to the staff document
    const staffDocRef = doc(db, 'Staff', staffId);

    // Get the document
    const staffDocSnapshot = await getDoc(staffDocRef);

    // Check if the document exists
    if (staffDocSnapshot.exists()) {
      const staffData = staffDocSnapshot.data();
      const imageUrl = staffData.Image_url;

      if (!imageUrl){

      console.log(`Image URL for staff ID ${staffId} not found`);

      }
      return imageUrl;
    } else {
      console.log(`Staff with ID ${staffId} not found.`);
      return null;
    }

  } catch (error) {
    console.error("Error fetching staff image URL:", error);
    return null;
  }
}