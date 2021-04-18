import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  getImages(){
    return this.http.get('http://localhost:3000/news/img').pipe(map((res:any) => {
        //console.log(res);
        // sort, filter, modify data
        return res;
      }));
  }
}
