const traits = [
  "Dedication",
  "Patience",
  "Empathy",
  "Communication",
  "Motivational",
  "Active Listening",
  "Knowledgeable",
  "Supportiveness",
  "Cheerful",
  "Respectfulness",
];

const student_reg_no = localStorage.getItem("Reg_no");
if (!student_reg_no) {
  console.error(
    "Student registration number (Reg_no) is not found in localStorage."
  );
}

export async function printPersonalityResults(personalityResponses) {
  const resultsMap = new Map();
  const staffCodeMap = JSON.parse(localStorage.getItem("staffCodeMap") || "{}");

  const findStaffId = (teacher) => {
    for (const code in staffCodeMap) {
      if (staffCodeMap[code] === teacher) return code;
    }
    return null;
  };

  // Prepare a list of data objects for each staff member
  const allStaffData = [];

  for (const teacher in personalityResponses) {
    const selectedTraits = Array.isArray(personalityResponses[teacher])
      ? personalityResponses[teacher].map(
          (_, index) => traits[index] || "Unknown"
        )
      : [];

    resultsMap.set(teacher, selectedTraits);

    const staffId = findStaffId(teacher);

    if (staffId) {
      const data = {
        staff_id: staffId,
        staff_name: teacher,
        student_reg_no: student_reg_no,
        response_1: selectedTraits[0] || null,
        response_2: selectedTraits[1] || null,
        response_3: selectedTraits[2] || null,
        response_4: selectedTraits[3] || null,
        response_5: selectedTraits[4] || null,
      };

      allStaffData.push(data);
    } else {
      console.warn(`Staff ID not found for ${teacher}`);
    }
  }

  if (allStaffData.length > 0) {
    try {
      // Send a single POST request with all data for multiple staff members
      const response = await fetch(
        "https://yk2109.pythonanywhere.com/personalitytest",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ staff_data: allStaffData }), // Send data as an array
        }
      );

      if (response.ok) {
        console.log("Data sent successfully for all staff members");
      } else {
        const errorMessage = await response.text();
        console.error(
          `Error sending data for staff members: ${response.status} - ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error sending data for staff members:", error);
    }
  } else {
    console.error("No valid staff data to send.");
  }

  console.log("Personality Test Results (Map):", resultsMap);
}
