import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { LogoutComponent } from './logout/logout.component';
import { SongsearchComponent } from './songsearch/songsearch.component';



export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main',  component: MainComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'playlists', component:PlaylistsComponent},
  { path: 'logout', component:LogoutComponent},
  { path: 'songsearch', component:SongsearchComponent}
  
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}