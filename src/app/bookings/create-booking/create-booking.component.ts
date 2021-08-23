/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input('selectedPlace') selectedPlace: Place;
  @ViewChild('form', { static: true }) form: NgForm;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // console.log(this.selectedPlace);
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'Cancel');
  }
  onBookPlace() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss({
      bookingData: {
        firstName: this.form.value['first-name'],
        lastName: this.form.value['last-name'],
        guestNumbers: this.form.value['guest-numbers'],
        startDate: this.form.value['date-from'],
        endDate: this.form.value['date-to']
      }
    }, 'confirm');
  }
}
