import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels); // Register the plugin

const features = [
    'Aiding Resource Utilization',

    'Approachability and Response',
    
    'Class Time Utilization',
    
    'Equality',
    
    'Exam Preparation Resources',
    
    'Explanation and clarity',
    
    'Grading and Feedback',
    
    'Personal Growth Support',
    
    'Punctuality',
    
    'Timely Announcements'
    
];

export async function createChart(questionAverages) {
   // Changed to async function
  const ctx = document.getElementById('myChart').getContext('2d');

  // Check if questionAverages is defined and has the correct length
  if (questionAverages && questionAverages.length === features.length) {
    let myChart; 
    myChart =new Chart(ctx, {
      type: 'bar',
      data: {
        labels: features,
        datasets: [{
          label: 'Score',
          data: questionAverages.map(value => value.toFixed(1)),
          backgroundColor: '#172554',
          borderColor: '#172554',
          borderWidth: 1,
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 5,
            ticks: {
                color: '#000000', // Darker font color for x-axis labels
                font: {
                    family: 'Arial', // Font family for x-axis
                    size: 12, // Font size for x-axis
                    weight: 'normal' // Font weight for x-axis
                }
            }
        },
        y: {
          ticks: {
              color: '#000000', // Darker font color for y-axis labels
              font: {
                  family: 'Arial', // Font family for y-axis
                  size: 14, // Font size for y-axis
                  weight: 'bold' // Bold font weight for y-axis
              }
          }
      }
        },
        responsive: true,
        plugins: {
          legend: {
              display: true, // Hide the legend
              labels: {
                font: {
                    family: 'Arial', // Set font family if needed
                    size: 14,        // Set font size
                    weight: 'bold',  // Make the label bold
                },
                color: '#000000'    // Optional: Change the label color if needed
            }
          },
          title: {
              display: false // Remove the title
          },
          tooltip: {
              enabled: false // Disable tooltips
          },
          datalabels: {
              anchor: 'end',
              align: 'right',
              color: '#000000' , // Font color for data labels
              font: {
                  family: 'Arial', // Font family for data labels
                  size: 12, // Font size for data labels
                  weight: 'bold' // Font weight for data labels
              },
              
          }
      },
      animation: {
        onComplete: function () {
            const chartImage = document.getElementById('myChart');
            chartImage.src = myChart.toBase64Image(); // Convert chart to image
            document.getElementById('myChart').style.display = 'none'; // Hide the canvas after generating the image
            chartImage.style.display = 'block'; // Show the image

            // resolve(myChart); 
        }
    },
    plugins: [ChartDataLabels] // Add the plugin for displaying data labels
      }
      
    });
    return myChart; 
  } else {
    console.error('questionAverages is not defined or length mismatch');
    return null; // Return null if there's an error
  }
}