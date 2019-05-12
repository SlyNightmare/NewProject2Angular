import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tracks } from '../models/tracks.model';


@Injectable()
export class TracksService {

  constructor(private http: HttpClient) { }

  getTrack(track: Tracks): Observable<any> {
      return this.http.post<any>("${MUSIC_URL}/playlists/update", track)
  }
}