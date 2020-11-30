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
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const nextOpen = (open, today) => {
  let numOpen = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  };
  open.forEach((val, index) => {
    numOpen[val.day].push(index);
  });
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const nowInt = h * 100 + m;
  let nextOpenDay = 'Today';
  let nextOpenStart = null;
  let nextOpenEnd = null;

  if (numOpen[today].length > 1) {
    // if open today again
    if ((h * 100 + m) < Number
      (open[numOpen[today][numOpen[today].length - 1]]
        .end)) {
      const bool = open.find((val) => {
        if (val.day === today && nowInt
          < Number(val.start)) {
          nextOpenStart = formatAMPM(val.start);
          nextOpenEnd = formatAMPM(val.end);
          return true;

        } else return false;
      });
      if (bool) return {
        nextOpenStart,
        nextOpenEnd,
        nextOpenDay
      };
      else {
        for (let i = today + 1; i < 7; i++) {
          if (numOpen[i].length) {
            nextOpenDay = days[i];
            nextOpenStart = formatAMPM(open[numOpen[i][0]].start);
            nextOpenEnd = formatAMPM(open[numOpen[i][0]].end);
            return { nextOpenStart, nextOpenEnd, nextOpenDay };
          }
        }
        if (!nextOpenStart) {
          for (let i = 0; i < 7; i++) {
            console.log(3);
            if (numOpen[i].length) {
              nextOpenDay = days[i];
              nextOpenStart = formatAMPM(open[numOpen[i][0]].start);
              nextOpenEnd = formatAMPM(open[numOpen[i][0]].end);
              return {
                nextOpenStart, nextOpenEnd, nextOpenDay
              };
            }
          }
        }

      }
    }
    // return `Next open: ${nextOpenDay} from ${formatAMPM(nextOpenStart)} to ${formatAMPM(nextOpenEnd)}`;
  } else {
    if (open[numOpen[today][0]] && (Number(open[numOpen[today][0]].start) > nowInt))
      return {
        nextOpenStart: formatAMPM(open[numOpen[today][0]].start),
        nextOpenEnd: formatAMPM(open[numOpen[today][0]].end),
        nextOpenDay: 'Today'
      };

    for (let i = today + 1; i < 7; i++) {
      if (numOpen[i].length) {
        nextOpenDay = days[i];
        nextOpenStart = formatAMPM(open[numOpen[i][0]].start);
        nextOpenEnd = formatAMPM(open[numOpen[i][0]].end);
        return { nextOpenStart, nextOpenEnd, nextOpenDay };

      }
    }
    
    if (!nextOpenStart) {
      for (let i = 0; i < 7; i++) {
        console.log(3);
        if (numOpen[i].length) {
          nextOpenDay = days[i];
          nextOpenStart = formatAMPM(open[numOpen[i][0]].start);
          nextOpenEnd = formatAMPM(open[numOpen[i][0]].end);
          return {
            nextOpenStart, nextOpenEnd, nextOpenDay
          };
        }
      }
    }
    if (!nextOpenStart) {
      return {
        nextOpenStart: null,
        nextOpenEnd: null,
        nextOpenDay: null
      };
    }
  }
  return { nextOpenStart, nextOpenEnd, nextOpenDay };
};

export default nextOpen;