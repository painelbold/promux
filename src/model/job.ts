export class Job{
  companyKey: string;
  key: string;
  description: string;
  local: string;
  numPeople: number;
}

export enum JobType{
  Bandeirada,
  Blitz,
  BookFotográfico,
  CarroDeSom,
  Degustação,
  DistribuiçãoDeBrindes,
  EquipeDeMassoterapia,
  FiguranteParaTV,
  GravaçãoDeSpot,
  Modelos,
  Receptivo,
  Repositores,
  Panfletagem,
  VitrineViva,
}
