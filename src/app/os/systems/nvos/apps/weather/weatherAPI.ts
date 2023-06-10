import { Utils } from "../../../../../utils/NVUtils";


export function getUrl(name: string, params: Array<String | Number>) {
    switch(name) {
        case "weather":
            let Time = new Date();
            return "https://api.open-meteo.com/v1/forecast?latitude=" + params[0] + "&longitude=" + params[1] + "&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,precipitation,weathercode,surface_pressure,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,apparent_temperature_max,precipitation_probability_max,windspeed_10m_max,apparent_temperature_min,precipitation_sum,precipitation_hours,windspeed_10m_max&timeformat=unixtime&timezone=auto&start_date=" + Time.getFullYear() + "-" + Utils.addZeros(Time.getMonth() + 1) + "-" + Utils.addZeros(Time.getDate()) + "&end_date=" + Time.getFullYear() + "-" + Utils.addZeros(Time.getMonth() + 1) + "-" + Utils.addZeros(Time.getDate() + 3);
        case "search":
            return "https://geocoding-api.open-meteo.com/v1/search?name=" + params[0];

    }
    return "";
}

