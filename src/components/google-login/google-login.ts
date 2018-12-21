import { Component } from "@angular/core";
import { GooglePlus } from "@ionic-native/google-plus";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { NavController, Platform, Loading, LoadingController, ToastController } from "ionic-angular";
import { Observable } from "rxjs";

import { User } from "../../model/user";
import { RegisterComplementPage } from "../../pages/account/register-complement/register-complement";
import { UserDataProvider } from "../../providers/user-data/user-data";

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "google-login",
  templateUrl: "google-login.html"
})
export class GoogleLoginComponent {
  user: Observable<firebase.User>;
  loading: Loading;

  constructor(
    private afAuth: AngularFireAuth,
    private gPlus: GooglePlus,
    private platform: Platform,
    private udProvider: UserDataProvider,
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.user = this.afAuth.authState;
  }

  googleLogin() {
    this.createLoading("Entrando na conta...", 10000);

    if (this.platform.is("cordova")) this.nativeGoogleLogin();
    else this.webGoogleLogin();
  }

  async nativeGoogleLogin() {
    try {
      const gPlusUser = await this.gPlus.login({
        webClientId:
          "782758598685-3dp6hqphnv1mu7052vop4armj1m7g5ta.apps.googleusercontent.com",
        offline: true,
        scopes: "profile email"
      });

      return await this.afAuth.auth
        .signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken)
        )
        .then(res => {
          this.loading.dismiss();
          this.checkUser(res);
        });
    } catch (err) {
      this.loading.dismiss();
      this.createToast("Erro ao entrar na conta.", 2000);
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.loading.dismiss();
          this.checkUser(res);
        });
    } catch (err) {
      this.loading.dismiss();
      this.createToast("Erro ao entrar na conta.", 2000);
      console.log(err);
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is("cordova")) {
      this.gPlus.logout();
    }
  }

  async checkUser(user: any) {
    const ud = this.udProvider.getUserData().subscribe(u => {
      ud.unsubscribe();

      if (!u.key) {
        this.nav.setRoot(RegisterComplementPage, {
          user: user.user
        });
      }
    });
  }

  createLoading(msg: string, duration: number) {
    this.loading = this.loadingCtrl.create({
      content: msg,
      duration: duration
    });
    this.loading.present();
  }

  createToast(msg: string, duration: number) {
    this.toastCtrl
      .create({
        message: msg,
        duration: duration,
        position: "bottom"
      })
      .present();
  }
}
