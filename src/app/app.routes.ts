import { Routes } from '@angular/router';
import { Recommendations } from './recommendations/recommendations';

export const routes: Routes = [
  { path: '', component: Recommendations },
  { path: 'recommendations', component: Recommendations }
];
