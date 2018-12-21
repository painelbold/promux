import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

import { Company } from '../../model/company';
import { IUser } from '../../model/IUser';
import { User } from '../../model/user';
import { AuthServiceProvider } from '../auth-service/auth-service';

@Injectable()
export class UserDataProvider {
  private PATH = "user-data/";

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthServiceProvider
  ) {}

  saveUserData(user: IUser) {
    return new Promise((resolve, reject) => {
      user.dateCreated = firebase.database.ServerValue.TIMESTAMP;

      if (user.key) {
        this.db
          .list(this.PATH)
          .update(user.key, user)
          .then(() => resolve())
          .catch(e => reject(e));
      } else {
        if (user instanceof User) {
          this.db.database
            .ref(this.PATH + this.authService.getLoggedUser().uid)
            .set({
              fullName: user.fullName || "",
              email: user.email || "",
              dateOfBirth: user.dateOfBirth || "",
              completeProfile: false,
              key: this.authService.getLoggedUser().uid,
              type: user.type || 0
            })
            .then(res => resolve(res), err => reject(err));
        } else if (user instanceof Company) {
          this.db.database
            .ref(this.PATH + this.authService.getLoggedUser().uid)
            .set({
              fullName: user.fullName || "",
              email: user.email || "",
              cnpj: user.cnpj || "",
              completeProfile: false,
              key: this.authService.getLoggedUser().uid,
              type: user.type || 1
            })
            .then(res => resolve(res), err => reject(err));
        }
      }
    });
  }

  getUserData() {
    return this.db
      .object(this.PATH + this.authService.getLoggedUser().uid)
      .snapshotChanges()
      .map(u => {
        return { key: u.key, ...u.payload.val() };
      });
  }
}
