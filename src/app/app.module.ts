import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BookmarksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
