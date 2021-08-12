/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  constructor(private router: Router, private navctrl: NavController) {}

  ngOnInit() {}

  onBookPlace() {
    // this.router.navigateByUrl('places/discover');
    this.navctrl.navigateBack('/places/discover');
    // this.navctrl.pop();
  }
}
