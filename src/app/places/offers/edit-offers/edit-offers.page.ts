import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.page.html',
  styleUrls: ['./edit-offers.page.scss'],
})
export class EditOffersPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  private placeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
      });
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
