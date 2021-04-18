import { Component, OnInit } from '@angular/core';
import { INews } from './news'
import { NewsService } from '../../../shared/services/newsService/news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsList : INews[] = []
  article : INews;
  constructor(private serv:NewsService) { }

  ngOnInit(): void {
    //this.newsList = this.newsService.getnews()
    //this.article = this.serv.getArticle()
    this.getNews();
    //this.getArticle(this.newsList[0].url);
    //this.article=this.newsList[0];
  }

  getNews(){
    this.serv.getNews().subscribe((res:any)=>{
      /*this.newsList[0]=res[0];
      this.newsList[1]=res[1];
      this.newsList[2]=res[2];*/
      

      this.newsList=res;
      this.article=this.newsList[0];
    });
  }

  redirectToNews(url: string){
    console.log(url)
    window.open(url, "_blank")
  }
  /*getArticle(url){
    this.serv.getArticle(url).subscribe((res:any)=>{
      this.article=res;
    });
  }*/

}
