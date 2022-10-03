export interface OpenMeteo {
    latitude: number;
    longitude: number;
    current_weather: CurrentWeatherInformation; 
}
export interface CurrentWeatherInformation {
    time: string;
    temperature: number;
    windspeed: number;
    winddirection: number;
}
export interface GeocodingPain {
    [index: number]: Results; 
}
export interface Results {
    lat: string,
    long: string
}