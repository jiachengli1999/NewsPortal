import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
@ViewChild('map')
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
