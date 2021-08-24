/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placeSub: Subscription;
  constructor(private placesService: PlacesService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    // this.offers = this.placesService.places;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.placeSub = this.placesService.places.subscribe(Places => {
      this.offers = Places;
    });
  }
  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate([`edit-offers/`, offerId]);
    console.log('Editing item', offerId);
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
