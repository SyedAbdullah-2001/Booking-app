/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: any;
  placeId;
  private placeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.placeId = this.route.snapshot.paramMap.get('placeId');
    this.placeSub = this.placesService.getPlace(this.placeId).subscribe(place => {
      this.place = place;
    });
    // this.route.paramMap.subscribe((paramMap) => {
    //   if (!paramMap.has('placeId')) {
    //     this.navCtrl.navigateBack('places/offers');
    //     return;
    //   }
    // });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
