import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Ob";
import 'rxjs/Rx';

import {Playlists} from './playlists'


@Injectable()
export class PlaylistsService{
    
    constructor(private http: HttpClient) {}

    searchPlaylists(name:string): Observable<Playlists[]> {
        return this.http.get<Playlists[]>("http://localhost:8088/playlists/${name});
    }
}