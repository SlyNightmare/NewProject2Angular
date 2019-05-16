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
    
    playlists:Playlists[] = [];
    track: Tracks[];
    public tracks: Tracks = new Tracks(0, '', '', '', '', 0);
    public trackData: Tracks = new Tracks(0, '', '', '', '', 0);
    public playlistData: Playlists = new Playlists(0, '', 0);


    constructor(private playlistService:PlaylistsService) {}

    
    ngOnInit() {
      this.playlistService.getAllPlaylists(this.playlistData.accountId).subscribe(
        success => this.playlists = success
      )
    }

  

  performSearch(name:string) {
    this.playlistService.searchTracks(name).subscribe(
      data =>{
        this.track = data;
      },
      error=>{
        console.log(error);
      }
    );
  }



  getAllPlaylists(accountId:number): void{
    this.playlistService.getAllPlaylists(accountId).subscribe((playlistData) => {
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
