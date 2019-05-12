import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Playlists} from './playlists'


@Injectable()
export class PlaylistsService{
    
    constructor(private http: HttpClient) {}

    searchTracks(name:string): Observable<Playlists[]> {
        return this.http
            .get<Playlists[]>("http://localhost:8088/create")
            .catch(this.handleError);
    }

    getAllPlaylists(): Observable<Playlists[]>{
        return this.http.get<Playlists[]>("http://localhost:8088/playlists")
            .catch(this.handleError);
    }


    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}