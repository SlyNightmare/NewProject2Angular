import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main',  component: MainComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'all',  component: AllComponent },
  { path: 'find',  component: FindComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}