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

  	constructor(private bookmarkservice : CurrentbookmarksService, private http: HttpClient, private usernameservice: UsernameService) { 
  		this.username = "NewUser";
  		this.noOfBookmarks = 0;
      this.showLoginDetails();
  		this.bookmarkservice.getBookmark().subscribe(bookmark =>this.noOfBookmarks=bookmark.length);
      this.http.get('http://localhost:8000/user/getActiveUser',{responseType: 'text'})
                    .subscribe((response)=>{
                      if (response != 'No Active User'){
                          this.hideLoginDetails();
                          this.username = response;
                          this.usernameservice.broadcastUsername(this.username);
                      }});
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
      this.http.post('http://localhost:8000/user/auth',{"name":username,"pass":password},{responseType: 'text'})
      .subscribe((response)=>{
        console.log(response);
        if (response == 'Yes'){
            this.hideLoginDetails();
            this.username = username;
            this.usernameservice.broadcastUsername(this.username);
            this.http.post('http://localhost:8000/user/activateUser',{"name":username})
            .subscribe((response)=>{
              console.log(response);
            });
        }
      },(err)=>console.log(err));
    }

    addUser(username:string,password:string){
      var userExist:string;
      userExist = 'true';
      this.http.post('http://localhost:8000/user/doesUserExist',{"name":username},{responseType: 'text'})
      .subscribe((response)=>{
          console.log('Response '+response);
          if (response == 'No')
            userExist = 'false';
          else
            userExist = 'true'; 
          if (userExist == 'false'){
                console.log('enteredss')
                  this.http.post('http://localhost:8000/user/addUser',{"name":username,"pass":password,"status":'active'},{responseType: 'text'})
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
      this.http.post('http://localhost:8000/user/logUserOut',{"name":this.username})
      .subscribe((user)=>{
        console.log(user)});
        this.username = "NewUser";
        this.usernameservice.broadcastUsername(this.username);
        this.showLoginDetails();
    }

}
