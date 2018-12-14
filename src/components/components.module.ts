import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PromuxHeaderComponent } from './promux-header/promux-header';
@NgModule({
	declarations: [GoogleLoginComponent,
    PromuxHeaderComponent],
	imports: [IonicModule],
	exports: [GoogleLoginComponent,
    PromuxHeaderComponent]
})
export class ComponentsModule {}
