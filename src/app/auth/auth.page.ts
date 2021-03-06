import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() { }
  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl.create({ keyboardClose: true, message: 'Loggin in' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/discover');
        }, 1000);
      });
  }
  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    if (this.isLogin) {
      // send a request to login server
    } else {
      // send a request to signup server
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData);
      });
    }
  }
}
