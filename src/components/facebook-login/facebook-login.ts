import { Component } from "@angular/core";
import { Facebook } from "@ionic-native/facebook";
import firebase from "firebase";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { NavController } from "ionic-angular";
import { RegisterComplementPage } from "../../pages/account/register-complement/register-complement";

@Component({
  selector: "facebook-login",
  templateUrl: "facebook-login.html"
})
export class FacebookLoginComponent {
  constructor(
    public facebook: Facebook,
    private udProvider: UserDataProvider,
    private nav: NavController,
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
    const ud = this.udProvider.getUserData().subscribe(u => {
      ud.unsubscribe();

      if (!u.key) {
        this.nav.setRoot(RegisterComplementPage, {
          user: user
        });
      }
    });
  }
}
