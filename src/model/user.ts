export class User {
  fullName: string;
  email: string;
  gender: string;
  height: number;
  weight: number;
  skinColor: string;
  eyeColor: string;
  hairColor: string;
  dateOfBirth: Date;
  completeProfile: boolean;
  key: string;

  constructor(fullName: string, email: string, dateOfBirth: Date){
    this.fullName = fullName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.completeProfile = false;
  }
}
