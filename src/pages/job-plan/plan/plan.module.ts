import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanPage } from './plan';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PlanPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanPage),
    ComponentsModule
  ],
})
export class PlanPageModule {}
