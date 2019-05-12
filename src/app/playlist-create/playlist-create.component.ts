import { Component, OnInit } from '@angular/core';
import { Playlists } from '../models/playlists.model';

@Component({
  selector: 'app-playlist-create',
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.css']
})
export class PlaylistCreateComponent implements OnInit {

  playlist: Playlists = {
    name: ""
  }
  constructor() {}

  ngOnInit() {
  }

}
