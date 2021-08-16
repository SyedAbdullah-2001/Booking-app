/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { bookings } from './bookings.model';

@Injectable({ providedIn: 'root' })
export class BookingsService {
    private _bookings: bookings[] = [
        {
            id: 'xyz',
            placeId: 'Makkah',
            userId: 'abc',
            placeTitle: 'Makkah',
            guests: 9
        }
    ];

    get bookings() {
        return [...this._bookings];
    }
}
