import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { booking } from './bookings.model';
import { BookingService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: booking[];
  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) { }
  private bookingSub: Subscription;
  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });

  }
  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // cancel with the id offerId
    this.loadingCtrl.create({ message: ' Cancelling...' }).then(loadingEl => {
      loadingEl.present()
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }
  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
