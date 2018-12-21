import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Job } from "../../../model/job";
import {
  PersonEyeColor,
  PersonGender,
  PersonHairColor,
  PersonSkinColor
} from "../../../model/modelAttributes";
import { ValidaCadastroProvider } from "../../../providers/valida-cadastro/valida-cadastro";

@IonicPage()
@Component({
  selector: "page-plan-step2",
  templateUrl: "plan-step2.html"
})
export class PlanStep2Page {
  step2Form: FormGroup;
  job: Job;

  skinColors: Array<{ name: string; value: PersonSkinColor }>;
  eyeColors: Array<{ name: string; value: PersonEyeColor }>;
  genders: Array<{ name: string; value: PersonGender }>;
  hairColors: Array<{ name: string; value: PersonHairColor }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private cadastro: ValidaCadastroProvider
  ) {
    this.job = JSON.parse(localStorage.getItem("job"));
    this.createForm();
    this.populateSelects();
  }

  ionViewDidLoad() {}

  submitStep2() {
    this.updateJobData();
    this.cadastro.setEnableStep1(false);
    this.cadastro.setEnableStep2(false);
    this.cadastro.setEnableStep3(true);
    localStorage.setItem("job", JSON.stringify(this.job));
    this.navCtrl.parent.select(2);
  }

  createForm() {
    this.step2Form = this.formBuilder.group({
      numPeople: new FormControl(this.job.numPeople || "", [
        Validators.required
      ]),
      gender: new FormControl(this.job.gender || "", [Validators.required]),
      hairColor: new FormControl(this.job.hairColor || "", [
        Validators.required
      ]),
      eyeColor: new FormControl(this.job.eyeColor || "", [Validators.required]),
      skinColor: new FormControl(this.job.skinColor || "", [
        Validators.required
      ])
    });
  }

  populateSelects() {
    this.skinColors = [
      { name: "Indiferente", value: PersonSkinColor.Indiferente },
      { name: "Asiatica", value: PersonSkinColor.Asiatica },
      { name: "Branca", value: PersonSkinColor.Branca },
      { name: "Indígena", value: PersonSkinColor.Indigena },
      { name: "Negra", value: PersonSkinColor.Negra },
      { name: "Parda", value: PersonSkinColor.Parda }
    ];

    this.eyeColors = [
      { name: "Indiferente", value: PersonEyeColor.Indiferente },
      { name: "Azul", value: PersonEyeColor.Azul },
      { name: "Castanho", value: PersonEyeColor.Castanho },
      { name: "Mel", value: PersonEyeColor.Mel },
      { name: "Preto", value: PersonEyeColor.Preto },
      { name: "Verde", value: PersonEyeColor.Verde }
    ];

    this.genders = [
      { name: "Indiferente", value: PersonGender.Indiferente },
      { name: "Feminino", value: PersonGender.Feminino },
      { name: "Masculino", value: PersonGender.Masculino }
    ];

    this.hairColors = [
      { name: "Indiferente", value: PersonHairColor.Indiferente },
      { name: "Castanho", value: PersonHairColor.Castanho },
      { name: "Loiro", value: PersonHairColor.Loiro },
      { name: "Ruivo", value: PersonHairColor.Ruivo },
      { name: "Preto", value: PersonHairColor.Preto }
    ];
  }

  returnStep1() {
    this.updateJobData();
    this.cadastro.setEnableStep1(true);
    this.cadastro.setEnableStep2(false);
    localStorage.setItem("job", JSON.stringify(this.job));
    this.navCtrl.parent.select(0);
  }

  updateJobData() {
    let formValues = this.step2Form.value;

    this.job.numPeople = formValues.numPeople;
    this.job.gender = formValues.gender;
    this.job.eyeColor = formValues.eyeColor;
    this.job.skinColor = formValues.skinColor;
    this.job.hairColor = formValues.hairColor;
  }
}
