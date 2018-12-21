import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { JobType, Job } from "../../../model/job";
import { User } from "../../../model/user";
import { ValidaCadastroProvider } from "../../../providers/valida-cadastro/valida-cadastro";

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
  minDate: string;
  maxCalDate: string;
  minEndDate: string;

  company: User;
  job: Job;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private cadastro: ValidaCadastroProvider
  ) {
    this.job = new Job();
    this.getJobTypes();
    this.createForm();
  }

  ionViewDidLoad() {
    this.minDate = new Date().toISOString();
    this.minEndDate = this.minDate;
    this.maxCalDate = "2030-12-31";
    this.company = JSON.parse(localStorage.getItem("loggedUser"));
  }

  submitStep1() {
    this.getFormValues();
    this.cadastro.setEnableStep1(false);
    this.cadastro.setEnableStep2(true);
    localStorage.setItem("job", JSON.stringify(this.job));
    this.navCtrl.parent.select(1);
  }

  createForm() {
    this.step1Form = this.formBuilder.group({
      title: new FormControl(this.job.title || "", [Validators.required]),
      type: new FormControl(this.job.type || "", [Validators.required]),
      description: new FormControl(this.job.description || "", [Validators.required]),
      local: new FormControl(this.job.local || "", [Validators.required]),
      startDate: new FormControl(this.job.startDate || "", [Validators.required]),
      endDate: new FormControl(this.job.endDate || ""),
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

  getFormValues() {
    let formValues = this.step1Form.value;

    this.job.companyKey = this.company.key;
    this.job.companyName = this.company.fullName;
    this.job.description = formValues.description;
    this.job.title = formValues.title;
    this.job.type = formValues.type;
    this.job.local = formValues.local;
    this.job.startDate = formValues.startDate;
    this.job.endDate = formValues.endDate;
  }

  dtInicioChange(){
    this.minEndDate = this.step1Form.controls["startDate"].value;
    if(this.minEndDate > this.step1Form.controls["endDate"].value){
      this.step1Form.patchValue({
        endDateTrip: ''
      });
    }
  }
}
