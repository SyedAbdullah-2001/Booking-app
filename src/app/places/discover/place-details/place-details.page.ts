/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from 'src/app/bookings/bookings.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';


@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private navctrl: NavController,
    private loadingCtrl: LoadingController,
    private placeService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }
  place: any;
  isBookable = false;
  isLoading = false;
  private placesub: Subscription;
  ngOnInit() {
    this.isLoading = true;
    const placeId = this.route.snapshot.paramMap.get('id');
    this.placesub = this.placeService.getPlace(placeId)
      .subscribe(place => {
        this.place = place;
        this.isLoading = false;
        this.isBookable = place.userId !== this.authService.userId;
      }, error => {
        this.alertCtrl.create({
          header: 'An error',
          message: 'Could not load place.',
          buttons: [{
            text: 'Okay',
            handler: () => this.router.navigate(['/places/discover'])
          }
          ]
        }).then(alertEl => alertEl.present());
      });
  }
  ngOnDestroy() {
    // if (this.placesub) {
    //   this.placesub.unsubscribe();
    // }
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navctrl.navigateBack('/places/discover');
        return;
      }
      this.placesub = this.placeService
        .getPlace(paramMap.get('placeId'))
        .subscribe(place => {
          this.place = place;
          this.isBookable = place.userId !== this.authService.userId;
        });
    });
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
        // console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          return this.loadingCtrl.create({ message: 'Booking places...' })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }
};
