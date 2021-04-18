import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment'

const appid = environment.key

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }
  getWeather(city: string) : Observable<any>{
    console.log(city)
    // let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${appid}&units=imperial`
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${appid}&cnt=5`
    return this.http.get(url)
      .pipe(map((res:any) => {
        console.log('here')
        return res;
      }));
    
  }
}
