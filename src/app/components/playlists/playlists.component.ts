import { Component, OnInit } from '@angular/core';
import {Playlists} from '../../models/playlists.model';
import { PlaylistsService } from '../../services/playlists.service';
import { Tracks } from '../../models/tracks.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
    
    playlists:Playlists[];
    track: Tracks = {
      name: '',
      artist: '',
      album: ''
    }
    
    constructor(private playlistService:PlaylistsService) {}

  ngOnInit() {
  }

  performSearch(name:string) {
    this.playlistService.searchTracks(name).subscribe(
      successfulResponseBody=>{
        this.playlists=successfulResponseBody;
      },
      error=>{
        console.log(error);
      }
    )
  }

  searchForTrack(): void{
    this.playlistService.getAllPlaylists().subscribe((playlistData) => {
      this.playlists = playlistData
      console.log(playlistData)
    }, (error) =>{
      console.log(error);
    });
  }

}
