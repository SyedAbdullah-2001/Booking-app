/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  private placesSub: Subscription;
  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }
  onFilterUpdate(event: any) {
    console.log(event.detail);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
  // navigateToDetail() {
  //   this.router.navigateByUrl('/places/discover/place-details');
  // }
}
