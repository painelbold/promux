import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  ToastController
} from "ionic-angular";
import { Job, JobType } from '../../../model/job';
import { ValidaCadastroProvider } from "../../../providers/valida-cadastro/valida-cadastro";
import { JobProvider } from "../../../providers/job/job";
import { HomePage } from "../../home/home";
import {
  PersonSkinColor,
  PersonEyeColor,
  PersonGender,
  PersonHairColor
} from "../../../model/modelAttributes";

/**
 * Generated class for the PlanStep3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-plan-step3",
  templateUrl: "plan-step3.html"
})
export class PlanStep3Page {
  job: Job;
  loading: Loading;
  jobType: string;

  personAttributes: {
    gender: string,
    hairColor: string,
    skinColor: string,
    eyeColor: string,
  }

  jobTypes: Array<{name: string, value: JobType}>;
  genders: Array<{name: string, value: PersonGender}>;
  skinColors: Array<{name: string, value: PersonSkinColor}>;
  hairColors: Array<{name: string, value: PersonHairColor}>;
  eyeColors: Array<{name: string, value: PersonEyeColor}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cadastro: ValidaCadastroProvider,
    public jobProvider: JobProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.job = JSON.parse(localStorage.getItem("job"));
    console.log(this.job);
    this.populateArrays();
    this.getPersonAttributes();
  }

  ionViewDidLoad() {
  }

  confirmJob() {
    this.createLoading("Salvando job...", 10000);

    this.jobProvider
      .save(this.job)
      .then(() => {
        this.loading.dismiss();

        localStorage.removeItem("job");
        console.log("job Removido");
        console.log(localStorage.getItem("job"));

        this.createToast("Job salvo com sucesso!", 2000);

        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        this.loading.dismiss();
        this.createToast("Erro ao salvar o job.", 2000);
        console.log(err);
      });
  }

  returnStep2() {
    this.cadastro.setEnableStep1(false);
    this.cadastro.setEnableStep2(true);
    this.cadastro.setEnableStep3(false);
    this.navCtrl.parent.select(1);
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

  populateArrays(){
    this.jobTypes = [
      { name: "Bandeirada", value: JobType.Bandeirada },
      { name: "Blitz", value: JobType.Blitz },
      { name: "Book Fotográfico", value: JobType.BookFotografico },
      { name: "Carro de Som", value: JobType.CarroDeSom },
      { name: "Degustação", value: JobType.Degustacao },
      { name: "Distribuição de Brindes", value: JobType.DistribuicaoDeBrindes },
      { name: "Equipe de Massoterapia", value: JobType.EquipeDeMassoterapia },
      { name: "Figurante para TV", value: JobType.FiguranteParaTV },
      { name: "Gravação de Spot", value: JobType.GravacaoDeSpot },
      { name: "Modelos", value: JobType.Modelos },
      { name: "Receptivo", value: JobType.Receptivo },
      { name: "Repositores", value: JobType.Repositores },
      { name: "Panfletagem", value: JobType.Panfletagem },
      { name: "Vitrine Viva", value: JobType.VitrineViva }
    ];

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

  getPersonAttributes(){
    this.jobType = this.jobTypes.find((x, y) => y == this.job.type).name;

    this.personAttributes = {
      hairColor: this.hairColors.find((x,y) => y == this.job.hairColor).name,
      eyeColor: this.eyeColors.find((x,y) => y == this.job.eyeColor).name,
      gender: this.eyeColors.find((x,y) => y == this.job.gender).name,
      skinColor: this.skinColors.find((x,y) => y == this.job.skinColor).name
    }
  }
}
