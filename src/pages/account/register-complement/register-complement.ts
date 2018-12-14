import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../../model/user';
import { Company } from '../../../model/company';
import { UserDataProvider } from '../../../providers/user-data/user-data';
import { HomePage } from '../../home/home';

/**
 * Generated class for the RegisterComplementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-complement',
  templateUrl: 'register-complement.html',
})
export class RegisterComplementPage {
  complementForm: FormGroup;
  maxDate: any;
  userType: any;
  user: any;
  registerUserForm: FormGroup;
  registerCompanyForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private udProvider: UserDataProvider,
    private toastCtrl: ToastController) {
      this.user = this.navParams.get("user");
      console.log(this.user);
      this.validateMinDate();
      this.createForms();
      this.userType = 0;
  }

  validateMinDate() {
    let today: Date = new Date();
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    ).toISOString();
  }

  ionViewDidLoad() {
  }

  createForms() {
    this.registerUserForm = this.formBuilder.group({
      fullName: [this.user.displayName],
      email: [this.user.email],
      dateOfBirth: [""],
    });

    this.registerCompanyForm = this.formBuilder.group({
      fullName: [this.user.displayName],
      email: [this.user.email],
      cnpj: [""],
    });
  }

  doRegisterUser(form: FormGroup){
    let user: any;
    let formValues = form.value;

    if (this.userType == 0) {
      this.createLoading("Salvando dados do usuário...", 10000);

      user = new User(
        formValues.fullName,
        formValues.email,
        formValues.dateOfBirth
      );

      console.log(user);
    } else if (this.userType == 1) {
      this.createLoading("Salvando dados da empresa...", 10000);

      user = new Company(
        formValues.fullName,
        formValues.email,
        formValues.cnpj
      );
    }

    this.udProvider.saveUserData(user)
    .then(() => {
      this.loading.dismiss();

      this.createToast("Dados salvos com sucesso!", 2000);
      this.navCtrl.setRoot(HomePage);
    })
    .catch(err =>{
      this.loading.dismiss();

      this.createToast("Erro ao salvar dados.", 2000)
    })

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
}
