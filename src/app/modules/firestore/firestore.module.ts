import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirestoreRoutingModule } from './firestore-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [
    CommonModule,
    FirestoreRoutingModule,
    SharedModule
  ]
})
export class FirestoreModule { }
