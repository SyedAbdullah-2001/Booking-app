/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, NavController } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[];
  constructor(private placesService: PlacesService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.offers = this.placesService.places;
  }
  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate([`places/offers/edit-offers`, offerId]);
    console.log('Editing item', offerId);
  }
}
