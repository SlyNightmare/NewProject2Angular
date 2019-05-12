import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Playlists} from '../models/playlists.model'


@Injectable()
export class PlaylistsService{
    
    constructor(private http: HttpClient) {}

    searchTracks(name:string): Observable<Playlists[]> {
        return this.http
            .get<Playlists[]>("${{MUSIC_URL}}/playlists/update")
            .catch(this.handleError);
    }

    getAllPlaylists(): Observable<Playlists[]>{
        return this.http.get<Playlists[]>("${{MUSIC_URL}}/playlists")
            .catch(this.handleError);
    }

    createPlaylist(playlist: Playlists): Observable<any> {
        return this.http.post<any>("${{MUSIC_URL}}/playlists/create", playlist);
    }


    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}