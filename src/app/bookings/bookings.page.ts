import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { bookings } from './bookings.model';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings: bookings[];
  constructor(private bookingService: BookingsService) { }

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings;
  }
  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    // cancel with the id offerId
  }
}
