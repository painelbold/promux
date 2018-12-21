import { Component } from "@angular/core";
import { Job, JobType } from "../../model/job";
import { JobProvider } from "../../providers/job/job";

@Component({
  selector: "company-jobs",
  templateUrl: "company-jobs.html"
})
export class CompanyJobsComponent {
  jobs: Array<Job>;
  companyKey: string;

  jobTypes = [
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

  constructor(private jobProvider: JobProvider) {
    this.companyKey = localStorage.getItem("loggedUserKey");
    this.getCompanyJobs();
  }

  getCompanyJobs() {
    const subs = this.jobProvider
      .getAll(this.companyKey)
      .subscribe((j: any) => {
        this.jobs = j;
        this.jobs = j.sort((a, b) => {
          if (a.dateCreated > b.dateCreated) return -1;
          if (a.dateCreated < b.dateCreated) return 1;
        });
        subs.unsubscribe();
      });
  }

  getTypeName(type: JobType) {
    return this.jobTypes.find((x, y) => y == type).name;
  }
}
