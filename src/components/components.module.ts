import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [GoogleLoginComponent],
	imports: [IonicModule],
	exports: [GoogleLoginComponent]
})
export class ComponentsModule {}
