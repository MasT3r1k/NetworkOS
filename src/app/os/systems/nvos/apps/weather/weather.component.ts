import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getUrl } from './weatherAPI';
import { City, WeatherDay, WeatherHour } from './weatherInterface';
import * as config from './weatherConfig';
import { Utils } from "../../../../../utils/NVUtils";
import { Processes } from '../../Process';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  declare city: City;
  time = Processes.processes['NetworkTime'];
  today: Date = new Date();
  declare search_cities: Array<City>;
  declare weatherDays: Array<WeatherDay>;
  declare weatherHours: Array<WeatherHour>;
  config = config;
  addZero = Utils.addZeros;

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): void {
    this.http.get(getUrl("weather", [lat, lon])).subscribe((data: any) => {
      console.log(data)
      this.weatherDays = [];
      this.weatherHours = [];
      for(let i = 0;i < data['daily']['time'].length;i++) {
        this.weatherDays.push({
          day: data['daily']['time'][i],
          maxWindSpeed: data['daily']['windspeed_10m_max'][i],
          maxWindSpeedUnit: data['daily_units']['windspeed_10m_max'],
          maxTemp: data['daily']['temperature_2m_max'][i],
          maxTempUnit: data['daily_units']['apparent_temperature_max'],
          minTemp: data['daily']['temperature_2m_min'][i],
          minTempUnit:data['daily_units']['apparent_temperature_min'],
          rainChance: data['daily']['precipitation_probability_max'][i],
          weatherCode: data['daily']['weathercode'][i],
          UVIndex: data['daily']['uv_index_max'][i]
        });
        for(let i2 = 0;i2 < 24;i2++) {
          this.weatherHours.push({
            day: i,
            time: data['hourly']['time'][i * 24 + i2],
            precipitation: data['hourly']['precipitation'][i * 24 + i2],
            precipitationUnit: data['hourly_units']['precipitation'],
            relativeHumidity: data['hourly']['relativehumidity_2m'][i * 24 + i2],
            relativeHumidityUnit: data['hourly_units']['relativehumidity_2m'],
            temperature: data['hourly']['temperature_2m'][i * 24 + i2],
            temperatureUnit: data['hourly_units']['temperature_2m'],
            windSpeed: data['hourly']['windspeed_10m'][i * 24 + i2],
            windSpeedUnit: data['hourly_units']['windspeed_10m'],
            weatherCode: data['hourly']['weathercode'][i * 24 + i2]
          });
        }
      }

      this.today = new Date(this.weatherDays[0]['day'] * 1000);
      console.table(this.weatherDays, ["day", "maxWindSpeed", "maxTemp", "minTemp", "rainChance", "UVIndex", "weatherCode"])
      console.table(this.weatherHours, ["day", "precipitation", "relativehumidity", "temperature", "windspeed", "weathercode"])
    })
  }

  searchCity(event: KeyboardEvent) {
    setTimeout(() => { // To show the original value
      let value = (<HTMLInputElement>event.target).value;
      this.http.get(getUrl("search", [value])).subscribe((data: any) => {
        this.search_cities = [];

        if (data.generationtime_ms > 100) return console.log("Zásilka s městy (" + value + ") trvala příliš dlouho. Nebyla zpracována.");
        if (data.results) {
          for(let i = 0;i < data.results.length;i++) {
            this.search_cities.push({
              name: data.results[i]['name'],
              timezone: data.results[i]['timezone'],
              latitude: data.results[i]['latitude'],
              longitude: data.results[i]['longitude'],
              elevation: data.results[i]['elevation'],
              country: data.results[i]['country'],
              country_code: data.results[i]['country_code']
            })
          }
        }
      })
    }, 1)
  }


  showCity(id: number) {
    console.log(id)
    this.city = this.search_cities[id];
    this.getWeather(this.city.latitude, this.city.longitude);
    this.search_cities = [];
  }

}
