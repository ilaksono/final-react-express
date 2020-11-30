const isOpen = (open, today) => {
  let numOpen = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  };
  const now = new Date();

  const nowInt = now.getHours* 100 + now.getMinutes()
  if(open) {
    open.forEach((val, index) => {
      numOpen[val.day].push(index);
    });

    return numOpen[today].some(i => {
      let end = Number(open[i].end);
      if( end < open[i].start)
        end += 2400
      if(nowInt > Number(open[i].start) && nowInt < end)
        return true
      return false;  
    });
  }
  return false
}

export default isOpen;