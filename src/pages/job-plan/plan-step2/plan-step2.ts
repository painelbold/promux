import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Job } from "../../../model/job";
import { ValidaCadastroProvider } from '../../../providers/valida-cadastro/valida-cadastro';
import {
  PersonEyeColor,
  PersonGender,
  PersonHairColor,
  PersonSkinColor
} from "../../../model/modelAttributes";

@IonicPage()
@Component({
  selector: "page-plan-step2",
  templateUrl: "plan-step2.html"
})
export class PlanStep2Page {
  step2Form: FormGroup;
  job: any;

  skinColors: Array<{ name: string; value: PersonSkinColor }>;
  eyeColors: Array<{ name: string; value: PersonEyeColor }>;
  genders: Array<{ name: string; value: PersonGender }>;
  hairColors: Array<{ name: string; value: PersonHairColor }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private cadastro: ValidaCadastroProvider,
  ) {
    this.job = JSON.parse(localStorage.getItem("job"));
    this.createForm();
    this.populateSelects();
  }

  ionViewDidLoad() {

  }

  submitStep2() {
    this.cadastro.setEnableStep1(false);
    this.cadastro.setEnableStep2(true);
    localStorage.setItem("job", JSON.stringify(this.step2Form.value));
    this.navCtrl.parent.select(2);
  }

  createForm() {
    this.step2Form = this.formBuilder.group({
      numPeople: [""],
      gender: [""],
      hairColor: [""],
      eyeColor: [""],
      skinColor: [""]
    });
  }

  populateSelects() {
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

  returnStep1() {
    this.cadastro.setEnableStep1(true);
    this.cadastro.setEnableStep2(false);
    localStorage.setItem("job", JSON.stringify(this.job));
    this.navCtrl.parent.select(0);
  }
}
