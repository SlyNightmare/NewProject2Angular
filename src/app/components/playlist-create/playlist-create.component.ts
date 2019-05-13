import { Component, OnInit } from '@angular/core';
import { Playlists } from '../../models/playlists.model';
import { PlaylistsService } from '../../services/playlists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-create',
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.css']
})
export class PlaylistCreateComponent implements OnInit {

  playlist: Playlists;
  
  constructor(private playlistService: PlaylistsService, private router: Router) {}

  ngOnInit() {
  }

  createPlaylist(){
    this.playlistService.createPlaylist(this.playlist).subscribe(
      success => {
        this.router.navigate(["/someendpoint"]);
      }
    )
  }

}
