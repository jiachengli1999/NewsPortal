import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WeatherComponent } from './components/homeComponents/weather/weather.component';
import { NewsComponent } from './components/homeComponents/news/news.component';
import { GalleryComponent } from './components/homeComponents/gallery/gallery.component';
import { ChatboxComponent } from './components/homeComponents/chatbox/chatbox.component';
import { SportComponent } from './components/sport/sport.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/homeComponents/home/home.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Truncate } from './shared/pipes/trunc.pipe';

const config: SocketIoConfig={url:'ws://localhost:3000',options:{}};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WeatherComponent,
    NewsComponent,
    GalleryComponent,
    ChatboxComponent,
    SportComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    Truncate
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
