import { IUser, UserType } from './IUser';

export class Company implements IUser {
  fullName: string;
  email: string;
  completeProfile: boolean;
  key: string;
  type: UserType;
  cnpj: string;
  responsible: string;
  dateCreated: any;

  constructor(fullName: string, email: string, cnpj: string){
    this.fullName = fullName;
    this.email = email;
    this.cnpj = cnpj;
    this.type = UserType.Empresa;
  }
}
