import { PersonGender, PersonEyeColor, PersonHairColor, PersonSkinColor } from './modelAttributes';
export class Job {
  title: string;
  companyKey: string;
  companyName: string;
  key: string;
  description: string;
  local: string;
  numPeople: number;
  status: JobStatus;
  type: JobType;
  gender: PersonGender;
  hairColor: PersonHairColor;
  eyeColor: PersonEyeColor;
  skinColor: PersonSkinColor;
  dateCreated: any;
  startDate: Date;
  endDate: Date;
}

export enum JobType {
  Bandeirada,
  Blitz,
  BookFotografico,
  CarroDeSom,
  Degustacao,
  DistribuicaoDeBrindes,
  EquipeDeMassoterapia,
  FiguranteParaTV,
  GravacaoDeSpot,
  Modelos,
  Receptivo,
  Repositores,
  Panfletagem,
  VitrineViva
}

export enum JobStatus {
  AExecutar,
  EmExecucao,
  Executado
}
