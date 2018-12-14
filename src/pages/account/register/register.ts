import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  Loading
} from "ionic-angular";
import { FormGroup, FormBuilder } from "@angular/forms";
import { User } from "../../../model/user";
import { UserDataProvider } from "../../../providers/user-data/user-data";
import { AuthServiceProvider } from "../../../providers/auth-service/auth-service";
import { HomePage } from "../../home/home";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  registerForm: FormGroup;
  maxDate: any;
  userType: any;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private udProvider: UserDataProvider,
    private asProvider: AuthServiceProvider
  ) {
    this.userType = 1;
    this.validateMinDate();
    this.createForm();
  }

  ionViewDidLoad() {}

  doRegister() {
    if (this.validatePassword()) {
      this.createLoading("Registrando usuário...", 10000);
      let formValues = this.registerForm.value;

      this.registerUser(formValues);
    } else {
      this.createToast("As senhas digitadas são diferentes.", 2000);
    }
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      fullName: [""],
      dateOfBirth: [""],
      email: [""],
      password: [""],
      confirmPassword: [""]
    });
  }

  validatePassword() {
    return (
      this.registerForm.value.password ===
      this.registerForm.value.confirmPassword
    );
  }

  registerUser(formValues: any) {
    let user: User = new User(
      formValues.fullName,
      formValues.email,
      formValues.dateOfBirth
    );

    this.asProvider
      .doRegister(formValues)
      .then((result: any) => {
        this.loading.dismiss();

        return this.saveUserData(user);
      })
      .then(() => {
        this.loading.dismiss();

        this.createToast("Usuário criado com sucesso!", 2000);
        this.navCtrl.setRoot(HomePage);
      })
      .catch(error => {
        this.loading.dismiss();

        this.getErrorMsg(error.code);
      });
  }

  saveUserData(user: User) {
    this.createLoading("Salvando dados do usuário...", 10000);

    this.udProvider.saveUserData(user);
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

  validateMinDate() {
    let today: Date = new Date();
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    ).toISOString();
    console.log(this.maxDate);
  }

  getErrorMsg(errorCode: any) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        this.createToast("O e-mail inserido já está em uso.", 2000);
        break;
      case "auth/invalid-email":
        this.createToast("O e-mail inserido é inválido.", 2000);
        break;
      case "auth/operation-not-allowed":
        this.createToast("A operação não é permitida.", 2000);
        break;
      case "auth/weak-password":
        this.createToast("A senha escolhida é fraca.", 2000);
        break;
      default:
        this.createToast("Erro ao registrar o usuário.", 2000);
        console.log("Erro ao registrar usuário: " + errorCode);
        break;
    }
  }

  teste(){
      console.log(this.userType);
      console.log(this.userType == 1);
  }
}
