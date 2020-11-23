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


  const parsedRows = props.businessDetails.hours[0]
    .open.map((time, index) => {
      let msg = null;
      if (index === props.dayNum) {
        if (props.openNow()) {
          msg = 'Open now';
        }

        else msg = 'Closed now';

      }

      return (
        <tr>
          <td>
            {days[index]}
          </td>
          <td className='time-block'>{formatAMPM(time.start)} - {formatAMPM(time.end)}
          </td>
          {msg &&
            <td className={`${msg === 'Open Now' 
            ? 'is-open' : 'is-closed'}`}>
              {msg}
            </td>}
        </tr>
      );
    });

  return (
    <table>
      {parsedRows}
    </table>

  );


};

export default Hours;