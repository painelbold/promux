import { Component } from "@angular/core";
import { Facebook } from "@ionic-native/facebook";
import * as firebase from 'firebase/app'
import { UserDataProvider } from "../../providers/user-data/user-data";
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { RegisterComplementPage } from "../../pages/account/register-complement/register-complement";

@Component({
  selector: "facebook-login",
  templateUrl: "facebook-login.html"
})
export class FacebookLoginComponent {
  loading: Loading;

  constructor(
    public facebook: Facebook,
    private udProvider: UserDataProvider,
    private nav: NavController,
    private loadingCtrl: LoadingController
    ) {}

  async doFacebookLogin() {
    return await this.facebook
      .login(["email"])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );

        firebase
          .auth()
          .signInWithCredential(facebookCredential)
          .then(success => {
            this.checkUser(success);
            console.log("Firebase success: " + JSON.stringify(success));
            console.log(success);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async checkUser(user: any) {
    this.createLoading("Carregando dados do usuário...", 10000)
    const ud = this.udProvider.getUserData().subscribe(u => {
      this.loading.dismiss();
      ud.unsubscribe();

      if (!u.key) {
        this.nav.setRoot(RegisterComplementPage, {
          user: user
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
}
