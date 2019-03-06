import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {Bookmark} from './bookmark';

@Injectable({
  providedIn: 'root'
})
export class CurrentbookmarksService {

  private subject = new Subject<Bookmark[]>();
  
  sendBookmark(bookmark:Bookmark[]){
  	this.subject.next(bookmark);
  }
  
  clearBookmark(){
  	this.subject.next();
  }

  getBookmark():Observable<Bookmark[]>{
  	return this.subject.asObservable();
  }

}
