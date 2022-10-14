import { Component, Injectable, OnInit } from '@angular/core';
import { Results, GeocodingPain, OpenMeteo } from "./weather-information"
import { FormControl } from '@angular/forms'; //fuck you, break everything like a fucking dipshit

async function Coordinates(city: string) {
  let api_url = 'https://geocoding-api.open-meteo.com/v1/search?name='
  let response = await fetch(api_url + city);
  const json = await response.json();
  let WGS84_Coordinates = json.results[0];
  
  const coords = [0, 0];

  coords[0] = WGS84_Coordinates.latitude;
  coords[1] = WGS84_Coordinates.longitude;
  
  return coords
}
export async function WeatherFromCity(city: string, time: string, changeDates: Boolean){
  const coords = await Coordinates(city);
    
  let api_url = 'https://api.open-meteo.com/v1/forecast?latitude='
  let response = await fetch(api_url + coords[0] + "&longitude=" + coords[1] + "&hourly=temperature_2m" + "&hourly=precipitation" + "&hourly=windspeed_10m" + "&hourly=winddirection_10m");
  const WeatherData = await response.json();


  const isEqualToTime = (element: string) => time == element

  let index = WeatherData.hourly.time.findIndex(isEqualToTime);
  let temperature = WeatherData.hourly.temperature_2m[index];
  let precipitation = WeatherData.hourly.precipitation[index];
  let windspeed = WeatherData.hourly.windspeed_10m[index];
  let winddirection = WeatherData.hourly.winddirection_10m[index];

  ChangeSpanText("by", "Valgte by: " + city);
  ChangeSpanText("temp", "Temperatur: " + temperature + " °C");
  ChangeSpanText("rain", "Nedbør: " + precipitation + " mm");
  ChangeSpanText("windspeed", "Vindhastighed: " + windspeed + " m/s");

  //Weathercompass
  var compass = document.querySelector("#windArrow") as HTMLElement | null;
    if(compass != null){
      compass.style.transform = 'rotate(' + winddirection + 'deg)';
    }
  
  if(changeDates){
  //Changes dates
  for(let i = 1; i < 8; i++){
    let date = "date" + i.toString()
    let dateTime = currentTimeUTC(i-1);


    const currentItem = document.getElementById(date)  as HTMLElement | null;
    if(currentItem != null){
      const findIndex = (element: string) => dateTime == element
      let index = WeatherData.hourly.time.findIndex(findIndex);
      let temperature = WeatherData.hourly.temperature_2m[index];
      //yyyy-mm-ddThh:00

      currentItem.textContent = temperature + " °C"
    }
  }
  }
}
export async function WeatherFromCoords(lat: number, long: number, time: string){
  let api_url = 'https://api.open-meteo.com/v1/forecast?latitude='
  let response = await fetch(api_url + lat + "&longitude=" + long + "&hourly=temperature_2m" + "&hourly=precipitation" + "&hourly=windspeed_10m" + "&hourly=winddirection_10m");
  const WeatherData = await response.json();


  const isEqualToTime = (element: string) => time == element

  let index = WeatherData.hourly.time.findIndex(isEqualToTime);
  let temperature = WeatherData.hourly.temperature_2m[index];
  let precipitation = WeatherData.hourly.precipitation[index];
  let windspeed = WeatherData.hourly.windspeed_10m[index];
  let winddirection = WeatherData.hourly.winddirection_10m[index];
  
  ChangeSpanText("temp", "Temperatur: " + temperature + " °C");
  ChangeSpanText("hiddenTemp", temperature);
  ChangeSpanText("rain", "Nedbør: " + precipitation + " mm");
  ChangeSpanText("windspeed", "Vindhastighed: " + windspeed + " km/t");

  //Changes dates
  for(let i = 1; i < 8; i++){
    let date = "date" + i.toString()
    let dateTime = currentTimeUTC(i-1);


    const currentItem = document.getElementById(date)  as HTMLElement | null;
    if(currentItem != null){
      const findIndex = (element: string) => dateTime == element
      let index = WeatherData.hourly.time.findIndex(findIndex);
      let temperature = WeatherData.hourly.temperature_2m[index];
      //yyyy-mm-ddThh:00

      currentItem.textContent = temperature + " °C"
    }
  }

  //Weathercompass
  var compass = document.querySelector("#windArrow") as HTMLElement | null;
    if(compass != null){
      compass.style.transform = 'rotate(' + winddirection + 'deg)';
    }
}
export function currentTimeUTC(number: number){
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + number);
  var time = today.getHours() + ":00"

  //If its 8am then itll return 8:00 
  //api requires it says 08:00
  if(time.length < 5){
    time = "0" + time
  }
  
  return date + "T" + time;
}
function ChangeSpanText(id: string, text:string){
  var currentItem = document.getElementById(id) as HTMLElement | null;
  if(currentItem != null){
    currentItem.textContent = text
  }
}

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {
  weatherInfo: OpenMeteo;

  constructor() { 
    this.weatherInfo = {} as OpenMeteo;
  }
  
  ngOnInit(): void {}
  ngAfterContentInit(): void {
    WeatherFromCity("København", currentTimeUTC(0), true);
  }
  getWeatherButtonClicked(){
    const input1 = document.getElementById("city") as HTMLInputElement
    const input2 = document.getElementById("time") as HTMLInputElement

    let city = input1?.value //Get city
    var time = ""

    if(input2.value != ""){
    var today = new Date();
    time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + "T" + input2?.value;
    var charArray = time.split("")
    charArray[14] = "0"
    charArray[15] = "0"
    time = charArray.join("")
    } else {
      time = currentTimeUTC(0)
    }

    
    WeatherFromCity(city, time, true);
  }
}