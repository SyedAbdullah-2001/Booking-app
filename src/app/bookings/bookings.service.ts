/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Booking } from './bookings.model';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface BookingData {
    guestNumbers: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    BookedTo: string;
    bookedFrom: string;
    firstName: string;
    lastName: string;
    placeId: string;
    placeImage: string;
    placeTitle: string;
    userId: string;

}
@Injectable({ providedIn: 'root' })
export class BookingService {
    private _bookings = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        return this._bookings.asObservable();
    }
    constructor(private authService: AuthService, private http: HttpClient) { }

    addBooking(
        placeId: string,
        placeTitle: string,
        placeImage: string,
        firstName: string,
        lastName: string,
        guestNumbers: number,
        dateFrom: Date,
        dateTo: Date
    ) {
        let generatedId: string;
        const newBooking = new Booking(
            Math.random().toString(),
            placeId,
            this.authService.userId,
            placeTitle,
            placeImage,
            firstName,
            lastName,
            guestNumbers,
            dateFrom,
            dateTo
        );
        return this.http
            .post<{ name: string }>(
                'https://booking-app-3e0e1-default-rtdb.firebaseio.com/bookings.json',
                { ...newBooking, id: null }
            )
            .pipe(
                switchMap(resData => {
                    generatedId = resData.name;
                    return this.bookings;
                }),
                take(1),
                tap(bookings => {
                    newBooking.id = generatedId;
                    this._bookings.next(bookings.concat(newBooking));
                })
            );
    };
    cancelBooking(bookingId: string) {
        return this.http.delete(
            `https://booking-app-3e0e1-default-rtdb.firebaseio.com/bookings/${bookingId}.json`
        ).pipe(switchMap(() => this.bookings),
            take(1),
            tap(bookings => {
                this._bookings.next(bookings.filter(b => b.id !== bookingId));
            })
        );
        // return this.bookings.pipe(
        //     take(1),
        //     delay(1000),
        //     tap(bookings => {
        //         this._bookings.next(bookings.filter(b => b.id !== bookingId));
        //     })
        // );
    }

    fetchBookings() {
        return this.http.get<{ [key: string]: BookingData }>
            (`https://booking-app-3e0e1-default-rtdb.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId
                }"`
            ).pipe(map(bookingData => {
                const bookings = [];
                for (const key in bookingData) {
                    if (bookingData.hasOwnProperty(key)) {
                        bookings.push(new Booking(
                            key,
                            bookingData[key].placeId,
                            bookingData[key].userId,
                            bookingData[key].placeTitle,
                            bookingData[key].placeImage,
                            bookingData[key].firstName,
                            bookingData[key].lastName,
                            bookingData[key].guestNumbers,
                            new Date(bookingData[key].bookedFrom),
                            new Date(bookingData[key].BookedTo)
                        ));
                    }
                }
                return bookings;
            }),
                tap(bookings => {
                    this._bookings.next(bookings);
                }
                )
            );
    }
}
