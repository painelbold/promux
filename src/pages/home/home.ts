import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  loggedUser: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
