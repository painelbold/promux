export interface IUser{
  fullName: string;
  email: string;
  key: string;
  type: UserType;
}

export enum UserType{
  PessoaFisica,
  Empresa
}
