import 'styles/BusinessPage.scss';
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

  const parsedRows = hoursDayArray.map((day, index) => {
    const results = [];
    console.log(day);
    let nextOpenStart = null;
    let nextOpenEnd = null;
    let nextOpenDay = null;
    const currentTime = now.getHours() * 100 + now.getMinutes();
    let msg = null;
    for(const index in day) {
      if (day[index].day === props.dayNum) {
        if (currentTime < day[index].start) {
          msg = msg ? null : "Closed now";
          nextOpenStart = day[index].start;
          nextOpenEnd = day[index].start;
          nextOpenDay = day[index].day;
        } if (currentTime >= day[index].start && currentTime <= day[index].end) {
          msg = msg ? null : "Open now";
        } if (currentTime > day[index].end) {
          msg = msg ? null : "Closed now";
          nextOpenDay = (day[index].day + 1) % 7;
          nextOpenStart = hoursDayArray[nextOpenDay][0].start;
          nextOpenEnd = hoursDayArray[nextOpenDay][0].end;
        }
      }
      results.push((
        <tr>
          <td>
            { index == 0 ? days[day[index].day] : null }
          </td>
          <td className='time-block'>&nbsp; {formatAMPM(day[index].start)}
          </td>
          <td>&nbsp;  - </td>
          <td className='time-block'>&nbsp; {formatAMPM(day[index].end)}</td>
          {msg &&
            <td className={`${msg === 'Open now'
              ? 'is-open' : 'is-closed'}`}>
              &nbsp; {msg}
            </td>}
        </tr>
      ));
    }
    return results;
  });


  return (
    <table>
      {parsedRows}
    </table>

  );


};

export default Hours;