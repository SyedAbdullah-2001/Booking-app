/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place: Place;
  placeId;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.placeId = this.route.snapshot.paramMap.get('placeId');
    this.place = this.placesService.getPlace(this.placeId);
    // this.route.paramMap.subscribe((paramMap) => {
    //   if (!paramMap.has('placeId')) {
    //     this.navCtrl.navigateBack('places/offers');
    //     return;
    //   }
    // });
  }
}
