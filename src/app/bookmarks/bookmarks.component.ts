import { Component, OnInit } from '@angular/core';
import {CurrentbookmarksService} from '../currentbookmarks.service';
import {Bookmark} from '../bookmark';
import {UsernameService} from "../username.service";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
	currentUser:string;
	bookmarks:Bookmark [];
	faltu:string;
	apiURL:string;
	constructor(private http: HttpClient, private bookmarkservice: CurrentbookmarksService, private usernameservice: UsernameService) {
		this.bookmarks = [];
		this.apiURL = "https://depploy.herokuapp.com/";
		this.usernameservice.getUsername().subscribe(username => {
			console.log('username service get');
			this.currentUser = username;
			this.http.post(this.apiURL+'bookmark/showBookmark',{'user':username})
				.subscribe((response)=>{
					this.bookmarks = [];
					var len = Object.keys(response).length;
					for(var i = 0; i < len; i++)
						this.bookmarks.push(new Bookmark(response[i].bookmarkUrl,response[i].bookmarkName,response[i].username));
					this.bookmarkservice.sendBookmark(this.bookmarks);
					}

				);
			}
		);
	}

	addBookmark(bookmark:string){
		var temp = bookmark.split("/")[2];
		this.http.post(this.apiURL+'bookmark/addBookmark',{"url":bookmark,"name":temp,"user":this.currentUser},{responseType:'text'})
		.subscribe((response)=>{
			console.log(response);
			this.bookmarks.push(new Bookmark(bookmark, temp,  this.currentUser));
			this.bookmarkservice.sendBookmark(this.bookmarks);
		});
	}

	removeBookmark(indexOfBookmarkArray:number){
		this.http.post(this.apiURL+'bookmark/removeBookmark',{"url":this.bookmarks[indexOfBookmarkArray].bookmarkUrl,"name":this.bookmarks[indexOfBookmarkArray].bookmarkName,"user":this.bookmarks[indexOfBookmarkArray].username},{responseType:'text'})
		.subscribe((response)=>{
			console.log(response);
			this.bookmarks.splice(indexOfBookmarkArray,1);
			console.log(this.bookmarks);
		});
	}

	ngOnInit() {
	}

}
