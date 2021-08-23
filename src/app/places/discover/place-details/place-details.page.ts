/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private navctrl: NavController, private placeService: PlacesService, private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController) { }
  place: Place;
  private placesub: Subscription;
  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('id');
    this.placesub = this.placeService.getPlace(placeId).subscribe(place => {
      this.place = place;
    });
  }
  ngOnDestroy() {
    if (this.placesub) {
      this.placesub.unsubscribe();
    }
  }

  onBookPlace() {
    // this.router.navigateByUrl('places/discover');
    // this.navctrl.navigateBack('/places/discover');
    // this.navctrl.pop();
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
    console.log(this.place);
  }
  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
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
