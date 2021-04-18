import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ISport } from '../sport';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  constructor(private http: HttpClient) { }

  //img_url:https://images.unsplash.com/photo-1488474739786-757973c2dff6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=958&q=80
  getSportData(){
    
    return this.http.get('http://localhost:3000/sports').pipe(map((res:any)=>{
      return res;
    }));
  }
}
