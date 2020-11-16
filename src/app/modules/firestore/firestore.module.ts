import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirestoreRoutingModule } from './firestore-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FirestoreRoutingModule
  ]
})
export class FirestoreModule { }
