import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PromuxHeaderComponent } from './promux-header/promux-header';
import { FacebookLoginComponent } from './facebook-login/facebook-login';
@NgModule({
	declarations: [GoogleLoginComponent,
    PromuxHeaderComponent,
    FacebookLoginComponent],
	imports: [IonicModule],
	exports: [GoogleLoginComponent,
    PromuxHeaderComponent,
    FacebookLoginComponent]
})
export class ComponentsModule {}
