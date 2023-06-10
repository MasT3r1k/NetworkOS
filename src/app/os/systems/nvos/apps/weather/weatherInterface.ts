import { Time } from '@angular/common';

export interface City {
    name: string;
    timezone: string;
    latitude: number;
    longitude: number;
    elevation: number;
    country: string;
    country_code: string;
}

export interface WeatherDay {
    day: number;
    maxWindSpeed: number;
    maxWindSpeedUnit: string;
    maxTemp: number;
    maxTempUnit: string;
    minTemp: number;
    minTempUnit: string;
    rainChance: number;
    weatherCode: number;
    UVIndex: number;
}

export interface WeatherHour {
    day: number;
    time: Time;
    precipitation: number;
    precipitationUnit: string;
    relativeHumidity: number;
    relativeHumidityUnit: string;
    temperature: number;
    temperatureUnit: string;
    windSpeed: number;
    windSpeedUnit: string;
    weatherCode: number;
}