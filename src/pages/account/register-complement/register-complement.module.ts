import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterComplementPage } from './register-complement';

@NgModule({
  declarations: [
    RegisterComplementPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterComplementPage),
  ],
})
export class RegisterComplementPageModule {}
