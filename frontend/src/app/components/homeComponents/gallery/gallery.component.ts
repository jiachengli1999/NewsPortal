import { Component, OnInit } from '@angular/core';
import { IGallery } from './gallery'
import { GalleryService } from '../../../shared/services/galleryService/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  imgList : IGallery[] = []
  constructor(private serv:GalleryService) { }

  ngOnInit(): void {
    this.imgList = [
      {
        img_url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
        title: 'image 1',
        description: 'dsadsadsadsa',
        active: true
      },
      {
        img_url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
        title: 'image 2',
        description: 'some news',
        active: false
      },
      {
        img_url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
        title: 'image 3',
        description: 'some news',
        active: false
      }
    ]

    this.getImages();

  }

  getImages(){
    this.serv.getImages().subscribe((res:any)=>{
      //console.log(res);
      this.imgList[0]={active:true, title:res[0].title, img_url:res[0].img_url, description:res[0].description};
      //console.log(res[0].img_url);
      this.imgList[1]={active:false, title:res[1].title, img_url:res[1].img_url, description:res[1].description};
      //console.log(res[1].img_url);
      this.imgList[2]={active:false, title:res[2].title, img_url:res[2].img_url, description:res[2].description};
      //console.log(res[2].img_url);
    });
  }
}
