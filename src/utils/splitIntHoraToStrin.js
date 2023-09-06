
function splitIntTime(time){
  if(time.length === 4){
    const newTime = time[0] + time[1] + ':' + time[2] + time[3];
    return newTime;
  }else(time.length === 3){
    const newTime = '0' + time[0] + ':' + time[1] + time[2];
    return newTime;
  }
};

function createArraySchedule(arr){
  let  busySchedules = [];
  arr.forEach(element => {
    let start = element.dataValues.startTime;
    start = start.split(':');
    start = `${start[0]}` + `${start[1]}`
    busySchedules.push(Number(start));
  });
  busySchedules = busySchedules.sort((a, b) => a -b);
  return busySchedules;    
}

module.exports = { splitIntTime, createArraySchedule };

