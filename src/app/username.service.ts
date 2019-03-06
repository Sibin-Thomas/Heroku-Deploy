import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {
	private subject = new Subject<string>();

	broadcastUsername(username:string){
		this.subject.next(username);
	}

	getUsername():Observable<string>{
		return this.subject.asObservable();
	}
}
