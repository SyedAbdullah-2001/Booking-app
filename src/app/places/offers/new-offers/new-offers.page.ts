import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.page.html',
  styleUrls: ['./new-offers.page.scss'],
})
export class NewOffersPage implements OnInit {
  form: FormGroup;
  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.placesService.addPlace(
      this.form.value.title,
      this.form.value.description,
      +this.form.value.price,
      (this.form.value.dateFrom),
      (this.form.value.dateTo)
    );
    this.form.reset();
    this.router.navigate(['places/offers']);
  }

}
