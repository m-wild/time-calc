function calc() {
  const startHour = +document.getElementById('startHour').value;
  const startMinute = +document.getElementById('startMinute').value;

  const endHour = +document.getElementById('endHour').value;
  const endMinute = +document.getElementById('endMinute').value;

  const overnight = document.getElementById('overnight').checked;

  let startTime = moment(`${startHour}:${startMinute}`, 'HH:mm');
  if (!startTime.isValid())
    window.alert('Invalid start time');

  let endTime = moment(`${endHour}:${endMinute}`, 'HH:mm');
  if (!endTime.isValid())
    window.alert('Invalid end time');

  if (overnight)
    endTime = endTime.add(1, 'day');




  let totalTimeDecimal = endTime.diff(startTime, 'hours', true);


  document.getElementById('totalTimeFormatted').innerText =
      moment(moment.duration(totalTimeDecimal, 'hours')._data).format('HH:mm');

  document.getElementById('totalTimeDecimal').innerText = totalTimeDecimal.toFixed(2);

}