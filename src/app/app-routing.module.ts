import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./modules/firestore/firestore.module').then(m => m.FirestoreModule) // Angular 9 syntax . https://next.angular.io/guide/deprecations#loadChildren
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
