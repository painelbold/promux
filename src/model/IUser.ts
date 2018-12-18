export interface IUser{
  fullName: string;
  email: string;
  key: string;
  type: UserType;
  dateCreated: any;
}

export enum UserType{
  PessoaFisica,
  Empresa
}
