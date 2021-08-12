/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Makkah',
      '10 Days umrah package',
      'https://www.arabianbusiness.com/public/images/2020/08/03/Hajj-pilgrims-prayer-makkah-5.jpg',
      3670.0
    ),
    new Place(
      'p2',
      'Madinah Al Munawarah',
      '12 Days package',
      'https://funci.org/wp-content/uploads/2015/06/madinah-al-munawara-1024x473.jpg',
      2999.99
    ),
    new Place(
      'p3',
      'Makkah / Madinah',
      '20 Days package',
      'https://travelforumrah.co.uk/blog/wp-content/uploads/2018/02/Virtues-of-Makkah-and-Madinah.jpg',
      83578.99
    ),
  ];

  get places() {
    return [...this._places];
  }
  constructor() {}

  getPlace(id: string) {
    return { ...this._places.find((p) => p.id === id) };
  }
}
