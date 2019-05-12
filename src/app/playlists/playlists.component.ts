import { Component, OnInit } from '@angular/core';
import {Playlists} from './playlists';
import { PlaylistsService } from './playlists.service';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
    playlists:Playlists[] = [];
    service:PlaylistsService;
    constructor(service:PlaylistsService) {}

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

}
