import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PromuxHeaderComponent } from './promux-header/promux-header';
import { FacebookLoginComponent } from './facebook-login/facebook-login';
import { CompanyJobsComponent } from './company-jobs/company-jobs';
@NgModule({
	declarations: [GoogleLoginComponent,
    PromuxHeaderComponent,
    FacebookLoginComponent,
    CompanyJobsComponent],
	imports: [IonicModule],
	exports: [GoogleLoginComponent,
    PromuxHeaderComponent,
    FacebookLoginComponent,
    CompanyJobsComponent]
})
export class ComponentsModule {}
