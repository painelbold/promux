import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  ToastController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterPage } from "../register/register";
import { HomePage } from "../../home/home";
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private asProvider: AuthServiceProvider
  ) {
    this.createForm();
  }

  ionViewDidLoad() {}

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

  doLogin() {
    this.createLoading("Acessando a conta...", 10000);

    this.asProvider.doLogin(this.loginForm.value)
    .then(() => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    })
    .catch((error) => {
      this.loading.dismiss();
      this.getErrorMsg(error.code);
    })
  }

  doFacebookLogin(){

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

  getErrorMsg(errorCode: any){
    switch(errorCode){
      case "auth/invalid-email":
      this.createToast("O e-mail inserido não é válido.", 2000);
      break;
      case "auth/user-disabled":
      this.createToast("O usuário está desabilitado.", 2000);
      break;
      case "auth/user-not-found":
      this.createToast("Usuário não encontrado.", 2000);
      break;
      case "auth/wrong-password":
      this.createToast("E-mail ou senha incorretos.", 2000);
      break;
      default:
      this.createToast("Erro: " + errorCode, 2000)
      break;
    }
  }
}
