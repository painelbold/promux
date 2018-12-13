import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthServiceProvider {

  constructor(
    // private firebaseService: FirebaseService
    private angularFireAuth: AngularFireAuth,
    ){}

  getLoggedUser(){
      return this.angularFireAuth.auth.currentUser;
  }

  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          // this.firebaseService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
}
