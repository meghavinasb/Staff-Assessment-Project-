// services/calculateScore.js

export async function calculateScore(subjectRatings) {
  return new Promise((resolve) => {
    console.log("Calculating score for:", subjectRatings);

    // Calculate average score for each question feature
    const averageScores = {};

    for (const featureName in subjectRatings) {
      const featureRatings = subjectRatings[featureName];

      if (featureRatings.length === 0) {
        averageScores[featureName] = 0; 
      } else {
        const sum = featureRatings.reduce((a, b) => a + b, 0);
        averageScores[featureName] = (sum / featureRatings.length).toFixed(2);
      }
    }

    console.log("Average scores:", averageScores);

    // Example: Calculate and log the overall average score 
    const totalAverage = Object.values(averageScores).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / Object.keys(averageScores).length;
    console.log("Overall average score:", totalAverage.toFixed(2));

    // Resolve the promise with the averageScores (or any other data you want to return)
    resolve(averageScores); 
  });
}