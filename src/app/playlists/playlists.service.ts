import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import {Playlists} from './playlists'


@Injectable()
export class PlaylistsService{
    
    constructor(private http: HttpClient) {}

    searchPlaylists(name:string): Observable<Playlists[]> {
        return this.http
            .get<Playlists[]>("http://localhost:8088/playlists/${name}")
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}