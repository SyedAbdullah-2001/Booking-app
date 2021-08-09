import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOffersPageRoutingModule } from './edit-offers-routing.module';

import { EditOffersPage } from './edit-offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOffersPageRoutingModule
  ],
  declarations: [EditOffersPage]
})
export class EditOffersPageModule {}
