import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: FourOFourComponent }
];
