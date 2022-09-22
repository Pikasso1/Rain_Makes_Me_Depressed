import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from "rxjs"
import { map } from "rxjs/operators"
import { CurrentWeatherInformation, OpenMeteo } from "./weather-information"

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
    this.requester.getData().subscribe(response =>{
      this.weatherInfo.latitude = response.latitude;
      this.weatherInfo.longitude = response.longitude;
      this.weatherInfo.current_weather = response.current_weather;
      
      console.log(this.weatherInfo);
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetRequestService {
  constructor(private http: HttpClient) {}

  public getData(): Observable<OpenMeteo> {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true';
    return this.http.get<OpenMeteo>(url);
  }
}
