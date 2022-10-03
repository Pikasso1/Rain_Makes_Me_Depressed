import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs"
import { Results, GeocodingPain, OpenMeteo } from "./weather-information"
import { FormControl } from '@angular/forms'; //fuck you, break everything like a fucking dipshit

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {
  weatherInfo: OpenMeteo;

  constructor(private requester: GetRequestService) { 
    this.weatherInfo = {} as OpenMeteo;
  }
  
  ngOnInit(): void {
    this.requester.getWeatherData("Berlin").subscribe(response =>{
      this.weatherInfo.latitude = response.latitude;
      this.weatherInfo.longitude = response.longitude;
      this.weatherInfo.current_weather = response.current_weather;
      
      console.log(this.weatherInfo);
    })

    
  }
  ngAfterViewChecked(): void {
    var compass = document.querySelector("#windArrow") as HTMLElement | null;
    if(compass != null){
      compass.style.transform = 'rotate(' + this.weatherInfo.current_weather.winddirection + 'deg)';
    }

    var box = document.querySelector("#animejsBox");
    console.log(box);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetRequestService {
  location: GeocodingPain;
  coordinates: Results;

  constructor(private http: HttpClient) {
    this.location = {} as GeocodingPain;
    this.coordinates = {} as Results;
  }

  public getWeatherData(name: string): Observable<OpenMeteo> {
    let lat = 0;
    let long = 0;

    //here
    //getCoordinates() => lat long

    let queryParams = new HttpParams();
    queryParams = queryParams.append("latitude", 50);
    queryParams = queryParams.append("longitude", 50);
    queryParams = queryParams = queryParams.append("current_weather",true);

    const url = "https://api.open-meteo.com/v1/forecast";
    const test = this.http.get<OpenMeteo>(url, {params:queryParams});
    console.log(test);
    return test;
  }

  public getCoordinates(name: string): Observable<GeocodingPain> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", name);
    queryParams = queryParams.append("count", 1);

    const url = "https://geocoding-api.open-meteo.com/v1/search";

    const test = this.http.get<GeocodingPain>(url, {params:queryParams});
    console.log(test);
    return test;
  }
}