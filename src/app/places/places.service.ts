/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { delay, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'Makkah',
      'Makkah',
      '10 Days umrah package',
      'https://www.arabianbusiness.com/public/images/2020/08/03/Hajj-pilgrims-prayer-makkah-5.jpg',
      3670.0,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'Madinah',
      'Madinah Al Munawarah',
      '12 Days package',
      'https://funci.org/wp-content/uploads/2015/06/madinah-al-munawara-1024x473.jpg',
      2999.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'Makkah-Madinah',
      'Makkah / Madinah',
      '20 Days package',
      'https://travelforumrah.co.uk/blog/wp-content/uploads/2018/02/Virtues-of-Makkah-and-Madinah.jpg',
      83578.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }
  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => ({ ...places.find((p) => p.id === id) })));
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://www.arabianbusiness.com/public/images/2020/08/03/Hajj-pilgrims-prayer-makkah-5.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    // console.log(newPlace);
    this.places.pipe(take(1), delay(5000), tap(places => {
        this._places.next(places.concat(newPlace));
    }));
  }
}
