import { Component } from "@angular/core";
import { GooglePlus } from "@ionic-native/google-plus";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Platform } from "ionic-angular";
import { Observable } from "rxjs";

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

  constructor(
    private afAuth: AngularFireAuth,
    private gPlus: GooglePlus,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState;
  }

  googleLogin() {
    if (this.platform.is("cordova")) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin() {
    try {
      const gPlusUser = await this.gPlus.login({
        webClientId:
          "782758598685-3dp6hqphnv1mu7052vop4armj1m7g5ta.apps.googleusercontent.com",
        offline: true,
        scopes: "profile email"
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }

  signOut(){
    this.afAuth.auth.signOut();
    if(this.platform.is('cordova')){
      this.gPlus.logout();
    }
  }
}
