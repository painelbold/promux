import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../model/user';
import { AuthServiceProvider } from '../auth-service/auth-service';
@Injectable()
export class UserDataProvider {
  private PATH='user-data/';

  constructor(private db: AngularFireDatabase,
              private authService: AuthServiceProvider) {

    }

  saveUserData(user: User){
    return new Promise((resolve, reject) => {
      if(user.key){
        this.db.list(this.PATH)
        .update(user.key, user)
        .then(() => resolve())
        .catch((e) => reject(e))
      }
      else{
        this.db.database
        .ref(this.PATH + this.authService.getLoggedUser().uid)
        .set({ fullName: user.fullName || '',
               email: user.email || '',
               dateOfBirth: user.dateOfBirth || '',
               completeProfile: user.completeProfile || false,
               key: this.authService.getLoggedUser().uid
             })
      }
    });
  }

  getUserData(){
    return this.db.object(this.PATH + this.authService.getLoggedUser().uid)
    .snapshotChanges()
    .map(u =>{
      return { key: u.key, ...u.payload.val()};
    });
  }

}
