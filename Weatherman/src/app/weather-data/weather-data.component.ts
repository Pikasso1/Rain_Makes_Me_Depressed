import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs"
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
async function WeatherFromCity(city: string, time: string){
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

  console.log(WeatherData.hourly.temperature_2m[index])

  ChangeSpanText("temp", "Temperatur: " + temperature + " °C");
  ChangeSpanText("rain", "Nedbør: " + precipitation + " mm");
  ChangeSpanText("windspeed", "Vindhastighed: " + windspeed + " m/s");

  //Weathercompass
  var compass = document.querySelector("#windArrow") as HTMLElement | null;
    if(compass != null){
      compass.style.transform = 'rotate(' + winddirection + 'deg)';
    }

  console.log(WeatherData);
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

  console.log(WeatherData.hourly.temperature_2m[index])

  ChangeSpanText("temp", "Temperatur: " + temperature + " °C");
  ChangeSpanText("rain", "Nedbør: " + precipitation + " mm");
  ChangeSpanText("windspeed", "Vindhastighed: " + windspeed + " km/t");

  //Weathercompass
  var compass = document.querySelector("#windArrow") as HTMLElement | null;
    if(compass != null){
      compass.style.transform = 'rotate(' + winddirection + 'deg)';
    }

  console.log(WeatherData);
}
export function currentTimeUTC(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":00" 
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

  constructor(private requester: GetWeather) { 
    this.weatherInfo = {} as OpenMeteo;
  }
  
  ngOnInit(): void {
    //this.requester.getWeatherData("Berlin").subscribe(response =>{
      //this.weatherInfo.latitude = response.latitude;
      //this.weatherInfo.longitude = response.longitude;
      //this.weatherInfo.current_weather = response.current_weather;
      
      //console.log(this.weatherInfo);
    //})

    
        
  }
  ngAfterContentInit(): void {
    WeatherFromCity("Berlin", currentTimeUTC());
  }
  getWeatherButtonClicked(){
    const input1 = document.getElementById("city") as HTMLInputElement
    const input2 = document.getElementById("time") as HTMLInputElement

    let city = input1?.value //Get city
    
    var today = new Date();
    var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + "T" + input2?.value;

    WeatherFromCity(city, time);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetWeather {
  location: GeocodingPain;
  coordinates: Results;
  private apiKey: string;

  constructor(private http: HttpClient) {
    this.location = {} as GeocodingPain;
    this.coordinates = {} as Results;
    this.apiKey = "pk.531d2688dbad2f0c2b6c376ed8c34abc";
  }

  public getWeatherData(name: string): Observable<OpenMeteo> {
    let lat = 0;
    let long = 0;


    this.getCoordinates(name).subscribe(response =>{
      this.coordinates.lat = response[0].lat;
      this.coordinates.long = response[0].lon;
      console.log(response[0])
    })
    
    console.log(this.coordinates);
    lat = parseFloat(this.coordinates.lat);
    long = parseFloat(this.coordinates.long);
    console.log(lat + " " + long)


    let queryParams = new HttpParams();
    queryParams = queryParams.append("latitude", 50);
    queryParams = queryParams.append("longitude", 50);
    queryParams = queryParams = queryParams.append("current_weather",true);



    const url = "https://api.open-meteo.com/v1/forecast";
    const test = this.http.get<OpenMeteo>(url, {params:queryParams});
    console.log(test);
    return test;
  }

  public getCoordinates(cityName: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("key", this.apiKey);
    queryParams = queryParams.append("q", cityName);
    queryParams = queryParams.append("limit", 1);
    queryParams = queryParams.append("format", "JSON");

    const url = "https://eu1.locationiq.com/v1/search";

    //queryParams = queryParams.append("name", name);
    //queryParams = queryParams.append("count", 1);

    //const geocodingurl = "https://geocoding-api.open-meteo.com/v1/search";

    const test = this.http.get<any>(url, {params:queryParams});
    return test;
  }
}