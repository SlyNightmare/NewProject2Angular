import { Component, OnInit } from '@angular/core';
import {Playlists} from '../../models/playlists.model';
import { PlaylistsService } from '../../services/playlists.service';
import { Tracks } from '../../models/tracks.model';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {
    
    playlists:Playlists[];
    track: Tracks[];
    public tracks: Tracks = new Tracks(0, '', '', '', '', 0);
    public trackData: Tracks = new Tracks(0, '', '', '', '', 0);

    constructor(private playlistService:PlaylistsService) {}

    

  

  performSearch(name:string) {
    this.playlistService.searchTracks(name).subscribe(
      data =>{
        this.track = data;
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


  public findTracks(): void{
    this.playlistService.findTracks(this.tracks).subscribe(
      data => this.trackData = data,
      error => {
        this.trackData = null;

      }
    );
  }

}
