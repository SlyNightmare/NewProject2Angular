import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlists:Playlist[] = [];
  constructor(service:PlaylistService) { }
  
  performSearch(name:String){
    service.searchPlaylists(name).subscribe(
      successfulResponseBody=>{
        playlist=successfulResponseBody;
      }
      error=>{
        console.log(error);
      }
    )
  }
  ngOnInit() {
  }

}
