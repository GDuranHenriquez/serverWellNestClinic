
function splitIntToStrinTime(time){
  const timeString = `${time}`;
  if(timeString.length === 4){
    const newTime = timeString[0] + timeString[1] + ':' + timeString[2] + timeString[3];
    return newTime;
  }else if(timeString.length === 3){
    const newTime = '0' + timeString[0] + ':' + timeString[1] + timeString[2];
    return newTime;
  }
};

function createArraySchedule(arr){
  let  busySchedules = [];
  arr.forEach(element => {
    let start = element.dataValues.startTime;
    start = splitStrinToIntTime(start);
    busySchedules.push(start);
  });
  busySchedules = busySchedules.sort((a, b) => a -b);
  return busySchedules;    
};

function createArrayScheduleString(arr){
  let  busySchedules = [];
  arr.forEach(element => {
    start = splitIntToStrinTime(element);
    busySchedules.push(start);
  });
  busySchedules = busySchedules.sort((a, b) => a -b);
  return busySchedules;    
};

function splitStrinToIntTime(timeString){
  let time = timeString.split(':');
  time = `${time[0]}` + `${time[1]}`
  return Number(time)
};

function validateDisponivilidad(arr, timeStart){
  const schedule = [800, 830, 900, 930, 1000, 1030, 1100, 1130, 1300, 1330, 1400, 1430, 1500, 1530, 1600];
  const available = [];
  const availableString = [];
  const timeStartInt = splitStrinToIntTime(timeStart);//900

  for(let i = 0; i < schedule.length; i++){
    if(!arr.includes(schedule[i])){
      available.push(schedule[i]);
      availableString.push(splitIntToStrinTime(schedule[i]));
    }
  };

  if(available.includes(timeStartInt)){
    return [true, {message: 'create appointment' }]
  }else{
    return [false, {error: 'no availability' , message: 'Schedule not available', available: availableString }];
  };
};

function validateDisponivilidadUser(occupiedByUser, timeStart){
  if(occupiedByUser.includes(timeStart)){
    return [false, {error: 'no availability' , message: 'Schedule not available'}];
  }else{
    return [true, {message: 'create appointment' }]
  }
};

function validateAvailabilityHours(arr){
  const schedule = [800, 830, 900, 930, 1000, 1030, 1100, 1130, 1300, 1330, 1400, 1430, 1500, 1530, 1600];
  const available = [];
  const availableString = [];
  
  for(let i = 0; i < schedule.length; i++){
    if(!arr.includes(schedule[i])){
      available.push(schedule[i]);
      availableString.push(splitIntToStrinTime(schedule[i]));
    }
  };

  return { scheduleString: availableString, scheduleInt: available }
};

module.exports = { splitStrinToIntTime , createArraySchedule, splitIntToStrinTime, validateDisponivilidad, validateDisponivilidadUser, validateAvailabilityHours, createArrayScheduleString };
