angular.module('timesheetApp', [])
  .controller('TimesheetController', function() {
    let ctrl = this;

    ctrl.weekStarting = moment().startOf('isoWeek').toDate();
    ctrl.daysOfWeek = [];
    ctrl.totalHours = null;

    ctrl.initDaysOfWeek = function () {
      ctrl.daysOfWeek = [];
      for (let i = 0; i < 7; i++) {
        let day = {
          moment: moment(ctrl.weekStarting).add(i, 'days'),
        };
        day.isWeekend = day.moment.weekday() === 0 || day.moment.weekday() === 6;

        ctrl.daysOfWeek.push(day);
      }
    };
    ctrl.initDaysOfWeek();


    ctrl.calculateWorkHours = function(day) {
      if (day.startHour === undefined || day.startMinute === undefined
        || day.endHour === undefined|| day.endMinute === undefined) return;

      let startTime = moment(`${day.startHour}:${day.startMinute}`, 'HH:mm');
      let endTime = moment(`${day.endHour}:${day.endMinute}`, 'HH:mm');

      if (endTime.hour() < startTime.hour()) endTime = endTime.add(1, 'day');

      day.totalHours = endTime.diff(startTime, 'hours', true);

      calculateTotalHours();
    };

    function calculateTotalHours() {
      ctrl.totalHours = ctrl.daysOfWeek
        .map(function(d) {
          if (!d.totalHours) return 0;
          return d.totalHours;
        })
        .reduce(function (sum, val) {
          return sum + val;
        }, 0);
    }


  });
