import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'recommendations', 
    async loadComponent() { 
      const recImport = await import("./recommendations/recommendations");
      return recImport.Recommendations; 
    }
  },
  { path: '**', redirectTo: '/recommendations'}
];
