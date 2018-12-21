import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

import { Company } from '../../../model/company';
import { PersonEyeColor, PersonGender, PersonHairColor, PersonSkinColor } from '../../../model/modelAttributes';
import { User } from '../../../model/user';
import { UserDataProvider } from '../../../providers/user-data/user-data';
import { HomePage } from '../../home/home';
import { JobType } from './../../../model/job';
import { UserType } from '../../../model/IUser';

@IonicPage()
@Component({
  selector: "page-my-profile",
  templateUrl: "my-profile.html"
})
export class MyProfilePage {
  loggedUser: any;
  userForm: FormGroup;
  companyForm: FormGroup;
  maxDate: any;
  loading: Loading;
  userType: any;

  jobPreferences: Array<{ name: string; value: JobType; checked: boolean }>;
  skinColors: Array<{ name: string; value: PersonSkinColor }>;
  eyeColors: Array<{ name: string; value: PersonEyeColor }>;
  genders: Array<{ name: string; value: PersonGender }>;
  hairColors: Array<{ name: string; value: PersonHairColor }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public udProvider: UserDataProvider,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder
  ) {
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

  ionViewDidLoad() {}

  getLoggedUser() {
    this.createLoading("Recuperando dados do usuário...", 10000);

    const udSubscribe = this.udProvider.getUserData().subscribe(user => {
      this.loading.dismiss();

      this.loggedUser = user;
      this.userType = this.loggedUser.type;

      this.createForms();
      this.populateSelects();

      udSubscribe.unsubscribe();
    });
  }

  saveData(form: FormGroup) {
    let user: any;
    let formValues = form.value;

    if (this.loggedUser.type == 0) {
      this.createLoading("Salvando dados do usuário...", 10000);

      user = new User(
        formValues.fullName,
        this.loggedUser.email,
        formValues.dateOfBirth
      );
      user.key = this.loggedUser.key;
      user.gender = formValues.gender;
      user.height = formValues.height;
      user.weight = formValues.weight;
      user.skinColor = formValues.skinColor;
      user.eyeColor = formValues.eyeColor;
      user.hairColor = formValues.hairColor;
      user.completeProfile = true;
      user.jobPreferences = [];

      this.jobPreferences.forEach(jobPref =>{
        if(jobPref.checked)
        user.jobPreferences.push(jobPref.value);
      });

    } else if (this.loggedUser.type == 1) {
      this.createLoading("Salvando dados da empresa...", 10000);

      user = new Company(
        formValues.fullName,
        this.loggedUser.email,
        formValues.cnpj
      );
      user.key = this.loggedUser.key;
      user.responsible = formValues.responsible;
      user.completeProfile = true;
    }

    console.log(user);

    this.udProvider
      .saveUserData(user)
      .then(() => {
        this.loading.dismiss();

        this.createToast("Dados salvos com sucesso!", 2000);
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        this.loading.dismiss();

        this.createToast("Erro ao salvar dados.", 2000);
      });
  }

  createForms() {
    this.userForm = this.formBuilder.group({
      fullName: [this.loggedUser.fullName],
      gender: [this.loggedUser.gender],
      height: [this.loggedUser.height],
      weight: [this.loggedUser.weight],
      skinColor: [this.loggedUser.skinColor],
      eyeColor: [this.loggedUser.eyeColor],
      hairColor: [this.loggedUser.hairColor],
      dateOfBirth: [this.loggedUser.dateOfBirth]
    });

    this.companyForm = this.formBuilder.group({
      fullName: [this.loggedUser.fullName],
      cnpj: [this.loggedUser.cnpj],
      responsible: [this.loggedUser.responsible]
    });
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

  populateSelects() {
      let jobPreferences = this.loggedUser.jobPreferences;

      if(this.loggedUser.completeProfile){
        this.jobPreferences = [
          { name: "Bandeirada", value: JobType.Bandeirada, checked: jobPreferences.indexOf(JobType.Bandeirada) != -1 },
          { name: "Blitz", value: JobType.Blitz , checked: jobPreferences.indexOf(JobType.Blitz) != -1 },
          { name: "Book Fotográfico", value: JobType.BookFotografico , checked: jobPreferences.indexOf(JobType.BookFotografico) != -1 },
          { name: "Carro de Som", value: JobType.CarroDeSom , checked: jobPreferences.indexOf(JobType.CarroDeSom) != -1 },
          { name: "Degustação", value: JobType.Degustacao , checked: jobPreferences.indexOf(JobType.Degustacao) != -1 },
          { name: "Distribuição de Brindes", value: JobType.DistribuicaoDeBrindes , checked: jobPreferences.indexOf(JobType.DistribuicaoDeBrindes) != -1 },
          { name: "Equipe de Massoterapia", value: JobType.EquipeDeMassoterapia , checked: jobPreferences.indexOf(JobType.EquipeDeMassoterapia) != -1 },
          { name: "Figurante para TV", value: JobType.FiguranteParaTV , checked: jobPreferences.indexOf(JobType.FiguranteParaTV) != -1 },
          { name: "Gravação de Spot", value: JobType.GravacaoDeSpot , checked: jobPreferences.indexOf(JobType.GravacaoDeSpot) != -1 },
          { name: "Modelos", value: JobType.Modelos , checked: jobPreferences.indexOf(JobType.Modelos) != -1 },
          { name: "Receptivo", value: JobType.Receptivo , checked: jobPreferences.indexOf(JobType.Receptivo) != -1 },
          { name: "Repositores", value: JobType.Repositores , checked: jobPreferences.indexOf(JobType.Repositores) != -1 },
          { name: "Panfletagem", value: JobType.Panfletagem , checked: jobPreferences.indexOf(JobType.Panfletagem) != -1 },
          { name: "Vitrine Viva", value: JobType.VitrineViva , checked: jobPreferences.indexOf(JobType.VitrineViva) != -1 },
        ];
    }
    else{
      this.jobPreferences = [
        { name: "Bandeirada", value: JobType.Bandeirada, checked: true },
        { name: "Blitz", value: JobType.Blitz , checked: true },
        { name: "Book Fotográfico", value: JobType.BookFotografico , checked: true },
        { name: "Carro de Som", value: JobType.CarroDeSom , checked: true },
        { name: "Degustação", value: JobType.Degustacao , checked: true },
        { name: "Distribuição de Brindes", value: JobType.DistribuicaoDeBrindes , checked: true },
        { name: "Equipe de Massoterapia", value: JobType.EquipeDeMassoterapia , checked: true },
        { name: "Figurante para TV", value: JobType.FiguranteParaTV , checked: true },
        { name: "Gravação de Spot", value: JobType.GravacaoDeSpot , checked: true },
        { name: "Modelos", value: JobType.Modelos , checked: true },
        { name: "Receptivo", value: JobType.Receptivo , checked: true },
        { name: "Repositores", value: JobType.Repositores , checked: true },
        { name: "Panfletagem", value: JobType.Panfletagem , checked: true },
        { name: "Vitrine Viva", value: JobType.VitrineViva , checked: true },
      ]
    }

      this.skinColors = [
        { name: "Asiatica", value: PersonSkinColor.Asiatica },
        { name: "Branca", value: PersonSkinColor.Branca },
        { name: "Indígena", value: PersonSkinColor.Indigena },
        { name: "Negra", value: PersonSkinColor.Negra },
        { name: "Parda", value: PersonSkinColor.Parda }
      ];

      this.eyeColors = [
        { name: "Azul", value: PersonEyeColor.Azul },
        { name: "Castanho", value: PersonEyeColor.Castanho },
        { name: "Mel", value: PersonEyeColor.Mel },
        { name: "Preto", value: PersonEyeColor.Preto },
        { name: "Verde", value: PersonEyeColor.Verde }
      ];

      this.genders = [
        { name: "Feminino", value: PersonGender.Feminino },
        { name: "Masculino", value: PersonGender.Masculino }
      ];

      this.hairColors = [
        { name: "Castanho", value: PersonHairColor.Castanho },
        { name: "Loiro", value: PersonHairColor.Loiro },
        { name: "Ruivo", value: PersonHairColor.Ruivo },
        { name: "Preto", value: PersonHairColor.Preto }
      ];
  }
}
