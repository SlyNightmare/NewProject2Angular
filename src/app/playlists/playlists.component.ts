import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists:Playlist[] = [];
  constructor(service:PlaylistService) { }

  performSearch(name:String){
    service.serachPlaylists(name).subscribe(
      successfulResponseBody=>{
        playlist=successfulResponseBody;
      }
      error=> {
        console.log(error);
      }
    )
  }

  ngOnInit() {
  }

}
