// Helper Functions
function quantile(arr, q) {
  if (arr.length === 0) {
    return 0; 
  }
  const sorted = arr.slice().sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
}

function calculateIQR(data) {
  const q1 = quantile(data, 0.25);
  const q3 = quantile(data, 0.75);
  return q3 - q1;
}

function removeOutliers(data) {
  const iqr = calculateIQR(data);
  const q1 = quantile(data, 0.25);
  const q3 = quantile(data, 0.75);
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  return data.filter(value => value >= lowerBound && value <= upperBound);
}

function calculateRowAverages(data) {
  return data.map(row => {
    const filteredData = removeOutliers(row);
    const avg = filteredData.reduce((acc, value) => acc + value, 0) / filteredData.length;
    return avg; // Return the average directly 
  });
}

function calculatePercentages(averages, totalQuestions) {
  return averages.map(average => (average / 5) * 100);
}

function calculateSubjectAverages(subjectRatings) {
  const dataArray = Object.values(subjectRatings);
  return calculateRowAverages(dataArray);
}

function calculateAveragePercentages(subjectPercentages) {
  const sum = subjectPercentages.reduce((acc, value) => acc + value, 0);
  return (sum / subjectPercentages.length);
}

//Main function_1 to calculate the subject score and overall percentage

function calculateSubjectScores(subjectRatings, totalQuestions = 10) {
  const subjectAverages = calculateSubjectAverages(subjectRatings);
  const subjectPercentages = calculatePercentages(subjectAverages, totalQuestions);
  const averageSubjectPercentage = calculateAveragePercentages(subjectPercentages);
  const overallAveragePercentage = (subjectPercentages.reduce((acc, value) => acc + value, 0) / subjectPercentages.length);

  console.log("Subject Averages:", subjectAverages);
  console.log("Subject Percentages:", subjectPercentages);
  console.log("Average Subject Percentage:", averageSubjectPercentage);
  console.log("Overall Average Percentage:", overallAveragePercentage);

  return {
    averageSubjectPercentage : Math.floor(averageSubjectPercentage) ,
    overallAveragePercentage : Math.floor(overallAveragePercentage)
  };
}

// Main function_2 for calculating question avarages for chart

function calculateQuestionAverages(combinedSubjectRatings) {
  if (Object.keys(combinedSubjectRatings).length === 0) {
    console.log("No subject ratings provided.");
    return [];
  }

  const questionNames = Object.keys(combinedSubjectRatings);
  const numQuestions = questionNames.length;
  const combinedAverages = [];

  // Iterate over each question and calculate the average
  for (let i = 0; i < numQuestions; i++) {
    const questionName = questionNames[i];
    const questionRatings = combinedSubjectRatings[questionName]; // Get ratings for the current question

    const average = calculateRowAverages([questionRatings])[0];

    // Calculate average for the current question (handles outlier removal)
    combinedAverages.push(parseFloat(average.toFixed(1))); // Pass as a single-element array
  }
  // console.log(combinedAverages);
  return combinedAverages;
}

export { calculateSubjectScores, calculateQuestionAverages};