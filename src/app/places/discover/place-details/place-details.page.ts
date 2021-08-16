/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  constructor(private route: ActivatedRoute, private navctrl: NavController, private placeService: PlacesService, private modalCtrl: ModalController) { }
  place: Place;
  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('id');
    this.place = this.placeService.getPlace(placeId);
  }

  onBookPlace() {
    // this.router.navigateByUrl('places/discover');
    // this.navctrl.navigateBack('/places/discover');
    // this.navctrl.pop();
    console.log(this.place);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.data === 'confirm') {
          console.log('Booked');
        }
      });
  }
};
