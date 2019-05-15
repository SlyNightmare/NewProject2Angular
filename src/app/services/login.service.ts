import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MUSIC_URL } from '../../environments/environment';

@Injectable()
export class LoginService {

    constructor(private http:HttpClient) {}

    public login(username:string, password:String): Observable<Account> {
        return this.http.post(`${MUSIC_URL}/account/login`, [username, password]).catch(this.handleError);
    }

    
    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}