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

import { Company } from "../../../model/company";
import { User } from "../../../model/user";
import { UserDataProvider } from "../../../providers/user-data/user-data";
import { HomePage } from "../../home/home";
import { JobType } from "./../../../model/job";
import { PersonSkinColor, PersonEyeColor, PersonGender, PersonHairColor } from "../../../model/modelAttributes";

@IonicPage()
@Component({
  selector: "page-my-profile",
  templateUrl: "my-profile.html"
})
export class MyProfilePage {
  userType: any;
  uid: string;
  loggedUser: any;
  userForm: FormGroup;
  companyForm: FormGroup;
  maxDate: any;
  loading: Loading;

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
    this.populateSelects();
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

      udSubscribe.unsubscribe();
    });
  }

  saveData(form: FormGroup) {
    let user: any;
    let formValues = form.value;

    if (this.userType == 0) {
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
      user.haircolor = formValues.hairColor;
      user.completeProfile = true;
    } else if (this.userType == 1) {
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
    this.jobPreferences = [
      { name: "Bandeirada", value: JobType.Bandeirada, checked: false },
      { name: "Blitz", value: JobType.Blitz , checked: false },
      { name: "Book Fotográfico", value: JobType.BookFotografico , checked: false },
      { name: "Carro de Som", value: JobType.CarroDeSom , checked: false },
      { name: "Degustação", value: JobType.Degustacao , checked: false },
      { name: "Distribuição de Brindes", value: JobType.DistribuicaoDeBrindes , checked: false },
      { name: "Equipe de Massoterapia", value: JobType.EquipeDeMassoterapia , checked: false },
      { name: "Figurante para TV", value: JobType.FiguranteParaTV , checked: false },
      { name: "Gravação de Spot", value: JobType.GravacaoDeSpot , checked: false },
      { name: "Modelos", value: JobType.Modelos , checked: false },
      { name: "Receptivo", value: JobType.Receptivo , checked: false },
      { name: "Repositores", value: JobType.Repositores , checked: false },
      { name: "Panfletagem", value: JobType.Panfletagem , checked: false },
      { name: "Vitrine Viva", value: JobType.VitrineViva , checked: false },
    ]

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
