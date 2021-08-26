/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// [
//   new Place(
//     'Makkah',
//     'Makkah',
//     '10 Days umrah package',
//     'https://www.arabianbusiness.com/public/images/2020/08/03/Hajj-pilgrims-prayer-makkah-5.jpg',
//     3670.0,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Place(
//     'Madinah',
//     'Madinah Al Munawarah',
//     '12 Days package',
//     'https://funci.org/wp-content/uploads/2015/06/madinah-al-munawara-1024x473.jpg',
//     2999.99,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Place(
//     'Makkah-Madinah',
//     'Makkah / Madinah',
//     '20 Days package',
//     'https://travelforumrah.co.uk/blog/wp-content/uploads/2018/02/Virtues-of-Makkah-and-Madinah.jpg',
//     83578.99,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
// ]

interface PLaceData {
  availabelFrom: string;
  availabelTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }
  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchPlaces() {
    return this.http.get<{ [key: string]: PLaceData }>('https://booking-app-3e0e1-default-rtdb.firebaseio.com/offered-places.json')
      .pipe(map(resData => {
        const places = [];
        console.log(resData);
        // eslint-disable-next-line guard-for-in
        for (const key in resData) {
          // console.log(key);
          if (resData.hasOwnProperty(key)) {
            // console.log(key);
            places.push(
              new Place(
                key,
                resData[key].title,
                resData[key].description,
                resData[key].imageUrl,
                resData[key].price,
                new Date(resData[key].availabelFrom),
                new Date(resData[key].availabelTo),
                resData[key].userId
              )
            );
          }
        }
        // console.log(places);
        return places;
        // return [];
      }),
        tap(offerPlace => {
          // console.log(offerPlace);
          this._places.next(offerPlace);
        })
      );
  }
  // getPlace(id: string) {
  //   return this.places.pipe(
  //     take(1),
  //     map(places => ({ ...places.find((p) => p.id === id) })));
  // }
  getPlace(id: string) {
    return this.http.get<any>(`https://booking-app-3e0e1-default-rtdb.firebaseio.com/offered-places/${id}.json`)
      .pipe(
        map(placeData => new Place(
          id,
          placeData.title,
          placeData.description,
          placeData.imageUrl,
          placeData.price,
          new Date(placeData.availabelFrom),
          new Date(placeData.availableTo),
          placeData.userId
        ))
      );
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
    let generatedId: string;
    return this.http.post<{ name: string }>('https://booking-app-3e0e1-default-rtdb.firebaseio.com/offered-places.json',
      { ...newPlace, id: null })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
    // console.log(newPlace);
    // return this.places.pipe(take(1), delay(1500), tap(places => {
    //   this._places.next(places.concat(newPlace));
    // })
    // );
  }
  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1), switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatePlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatePlaceIndex];
        updatedPlaces[updatePlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availabelFrom,
          oldPlace.availabelTo,
          oldPlace.userId
        );
        return this.http.put(`https://booking-app-3e0e1-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatePlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}

// return this.places.pipe(
//   take(1),
//   // delay(1500),
//   tap(places => {
//     const updatePlaceIndex = places.findIndex(pl => pl.id === placeId);
//     const updatedPlaces = [...places];
//     const oldPlace = updatedPlaces[updatePlaceIndex];
//     updatedPlaces[updatePlaceIndex] = new Place(
//       oldPlace.id,
//       title,
//       description,
//       oldPlace.imageUrl,
//       oldPlace.price,
//       oldPlace.availabelFrom,
//       oldPlace.availabelTo,
//       oldPlace.userId
//     );
//     this._places.next(updatedPlaces);
//   }));
