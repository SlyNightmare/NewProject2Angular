//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


// Routing
import { AppRoutingModule }  from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';


//Http Client
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Services
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistsService } from './services/playlists.service';
import { TracksComponent } from './tracks/tracks.component';
import { PlaylistCreateComponent } from './playlist-create/playlist-create.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    PlaylistsComponent,
    TracksComponent,
    PlaylistCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PlaylistsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
