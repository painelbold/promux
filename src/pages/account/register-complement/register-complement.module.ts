import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterComplementPage } from './register-complement';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    RegisterComplementPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterComplementPage),
    ComponentsModule
  ],
})
export class RegisterComplementPageModule {}
