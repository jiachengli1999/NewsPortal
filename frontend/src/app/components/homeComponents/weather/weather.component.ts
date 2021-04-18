import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { WeatherService } from '../../../shared/services/weatherService/weather.service';
import { IWeather } from './weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city = ''
  weather = 'Cloudy'
  weatherIcon = 'http://openweathermap.org/img/w/04d.png'
  temperature = 65.4
  apiRetrieved = false 
  selectLocationForm : any
  weathers : any[] = []
  msg = "Enter a location to check weather data"

  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.selectLocationForm = this.fb.group({
      city: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
    // if (navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition((position) =>{
    //     console.log('getting locaiton')
    //     this.weatherService.getWeather(position.coords.latitude, position.coords.longitude)
    //     .subscribe((res:any) => {
    //       console.log('got data from api')
    //       this.city = res.timezone
    //       this.weather = res.current.weather[0].main
    //       this.weatherIcon = 'http://openweathermap.org/img/w/' + res.current.weather[0].icon +'.png'
    //       this.temperature = res.current.temp
    //       console.log('icon:', this.weatherIcon)
    //     })
    //   });
    // }
    // else{
    //   console.log('failed to get locaiton')
    // }
  }

  searchLocation(){
    this.weathers = []
    console.log(this.selectLocationForm.value.city)
    this.weatherService.getWeather(this.selectLocationForm.value.city)
      .subscribe((res:any) => {
        console.log(res)
        for (let i=0; i < res.list.length; i++){
          let obj = { 
            weather: res.list[i].weather[0].main,
            icon: 'http://openweathermap.org/img/w/'+ res.list[i].weather[0].icon +'.png',
            temperature: res.list[i].main.temp,
            date: res.list[i].dt_txt,
            time: res.list[i].dt_txt
          }
          console.log(obj.icon)
          this.weathers.push(obj)
        }
        this.city = res.city.name + ", " + res.city.country
        this.msg = ''
        this.apiRetrieved = true
      }, (err: HttpErrorResponse) => {
        this.apiRetrieved = false
        this.city = ''
        this.msg = 'Please enter a valid city'
      })
    
  }

}
