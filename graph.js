const Survey = require('./models/survey');
const matplotlib = require('matplotlib');
const pyplot = matplotlib.pyplot;

const plotStressLevel = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const stressLevels = surveys.map(survey => survey.stressLevel);
      const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const data = labels.map(label => stressLevels.filter(level => level === parseInt(label)).length);

      pyplot.bar(labels, data);
      pyplot.xlabel('Stress Level');
      pyplot.ylabel('Count');
      pyplot.title('Stress Level Distribution');

      pyplot.show();
    }
  });
};

const plotPhysicalActivity = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const physicalActivity = surveys.map(survey => survey.physicalActivity);
      const labels = ['1', '2', '3', '4', '5'];
      const data = labels.map(label => physicalActivity.filter(level => level === parseInt(label)).length);

      pyplot.bar(labels, data);
      pyplot.xlabel('Physical Activity Level');
      pyplot.ylabel('Count');
      pyplot.title('Physical Activity Distribution');

      pyplot.show();
    }
  });
};

const plotEyePain = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const eyePain = surveys.map(survey => survey.eyePain);
      const labels = ['0', '1', '2', '3', '4', '5'];
      const data = labels.map(label => eyePain.filter(level => level === parseInt(label)).length);

      pyplot.bar(labels, data);
      pyplot.xlabel('Eye Pain Level');
      pyplot.ylabel('Count');
      pyplot.title('Eye Pain Distribution');

      pyplot.show();
    }
  });
};

const plotSittingHours = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const sittingHours = surveys.map(survey => survey.sittingHours);
      const labels = ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12+'];
      const data = labels.map(label => sittingHours.filter(hours => hours >= parseInt(label.split('-')[0]) && hours < parseInt(label.split('-')[1])).length);

      pyplot.bar(labels, data);
      pyplot.xlabel('Sitting Hours per Day');
      pyplot.ylabel('Count');
      pyplot.title('Sitting Hours Distribution');

      pyplot.show();
    }
  });
};

const plotActivityDays = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const activityDays = surveys.map(survey => survey.activityDays);
      const labels = ['0', '1', '2', '3', '4', '5', '6', '7'];
      const data = labels.map(label => activityDays.filter(days => days === parseInt(label)).length);

      pyplot.bar(labels, data);
      pyplot.xlabel('Days of Physical Activity per Week');
      pyplot.ylabel('Count');
      pyplot.title('Physical Activity Days Distribution');

      pyplot.show();
    }
  });
};

const plotActivityDuration = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {const activityDurationLabels = [
'Less than 30 minutes',
'Between 30 minutes and 1 hour',
'Between 1 and 2 hours',
'More than 2 hours'
];

const activityDurationData = activityDurationLabels.map(label =>
surveys.filter(survey => survey.activityDuration === label).length
);

pyplot.bar(activityDurationLabels, activityDurationData);
pyplot.xlabel('Duration of Physical Activity');
pyplot.ylabel('Count');
pyplot.title('Physical Activity Duration Distribution');

pyplot.show();
};

const plotWakeUpTime = () => {
Survey.find((err, surveys) => {
if (err) {
console.error(err);
} else {
const wakeUpTimes = surveys.map(survey => survey.wakeUpTime);
const labels = ['Before 6am', '6-7am', '7-8am', '8-9am', '9-10am', 'After 10am'];
const data = labels.map(label => wakeUpTimes.filter(time => time === label).length);

pyplot.bar(labels, data);
pyplot.xlabel('Wake Up Time');
pyplot.ylabel('Count');
pyplot.title('Wake Up Time Distribution');

pyplot.show();
}
});
};

const plotSleepHours = () => {
Survey.find((err, surveys) => {
if (err) {
console.error(err);
} else {
const sleepHours = surveys.map(survey => survey.sleepHours);
const labels = ['Less than 4 hours', '4-6 hours', '6-8 hours', '8-10 hours', 'More than 10 hours'];
const data = labels.map(label => sleepHours.filter(hours => hours >= parseInt(label.split('-')[0]) && hours < parseInt(label.split('-')[1])).length);

pyplot.bar(labels, data);
pyplot.xlabel('Hours Outdoors per Day');
pyplot.ylabel('Count');
pyplot.title('Hours Outdoors Distribution');

pyplot.show();
}
});
};

const plotDailyWater = () => {
Survey.find((err, surveys) => {
if (err) {
console.error(err);
} else {
const dailyWater = surveys.map(survey => survey.dailyWater);
const labels = ['Less than 1L', '1L-2L', '2L-3L', '3L-4L', 'More than 4L'];
const data = labels.map(label => dailyWater.filter(water => water === label).length);

pyplot.bar(labels, data);
pyplot.xlabel('Daily Water Intake');
pyplot.ylabel('Count');
pyplot.title('Daily Water Intake Distribution');

pyplot.show();
}
});
};

module.exports = { plotStressLevel, plotPhysicalActivity, plotEyePain, plotSittingHours, plotActivityDays, plotActivityDuration, plotWakeUpTime, plotSleepHours, plotDailyWater };



const Chart = require('chart.js');

const plotStressLevel = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const stressLevels = surveys.map(survey => survey.stressLevel);
      const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const data = labels.map(label => stressLevels.filter(level => level === parseInt(label)).length);

      // Generate chart using Chart.js
      const ctx = document.getElementById('stressLevelChart').getContext('2d');
      const stressLevelChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Stress Level Distribution',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });
};

const plotPhysicalActivity = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const physicalActivity = surveys.map(survey => survey.physicalActivity);
      const labels = ['1', '2', '3', '4', '5'];
      const data = labels.map(label => physicalActivity.filter(level => level === parseInt(label)).length);

      // Generate chart using Chart.js
      const ctx = document.getElementById('physicalActivityChart').getContext('2d');
      const physicalActivityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Physical Activity Distribution',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });
};

const plotEyePain = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const eyePain = surveys.map(survey => survey.eyePain);
      const labels = ['0', '1', '2', '3', '4', '5'];
      const data = labels.map(label => eyePain.filter(level => level === parseInt(label)).length);

      // Generate chart using Chart.js
      const ctx = document.getElementById('eyePainChart').getContext('2d');
      const eyePainChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Eye Pain Distribution',
            data: data,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
});
}
});
};

const plotSittingHours = () => {
Survey.find((err, surveys) => {
if (err) {
console.error(err);
} else {
const sittingHours = surveys.map(survey => survey.sittingHours);
const labels = ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12+'];
const data = labels.map(label => sittingHours.filter(hours => hours >= parseInt(label.split('-')[0]) && hours < parseInt(label.split('-')[1])).length);
// Generate chart using Chart.js
const ctx = document.getElementById('sittingHoursChart').getContext('2d');
const sittingHoursChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Sitting Hours Distribution',
      data: data,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
}
});
};

const plotActivityDays = () => {
Survey.find((err, surveys) => {
if (err) {
console.error(err);
} else {
const activityDays = surveys.map(survey => survey.activityDays);
const labels = ['0', '1', '2', '3', '4', '5', '6', '7'];
const data = labels.map(label => activityDays.filter(days => days === parseInt(label)).length);

// Generate chart using Chart.js
const ctx = document.getElementById('activityDaysChart').getContext('2d');
const activityDaysChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Physical Activity Days Distribution',
      data: data,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
}
});
};

const plotActivityDuration = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const activityDurationLabels = [
        'Less than 30 minutes',
        'Between 30 minutes and 1 hour',
        'Between 1 and 2 hours',
        'More than 2 hours'
      ];
      const activityDurationData = activityDurationLabels.map(label =>
        surveys.filter(survey => survey.activityDuration === label).length
      );
      // Generate chart using Chart.js
      const ctx = document.getElementById('activityDurationChart').getContext('2d');
      const activityDurationChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: activityDurationLabels,
          datasets: [{
            label: 'Physical Activity Duration Distribution',
            data: activityDurationData,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });
}


const plotWakeUpTime = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const wakeUpTimes = surveys.map(survey => survey.wakeUpTime);
      const labels = ['Before 6am', '6-7am', '7-8am', '8-9am', '9-10am', 'After 10am'];
      const data = labels.map(label => wakeUpTimes.filter(time => time === label).length);

      // Generate chart using Chart.js
      const ctx = document.getElementById('wakeUpTimeChart').getContext('2d');
      const wakeUpTimeChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Wake Up Time Distribution',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } // <-- added missing closing brace
  });
}


const plotSleepHours = () => {
Survey.find((err, surveys) => {
if (err) {
console.error(err);
} else {
const sleepHours = surveys.map(survey => survey.sleepHours);
const labels = ['Less than 4 hours', '4-6 hours', '6-8 hours', '8-10 hours', 'More than 10 hours'];
const data = labels.map(label => sleepHours.filter(hours => hours >= parseInt(label.split('-')[0]) && hours < parseInt(label.split('-')[1])).length);

// Generate chart using Chart.js
const ctx = document.getElementById('sleepHoursChart').getContext('2d');
const sleepHoursChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Sleep Hours Distribution',
      data: data,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
}
// Generate chart using Chart.js
const plotSleepHours = () => {
  Survey.find((err, surveys) => {
    if (err) {
      console.error(err);
    } else {
      const sleepHoursLabels = ['Less than 6 hours', '6-7 hours', '7-8 hours', '8-9 hours', 'More than 9 hours'];
      const sleepHoursData = sleepHoursLabels.map(label =>
        surveys.filter(survey => survey.sleepHours === label).length
      );

      // Generate chart using Chart.js
      const ctx = document.getElementById('sleepHoursChart').getContext('2d');
      const sleepHoursChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sleepHoursLabels,
          datasets: [{
            label: 'Sleep Hours Distribution',
            data: sleepHoursData,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });
};


const plotDailyWater = () => {
Survey.find((err, surveys) => {
if (err) {
console.error(err);
} else {
const dailyWater = surveys.map(survey => survey.dailyWater);
const labels = ['Less than 1L', '1L-2L', '2L-3L', '3L-4L', 'More than 4L'];
const data = labels.map(label => dailyWater.filter(water => water === label).length);

// Generate chart using Chart.js
const ctx = document.getElementById('dailyWaterChart').getContext('2d');
const dailyWaterChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Daily Water Intake Distribution',
      data: data,
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true

      }
     }
   });
 });
};

module.exports = {
plotStressLevel,
plotPhysicalActivity,
plotEyePain,
plotSittingHours,
plotActivityDays,
plotActivityDuration,
plotWakeUpTime,
plotSleepHours,
plotDailyWater
};
