import { Injectable } from "@angular/core";

export interface CurrentWeatherInformation {
    time: string;
    temperature: number;
    windspeed: number;
    winddirection: number;
}

export interface OpenMeteo {
    latitude: number;
    longitude: number;
    current_weather: CurrentWeatherInformation; 
}
