import {useState} from 'react';
const initData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Andrew\'s body fat % ',
    backgroundColor: '#1E0253',
    // backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }],
  ready: null
};
const initOptions = {
  scales: {
    yAxes: [{
      ticks: {
        min: 0,
        max: 5,
        maxTicksLimit: 6
      },
      scaleLabel: {
        labelString:'Rating',
        display: true
      }
    }],
    xAxes:[{
      scaleLabel: {
        labelString: 'Date',
        display: true,
        maxTicksLimit: 6
      }
    }]
  },
};
const initChartSelect = {
  options: ['Overall', 'Clean', 'Distance', 'Process'],
  select: 'Overall',
  perDay: true
};

const useChartData = () => {
  const [chartData, setChartData] = useState(initData);
  const [chartOptions, setChartOptions] = useState(initOptions);
  const [chartSelect, setChartSelect] = useState(initChartSelect);

  return {
    chartSelect,
    setChartSelect,
    chartOptions,
    setChartOptions,
    chartData,
    setChartData
  };
}
export default useChartData;