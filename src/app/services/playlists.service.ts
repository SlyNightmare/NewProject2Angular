import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Playlists} from '../models/playlists.model'
import { MUSIC_URL } from "../../environments/environment";
import { Tracks } from "../models/tracks.model";


@Injectable()
export class PlaylistsService{
    
    constructor(private http: HttpClient) {}

    searchTracks(name:string): Observable<Tracks[]> {
        return this.http
            .get<Tracks[]>(`${MUSIC_URL}/music/getsong/${name}`)
            .catch(this.handleError);
    }
    
    findTracks(track: Tracks): Observable<Tracks> {
        return this.http.post(`{MUSIC_URL}/find`, track).catch(this.handleError);
    }

    getAllPlaylists(): Observable<Playlists[]>{
        return this.http.get<Playlists[]>(`${MUSIC_URL}/music/playlists`)
            .catch(this.handleError);
    }

    createPlaylist(playlist: Playlists): Observable<any> {
        return this.http.post<any>(`${MUSIC_URL}/music/playlists/create`, playlist);
    }


    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }
}