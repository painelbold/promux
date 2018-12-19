import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { JobType } from "../../../model/job";
import { ValidaCadastroProvider } from '../../../providers/valida-cadastro/valida-cadastro';

/**
 * Generated class for the PlanStep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-plan-step1",
  templateUrl: "plan-step1.html"
})
export class PlanStep1Page {
  step1Form: FormGroup;
  jobTypes: Array<{ name: string; value: JobType }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private cadastro: ValidaCadastroProvider,
  ) {
    this.getJobTypes();
    this.createForm();
  }

  ionViewDidLoad() {}

  submitStep1() {
    this.cadastro.setEnableStep1(false);
    this.cadastro.setEnableStep2(true);
    localStorage.setItem("job", JSON.stringify(this.step1Form.value));
    this.navCtrl.parent.select(1);
  }

  createForm() {
    this.step1Form = this.formBuilder.group({
      title: [""],
      type: [""],
      description: [""],
      local: [""]
    });
  }

  getJobTypes() {
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
  }
}
