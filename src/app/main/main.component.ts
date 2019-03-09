import { Component, OnInit } from '@angular/core';
import {CurrentbookmarksService} from '../currentbookmarks.service';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {UsernameService} from '../username.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	username:string;
  password:string;
	noOfBookmarks:number;
  loginVisibility:boolean;  
	subscription:Subscription;
  apiURL:string;

  	constructor(private bookmarkservice : CurrentbookmarksService, private http: HttpClient, private usernameservice: UsernameService) { 
  		this.username = "NewUser";
  		this.noOfBookmarks = 0;
      this.showLoginDetails();
      this.apiURL = "https://depploy.herokuapp.com/";
  		this.bookmarkservice.getBookmark().subscribe(bookmark =>this.noOfBookmarks=bookmark.length);
      
  	}	

  	ngOnDestroy(){
  		this.subscription.unsubscribe();
  	}


  	ngOnInit() {
      
  	}

    showLoginDetails(){
      this.loginVisibility = true;      
    }

    hideLoginDetails(){
      this.loginVisibility = false;   
    }

    sendAuth(username:string,password:string){
      this.http.post(this.apiURL+'user/auth',{"name":username,"pass":password},{responseType: 'text'})
      .subscribe((response)=>{
        console.log(response);
        if (response == 'Yes'){
            this.hideLoginDetails();
            this.username = username;
            this.usernameservice.broadcastUsername(this.username);
            this.http.post(this.apiURL+'user/activateUser',{"name":username})
            .subscribe((response)=>{
              console.log(response);
            });
        }
      },(err)=>console.log(err));
    }

    addUser(username:string,password:string){
      var userExist:string;
      userExist = 'true';
      this.http.post(this.apiURL+'user/doesUserExist',{"name":username},{responseType: 'text'})
      .subscribe((response)=>{
          console.log('Response '+response);
          if (response == 'No')
            userExist = 'false';
          else
            userExist = 'true'; 
          if (userExist == 'false'){
                console.log('enteredss')
                  this.http.post(this.apiURL+'user/addUser',{"name":username,"pass":password,"status":'active'},{responseType: 'text'})
                    .subscribe((response)=>{
                      if (response == 'User added'){
                          this.hideLoginDetails();
                          this.username = username;
                          this.usernameservice.broadcastUsername(this.username);
                      }
            });
      }           
      });
    }

    logUserOut(){
      console.log('entered');
      this.http.post(this.apiURL+'user/logUserOut',{"name":this.username})
      .subscribe((user)=>{
        console.log(user)});
        this.username = "NewUser";
        this.usernameservice.broadcastUsername(this.username);
        this.showLoginDetails();
    }

}
