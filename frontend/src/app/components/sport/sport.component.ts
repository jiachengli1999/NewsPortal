import { Component, OnInit } from '@angular/core';
import { SportService } from './service/sport.service';
import { ISport } from './sport';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  newsList : ISport[] = []
  constructor(private sportService : SportService) { }

  ngOnInit(): void {
    this.sportService.getSportData().subscribe((res:any)=>{
      console.log(res)
      this.newsList=res;
    });
  }

  redirect(url){
    window.open(url, "_blank")
  }
}
