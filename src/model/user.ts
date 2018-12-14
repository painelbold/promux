import { IUser, UserType } from './IUser';

export class User implements IUser {
  fullName: string;
  email: string;
  key: string;
  gender: string;
  height: number;
  weight: number;
  skinColor: string;
  eyeColor: string;
  hairColor: string;
  dateOfBirth: Date;
  completeProfile: boolean;
  type: UserType

  constructor(fullName: string, email: string, dateOfBirth: Date){
    this.fullName = fullName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.completeProfile = false;
    this.type = UserType.PessoaFisica;
  }
}
