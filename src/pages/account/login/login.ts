import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterPage } from '../register/register';
import { HomePage } from "../../home/home";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ionViewDidLoad() {
  }

  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  resetPassword() {}

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      stayConnected: [true]
    });
  }

  doLogin(){
    console.log(this.loginForm.value);
    this.navCtrl.setRoot(HomePage);
  }
}
