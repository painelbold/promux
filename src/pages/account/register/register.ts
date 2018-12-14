import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { User } from "../../../model/user";
import { AuthServiceProvider } from "../../../providers/auth-service/auth-service";
import { UserDataProvider } from "../../../providers/user-data/user-data";
import { UserType, IUser } from "../../../model/IUser";
import { Company } from "../../../model/company";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  registerUserForm: FormGroup;
  registerCompanyForm: FormGroup;
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
    this.userType = UserType.PessoaFisica;
    this.validateMinDate();
    this.createForms();
  }

  ionViewDidLoad() {}

  doRegisterUser(form: FormGroup) {
    let formValues = form.value;

    if (this.validatePassword(formValues)) this.registerUser(formValues);
    else this.createToast("As senhas digitadas são diferentes.", 2000);
  }

  createForms() {
    this.registerUserForm = this.formBuilder.group({
      fullName: [""],
      dateOfBirth: [""],
      email: [""],
      password: [""],
      confirmPassword: [""]
    });

    this.registerCompanyForm = this.formBuilder.group({
      fullName: [""],
      email: [""],
      cnpj: [""],
      password: [""],
      confirmPassword: [""]
    });
  }

  validatePassword(formValue: any) {
    return formValue.password === formValue.confirmPassword;
  }

  registerUser(formValues: any) {
    let user: any;

    if (this.userType == 0) {
      this.createLoading("Registrando usuário...", 10000);

      user = new User(
        formValues.fullName,
        formValues.email,
        formValues.dateOfBirth
      );
    } else if (this.userType == 1) {
      this.createLoading("Registrando empresa...", 10000);

      user = new Company(
        formValues.fullName,
        formValues.email,
        formValues.cnpj
      );
    }

    this.asProvider
      .doRegister(formValues)
      .then((result: any) => {
        this.loading.dismiss();
        console.log(result);

        return this.saveUserData(user);
      })
      .then(() => {
        this.loading.dismiss();

        this.createToast("Usuário criado com sucesso!", 2000);
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
}
