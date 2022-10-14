import { Component, OnInit } from '@angular/core';
import { WeatherFromCity, currentTimeUTC } from '../weather-data/weather-data.component';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
fullDate: string[];
  constructor() { 
    this.fullDate = new Array(7);
  }

  ngOnInit(): void {
    let currentTimeDate = new Date();

    var month = new Array(12);
        month[0] = "Januar";
        month[1] = "Febuar";
        month[2] = "Marts";
        month[3] = "April";
        month[4] = "Maj";
        month[5] = "Juni";
        month[6] = "Juli";
        month[7] = "August";
        month[8] = "September";
        month[9] = "Oktober";
        month[10] = "November";
        month[11] = "December";


    var weekday = new Array(7);
        weekday[0] = "Søndag";
        weekday[1] = "Mandag";
        weekday[2] = "Tirsdag";
        weekday[3] = "Onsdag";
        weekday[4] = "Torsdag";
        weekday[5] = "Fredag";
        weekday[6] = "Lørdag";

    var currentMonth = month[currentTimeDate.getMonth()]; 

    let skudår = 'placeholder';

    if ((0 == currentTimeDate.getFullYear() % 4) && (0 != currentTimeDate.getFullYear() % 100) || (0 == currentTimeDate.getFullYear() % 400)) {
      skudår = 'ja';
  } else {
      skudår = 'nej';
  }

    for(let i = 0; i < 7; i++){
      var currentDay = weekday[currentTimeDate.getDay() + i];
      var currentDate = currentTimeDate.getDate() + i;
      
      if(currentDate > 28 && currentMonth == "Febuar" && skudår == 'ja'){
        if(currentDate > 29) {
          currentDate = currentDate - 29;
        }
      }
      if(currentDate > 28 && currentMonth == "Febuar" && skudår == 'nej'){
        currentDate = currentDate - 28;
      }

      if(currentDate > 30) {
        if(currentMonth == ("Januar" || "Marts" || "Maj" || "Juli" || "August" || "Oktober" || "December") && currentDay > 31){
          currentDate = currentDate - 31;
        } else 
          currentDate = currentDate - 30;
      }
      if(currentTimeDate.getDay() + i > 6) {
        currentDay = weekday[currentTimeDate.getDay() + i - 7];
      }
      this.fullDate[i] = `${currentDay} d. ${currentDate}`;
    }
  }
  
  dateClicked(number: number){
    const temp = document.getElementById("by") as HTMLElement | null

    if(temp?.textContent != null){
      let city = temp.textContent.substring(11);
      console.log(city + "  " + currentTimeUTC(number))
      WeatherFromCity(city, currentTimeUTC(number), false)
    }
    

    
  }

}
