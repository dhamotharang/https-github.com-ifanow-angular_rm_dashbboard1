import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { calendarService } from './../calendar.service';
import { AuthService } from '../../../../../../auth-service/authService';
import { EventDialog } from './../event-dialog';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent implements OnInit {

  viewDate: any;
  numbersOfDays: any;
  lastMonthDays: any;
  nextMonthDays: any;
  updateDate: any;
  day;
  month;
  year;
  week: any = [];
  selectedDate;
  dialogData: any
  currentMonth;
  addLastMonthDays;
  daysArr: any = [];
  formatedEvent = []
  eventData: any = [];
  eventTitle;
  eventDescription;
  startTime;
  endTime;
  current_day = new Date();
  userInfo: any;
  currentYear: any;
  excessAllow: any;
  private unSubcrip: Subscription;
  constructor(public dialog: MatDialog, private calenderService: calendarService) { }

  timeArry: any = [];
  ngOnInit() {
    let am: boolean = true;
    for (let i = 1; i < 13; i++) {
      if (am) {
        this.timeArry.push(i + ' AM');
      }
      else {
        this.timeArry.push(i + ' PM');
      }
      if (i == 12 && am) {
        i = 0
        am = false;
      }
    }
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.viewDate = new Date();
    this.day = this.formateDate(this.viewDate)
    this.userInfo = AuthService.getUserInfo()
    // this.updatecalendar();
    this.getWeek(this.viewDate);
    this.getEvent();
    this.curruntDayIndex = this.daysArr.indexOf(this.selectedDate);
    // this.excessAllow = localStorage.getItem('successStoringToken')
    this.unSubcrip = this.calenderService.updateDayArr().subscribe((data: any) => {
      this.getWeek(data[1].viewDate);
      this.daysArr = data[0];
      this.day = data[1].selectedDate;
      this.month = data[1].month;
      this.year = data[1].year;
      this.numbersOfDays = data[1].numbersOfDays;
      this.lastMonthDays = data[1].lastMonthDays;
      this.nextMonthDays = data[1].nextMonthDays;
      this.viewDate = data[1].viewDate;
      this.addLastMonthDays = data[1].addLastMonthDays;
      // let selectedDate = this.year + "," + this.month+ "," +this.day
      console.log(this.daysArr, this.day, "this.daysArr....", this.week);
    });

  }

  getWeek(day) {
    var d = new Date(day);
    this.week = [];

    var _days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 1; i <= 7; i++) {
      let first = d.getDate() - d.getDay() + i;
      let dt = new Date(d.setDate(first));
      var _day = _days[dt.getDay()];
      var _month = _months[dt.getMonth()];
      var _date: any = dt.getDate();
      if (_date < 10) {
        _date = '0' + _date;
      }
      var _year = dt.getFullYear();
      var fulldate = _day + ' ' + _month + ' ' + _date + ' ' + _year + ' ';
      this.week.push(new Date(fulldate));
    }
    // console.log(newWeek,"newWeek",newDate);

  }

  getEvent() {
    let eventData = {
      "calendarId": AuthService.getUserInfo().userName,
      "userId": AuthService.getUserInfo().advisorId
    }
    this.calenderService.getEvent(eventData).subscribe((data) => {

      if (data != undefined) {

        this.eventData = data;

        this.formatedEvent = [];

        for (let e of this.eventData) {
          if (e.start) {
            e["day"] = this.formateDate(e.start.dateTime == null ? new Date(e.start.date) : new Date(e.start.dateTime));
            e["month"] = this.formateMonth(e.start.dateTime == null ? new Date(e.start.date) : new Date(e.start.dateTime));
            e["year"] = this.formateYear(e.start.dateTime == null ? new Date(e.start.date) : new Date(e.start.dateTime));
            e["startTime"] = this.formateTime(e.start.dateTime == null ? new Date(e.start.date) : new Date(e.start.dateTime));
            e["endTime"] = this.formateTime(e.start.dateTime == null ? new Date(e.start.date) : new Date(e.end.dateTime));
            this.formatedEvent.push(e);
            // console.log(this.formatedEvent,"formatedEvent calender1",);
          }
        }
        console.log(data, "week events calender", this.formatedEvent);

      }
    });


  }

  getDaysCount(month: number, year: number, ch: string): any {
    switch (ch) {
      case "currentMonthDays": return 32 - new Date(year, month, 32).getDate();

      case "lastMonthDays": return 32 - new Date(year - 1, month - 1, 32).getDate();

      case "nextMonthDays": return 32 - new Date(year + 1, month + 1, 32).getDate();
    }

  }

  curruntDayIndex: any;

  // updatecalendar() {
  //   this.month = this.viewDate.getMonth();
  //   this.year = this.viewDate.getFullYear();
  //   this.selectedDate = this.viewDate.getDate();
  //   // this.numbersOfDays = this.daysInMonth(this.month, this.year)
  //   this.numbersOfDays = this.getDaysCount(this.month, this.year, "currentMonthDays");
  //   this.lastMonthDays = this.getDaysCount(this.month, this.year, "lastMonthDays");
  //   this.nextMonthDays = this.getDaysCount(this.month, this.year, "nextMonthDays");
  //   let firstDay = (new Date(this.year, this.month)).getDay();


  //   for (let i = 1; i <= this.numbersOfDays; i++) {
  //     this.daysArr.push(i);
  //   }

  //   if (firstDay == 0) {
  //     this.addLastMonthDays = 6;
  //   }
  //   else {
  //     this.addLastMonthDays = firstDay - 1;
  //   }

  //   for (let d = 1; d <= this.addLastMonthDays; d++) {
  //     this.daysArr.unshift(this.lastMonthDays);
  //     this.lastMonthDays -= 1;
  //   }

  //   for (let fd = 1; this.daysArr.length <= 41; fd++) {
  //     this.daysArr.push(fd);
  //   }



  // }

  formateDate(date) {
    var dd = new Date(date).getDate();

    return dd;
  }

  formateMonth(date) {
    var mm = new Date(date).getMonth() + 1; //January is 0!
    return mm;
  }

  formateYear(date) {
    var yyyy = new Date(date).getFullYear();
    return yyyy;
  }

  returnNumber(num) {
    // num.toUpperCase()
    //  console.log(parseInt(num) +1+' '+ num.charAt(num.length - 3).toUpperCase() + num.charAt(num.length - 2).toUpperCase(),"time event");
    return parseInt(num) + 1 + ' ' + num.charAt(num.length - 3).toUpperCase() + num.charAt(num.length - 2).toUpperCase()
  }

  formateTime(date) {

    var hh = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var mm = date.getMinutes();
    var amPm = date.getHours() > 12 ? "pm" : "am";
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    return hh + ":" + mm + amPm + " ";
  }

  addEvent(day, month, year, time) {
    let hr;
    if (time.charAt(time.length - 2) + time.charAt(time.length - 1) == 'PM') {
      hr = 12 + parseInt(time);
    }
    else {
      hr = parseInt(time);
    }
    let event: any;
    if (month == 0) {
      month = 12;
    }
    else if (month == 13) {
      month = 1;
      year += 1;
    }
    let eventDate = new Date(month + "/" + day + "/" + year);
    eventDate.setHours(hr - 1)
    event = {
      "eventId": "",
      "summary": "",
      "location": "",
      "title": "",
      "description": "",
      "start": {
        "dateTime": eventDate,
        "timeZone": null
      },
      "end": {
        "dateTime": eventDate,
        "timeZone": null
      },
      "recurrence": "",
      "attendee": "",
      "attendeesList": ""
    }

    this.openDialog(event);

    // const dialogRef = this.dialog.open(EventDialog, {
    //   width: '50%',
    //   data: event
    // });
  }

  editEvent(eventData) {
    let event: any;
    if (eventData != null) {
      event = eventData;
    }
    else {
      event = {
        "eventId": "",
        "summary": "",
        "location": "",
        "title": "",
        "description": "",
        "start": {
          "dateTime": null,
          "timeZone": null
        },
        "end": {
          "dateTime": null,
          "timeZone": null
        },
        "recurrence": "",
        "attendee": "",
        "attendeesList": ""
      }
    }

    this.openDialog(event);
  }

  openDialog(eventData): void {

    const dialogRef = this.dialog.open(EventDialog, {
      width: '576px',
      height: '673px',
      data: eventData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != 'delete') {
        this.dialogData =
        {
          "calendarId": AuthService.getUserInfo().userName,
          "userId": AuthService.getUserInfo().advisorId,
          "eventId": result.eventId,
          "summary": result.title,
          "location": result.location,
          "description": result.description,
          "start": {
            "dateTime": "",
            "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          "end": {
            "dateTime": "",
            "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          "recurrence": [
            "RRULE:FREQ=DAILY;COUNT=2"
          ],
          "attendees": result.attendeesList
        }


        this.startTime = result.startTime;
        this.endTime = result.endTime;
        this.dialogData.start.dateTime = this.googleDate(result.startDateTime._d == undefined ? new Date(result.startDateTime) : result.startDateTime._d, "start");
        this.dialogData.end.dateTime = this.googleDate(result.endDateTime._d == undefined ? new Date(result.endDateTime) : result.endDateTime._d, "end");

        if (this.dialogData.eventId != null) {
          this.calenderService.updateEvent(this.dialogData).subscribe((data) => {
            this.getEvent();
          })
        }
        else {
          this.calenderService.addEvent(this.dialogData).subscribe((data) => {
            this.getEvent();
          })
        }
      }
      if (result == 'delete') {
        this.getEvent();
      }
    });
  }

  googleDate(date, timeMood) {

    this.current_day = new Date();
    var current_date = date.getDate();
    var current_month = date.getMonth() + 1;
    var current_year = date.getFullYear();
    if (this.startTime == "" || this.endTime == "") {
      var current_hrs: any = date.getHours();
      var current_mins: any = date.getMinutes();
      current_hrs = current_hrs < 10 ? '0' + current_hrs : current_hrs;
      current_mins = current_mins < 10 ? '0' + current_mins : current_mins;
    }
    else {
      var start_hrs_mins = this.startTime;
      var end_hrs_mins = this.endTime;
    }
    var current_secs: any = this.current_day.getSeconds();

    // Add 0 before date, month, hrs, mins or secs if they are less than 0
    current_date = current_date < 10 ? '0' + current_date : current_date;
    current_month = current_month < 10 ? '0' + current_month : current_month;

    current_secs = current_secs < 10 ? '0' + current_secs : current_secs;

    // Current datetime
    // String such as 2016-07-16T19:20:30
    if (timeMood == "start" && this.startTime != "") {
      return current_year + '-' + current_month + '-' + current_date + 'T' + start_hrs_mins + ':' + current_secs;
    }
    else if (timeMood == "end" && this.endTime != "") {
      return current_year + '-' + current_month + '-' + current_date + 'T' + end_hrs_mins + ':' + current_secs;
    }
    else {
      return current_year + '-' + current_month + '-' + current_date + 'T' + current_hrs + ':' + current_mins + ':' + current_secs;
    }
  }

  ngOnDestroy() {
    this.unSubcrip.unsubscribe();
    console.log("unsubscribe");

  }
}
