import { Component, OnInit } from '@angular/core';
import {Playlists} from './playlists';
import { PlaylistsService } from './playlists.service';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
    
    playlists:Playlists[];
    
    constructor(private service:PlaylistsService) {}

  ngOnInit() {
  }

  performSearch(name:string) {
    this.service.searchTracks(name).subscribe(
      successfulResponseBody=>{
        this.playlists=successfulResponseBody;
      },
      error=>{
        console.log(error);
      }
    )
  }

  searchForPlaylist(): void{
    this.service.getAllPlaylists().subscribe((playlistData) => {
      this.playlists = playlistData
      console.log(playlistData)
    }, (error) =>{
      console.log(error);
    });
  }

}
