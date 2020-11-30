import { useEffect } from 'react';
import nextOpen from 'helpers/nextOpen';

const Hours = (props) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const formatAMPM = (str) => {
    let num = Number(str);
    let pm = false;
    let mins = num % 100;
    if (num >= 1200 && num < 2400) {
      pm = true;
      if (!(num === 1200))
        num -= 1200;
    }
    if (num === 0)
      num = 1200;
    if (mins === 0)
      mins = '00';
    return `${Math.floor(num / 100)}:${mins} ${pm ? 'PM' : 'AM'}`;
  };

  const hoursDayArray = [[]];
  props.businessDetails.hours[0].open.map((time, index) => {
    if (hoursDayArray[time.day]) {
      hoursDayArray[time.day].push(time);
    } else {
      hoursDayArray[time.day] = [time];
    }
  });


  const now = new Date();
  let dayNum = now.getDay() - 1; // 1 is monday
  if (dayNum < 0) {
    dayNum += 7;
  }

  // let nextOpenStart = null;
  // let nextOpenEnd = null;
  // let nextOpenDay = null;
  const {
    nextOpenStart, 
    nextOpenEnd,
    nextOpenDay
  } = nextOpen(props.businessDetails.hours[0].open, dayNum)
  const parsedRows = hoursDayArray.map((day, index) => {
    const results = [];
    const currentTime = now.getHours() * 100 + now.getMinutes();
    for (const index in day) {
      // if (day[index].day === props.dayNum) {
      //   if (currentTime < day[index].start) {
      //     nextOpenDay = days[(day[index].day) % 7];
      //     nextOpenStart = formatAMPM(day[index].start);
      //     nextOpenEnd = formatAMPM(day[index].end);
      //   } if (currentTime >= day[index].start && currentTime <= day[index].end) {
      //   } if (currentTime > day[index].end) {
      //     if (!nextOpenDay && !nextOpenStart && !nextOpenEnd) {
      //       if (day[index].day === 6) {
      //       nextOpenDay = days[(day[index].day + 1) % 7];
      //       nextOpenStart = formatAMPM(hoursDayArray[(day[index].day + 1) % 7][0].start);
      //       nextOpenEnd = formatAMPM(hoursDayArray[(day[index].day + 1) % 7][0].end);
      //     }
      //   } else {
      //     nextOpenDay = days[(day[index].day - 1)];
      //       nextOpenStart = formatAMPM(hoursDayArray[(day[index].day - 1)][0].start);
      //       nextOpenEnd = formatAMPM(hoursDayArray[(day[index].day - 1)][0].end);
      //   }
      //   }
      // }
      
      // if (day[index].day === props.dayNum) {
      //   if (currentTime < day[index].start) {
      //     nextOpenDay = days[(day[index].day) % 7];
      //     nextOpenStart = formatAMPM(day[index].start);
      //     nextOpenEnd = formatAMPM(day[index].end);
      //   } if (currentTime >= day[index].start && currentTime <= day[index].end) {
      //   } if (currentTime > day[index].end) {
      //     if (!nextOpenDay && !nextOpenStart && !nextOpenEnd) {
      //       nextOpenDay = days[(day[index].day + 1) % 7];
      //       nextOpenStart = formatAMPM(hoursDayArray[(day[index].day + 1) % 7][0].start);
      //       nextOpenEnd = formatAMPM(hoursDayArray[(day[index].day + 1) % 7][0].end);
      //   }
      // }}
      results.push((
        <tr className="hours-table-row">
          <td className="td-day">
            {/* eslint-disable-next-line */}
            {index == 0 ? days[day[index].day] : null}
          </td>
          <td className='time-block'>&nbsp; {formatAMPM(day[index].start)}
          </td>
          <td className="td-separator">&nbsp;  - </td>
          <td className='time-block'>{formatAMPM(day[index].end)}</td>
          {/* {msg &&
            <td className={`${msg === 'Open now'
              ? 'is-open' : 'is-closed'}`}>
              &nbsp; {msg}
            </td>} */}
        </tr>
      ));
    }

    return results;
  });

  useEffect(() => {
    props.setNextOpen({ day: nextOpenDay, start: nextOpenStart, end: nextOpenEnd });
    // eslint-disable-next-line
  }, [nextOpenDay, nextOpenStart, nextOpenEnd]);

  return (
    <table className="hours-table">
      <tbody>
        {parsedRows}
      </tbody>
    </table>

  );


};

export default Hours;