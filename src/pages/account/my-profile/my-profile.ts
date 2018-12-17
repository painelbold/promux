import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { UserDataProvider } from '../../../providers/user-data/user-data';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IUser } from '../../../model/IUser';
import { User } from '../../../model/user';
import { Company } from '../../../model/company';
import { HomePage } from '../../home/home';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  userType: any;
  uid: string;
  loggedUser: any;
  userForm: FormGroup;
  companyForm: FormGroup;
  maxDate: any;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public udProvider: UserDataProvider,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder) {
      this.getLoggedUser();
      this.validateMinDate();
  }

  validateMinDate() {
    let today: Date = new Date();
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    ).toISOString();
  }

  getLoggedUser() {
    this.createLoading("Recuperando dados do usuário...", 10000);

    const udSubscribe = this.udProvider.getUserData()
      .subscribe(user => {
        this.loading.dismiss();

        this.loggedUser = user;
        this.userType = this.loggedUser.type;

        this.createForms();

        udSubscribe.unsubscribe();
      });
  }

  saveData(form: FormGroup){
    let user: any;
    let formValues = form.value

    if(this.userType == 0){
      this.createLoading("Salvando dados do usuário...", 10000);

      user = new User(formValues.fullName, this.loggedUser.email, formValues.dateOfBirth);
      user.key = this.loggedUser.key;
      user.gender = formValues.gender;
      user.height = formValues.height;
      user.weight = formValues.weight;
      user.skinColor = formValues.skinColor;
      user.eyeColor = formValues.eyeColor;
      user.haircolor = formValues.hairColor;
      user.completeProfile = true;
    }
    else if(this.userType == 1){
      this.createLoading("Salvando dados da empresa...", 10000);

      user = new Company(formValues.fullName, this.loggedUser.email, formValues.cnpj);
      user.key = this.loggedUser.key;
      user.responsible = formValues.responsible;
      user.completeProfile = true;
    }

    console.log(user);

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

  ionViewDidLoad() {
  }

  createForms(){
    this.userForm = this.formBuilder.group({
      fullName: [this.loggedUser.fullName],
      gender: [this.loggedUser.gender],
      height: [this.loggedUser.height],
      weight: [this.loggedUser.weight],
      skinColor: [this.loggedUser.skinColor],
      eyeColor: [this.loggedUser.eyeColor],
      hairColor: [this.loggedUser.hairColor],
      dateOfBirth: [this.loggedUser.dateOfBirth]
    })

    this.companyForm = this.formBuilder.group({
      fullName: [this.loggedUser.fullName],
      cnpj: [this.loggedUser.cnpj],
      responsible: [this.loggedUser.responsible]
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
