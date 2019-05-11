import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistService {

  constructor() { 
    @Injectable()
    export class PlaylistService {
      constructor(http:HttpClient){}

      search Playlists(name:string): Observable<Playlist[]> {
        return this.http.get<Playlists>("https://localhost:8088/playlists");
      }
    }
  }

}
