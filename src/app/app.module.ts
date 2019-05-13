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
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { PlaylistsService } from './services/playlists.service';
import { PlaylistCreateComponent } from './components/playlist-create/playlist-create.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    PlaylistsComponent,
    PlaylistCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PlaylistsService,
  LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
