import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
//import { IArticle } from '../article';
import { INews } from '../../../components/homeComponents/news/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(){
    return this.http.get('http://localhost:3000/news').pipe(map((res:any)=>{
      return res;
    }));
  }

  getArticle(url){
    /*const article : IArticle = {
      title: 'Three Life Lessons From a Dying Man',
      author: 'Aaron Nichols',
      date: 'Dec 24, 2020',
      description: "One of my favorite jokes I’ve ever heard was delivered to me by a terminally ill man. He knew I was looking for a serving job, \
        so I could quit as a retirement home night-cook and go back to school. “I was looking in the classifieds today,” he said. “I saw something that would be perfect for you. \
        The pay isn’t great, but the tips are huge!” “Oh yeah, Hank? What job?” \n\n \
        “Circumcising elephants at the Denver Zoo!” Hank said, proceeding to cackle until his hacking cough came back. After the fit, his wife \
        pleasantly chastised him for being crass, and my half-hour lunch break was over. \n\n \
        Hank would be dead of lung cancer within a month. He was one of many people that I got to know (and lost) in my time working in a retirement home. \
        Being so close to death, in many ways, taught me to live. I had left my dishwashing job at this same retirement home after graduating high \
        school in the fall of 2011, and by January 2012, I was back, after dropping out of college. \n\n \
        As a dishwasher, I never really talked to the residents. However, the competence of a monkey’s foot can get you promoted out of \
        dishwashing, so it wasn’t long before I was promoted to cook. \
        That’s when I met Hank. Hank had been a B-17 tail gunner in World War II, at a time when the survival rate for pilots was roughly  \
        one in three (according to him). He told me story after story during the many lunch breaks I ate in his apartment. He showed me the \
        “emergency kit” he was given in the war, for the worst-case scenario of being shot down in combat (It was essentially cigarettes and a light snack). \
        He had a catchphrase that he said over and over “I’ve got a million stories, and some of them are even true.” Some of them \
        were very much not true, like when he swore up and down that the Germans shot green and red anti-aircraft shells at his plane on Christmas day. \
        For the short time I knew him, he was my hero. He made me want to have stories, to forget some of the amazing things that  \
        I had experienced because I had experienced too much to remember. \n\n \
        He inspired me to leave that job and look for something more flexible so that I could go back to school. \
        He inspired me to travel."
    }*/
    return this.http.get(url).pipe(map((res:any)=>{
      return res;
    }));
    //return article;
  }
}
