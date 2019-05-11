import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PlaylistsService {

  constructor(http:HttpClient) { }

  search Playlists(name:String): Observable<Playlist[]> {
    return this.http.get<Playlists>("http://localhost:8088/playlists")
  }
}
