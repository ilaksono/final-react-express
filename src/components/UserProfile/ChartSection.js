import { Line, Doughnut, Chart } from 'react-chartjs-2';
import { useState } from 'react';
import 'styles/ChartSection.scss';



const ChartSection = (props) => {

  return (
    <div className='line-graph-container' style={{ backgroundColor: 'white' }}>
      <Line data={props.data} options={props.options || null} />
    </div>
  );
};

export default ChartSection;