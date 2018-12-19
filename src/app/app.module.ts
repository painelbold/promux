import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AboutPageModule } from '../pages/about/about.module';
import { LoginPageModule } from '../pages/account/login/login.module';
import { MyProfilePageModule } from '../pages/account/my-profile/my-profile.module';
import { RegisterComplementPageModule } from '../pages/account/register-complement/register-complement.module';
import { HomePageModule } from '../pages/home/home.module';
import { PrivacyPageModule } from '../pages/privacy/privacy.module';
import { TermsOfServicePageModule } from '../pages/terms-of-service/terms-of-service.module';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserDataProvider } from '../providers/user-data/user-data';
import { RegisterPageModule } from './../pages/account/register/register.module';
import { MyApp } from './app.component';
import { JobProvider } from '../providers/job/job';
import { PlanPageModule } from '../pages/job-plan/plan/plan.module';
import { PlanStep1PageModule } from '../pages/job-plan/plan-step1/plan-step1.module';
import { PlanStep2PageModule } from '../pages/job-plan/plan-step2/plan-step2.module';
import { ValidaCadastroProvider } from '../providers/valida-cadastro/valida-cadastro';
import { PlanStep3PageModule } from '../pages/job-plan/plan-step3/plan-step3.module';

export const firebaseConfig = {
  apiKey: "AIzaSyAUavNtrtqX_wUmwIl6UKXJrSZFbzn2Ceg",
  authDomain: "promux-cbf60.firebaseapp.com",
  databaseURL: "https://promux-cbf60.firebaseio.com",
  projectId: "promux-cbf60",
  storageBucket: "promux-cbf60.appspot.com",
  messagingSenderId: "782758598685"
};

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    LoginPageModule,
    RegisterPageModule,
    AboutPageModule,
    TermsOfServicePageModule,
    PrivacyPageModule,
    HomePageModule,
    MyProfilePageModule,
    RegisterComplementPageModule,
    BrMaskerModule,
    PlanPageModule,
    PlanStep1PageModule,
    PlanStep2PageModule,
    PlanStep3PageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserDataProvider,
    AuthServiceProvider,
    GooglePlus,
    Facebook,
    JobProvider,
    ValidaCadastroProvider
  ]
})
export class AppModule {}
