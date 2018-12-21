import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { AngularFireAuth } from "angularfire2/auth";
import { MenuController, Nav, Platform } from "ionic-angular";

import { AboutPage } from "../pages/about/about";
import { LoginPage } from "../pages/account/login/login";
import { MyProfilePage } from "../pages/account/my-profile/my-profile";
import { HomePage } from "../pages/home/home";
import { PrivacyPage } from "../pages/privacy/privacy";
import { TermsOfServicePage } from "../pages/terms-of-service/terms-of-service";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { UserDataProvider } from "../providers/user-data/user-data";
import { UserType } from "../model/IUser";
import { PlanPage } from "../pages/job-plan/plan/plan";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  loggedUser: any;
  pages: Array<{ title: string; component: any; icon: string }>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    splashScreen: SplashScreen,
    private asProvider: AuthServiceProvider,
    private udProvider: UserDataProvider,
    private menu: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.loggedUser = { fullName: " " };

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.menu.enable(true, "sideMenu");

        this.rootPage = HomePage;

        const udObserver = udProvider.getUserData().subscribe(user => {
          if (user.key) {
            this.loggedUser = user;
            localStorage.setItem("loggedUser", JSON.stringify(user));
            localStorage.setItem("loggedUserKey", user.key);

            this.createPages();

            udObserver.unsubscribe();
          }
        });
      } else {
        this.menu.enable(false, "sideMenu");
        this.rootPage = LoginPage;
      }
    });
  }

  createPages() {
    if (this.loggedUser.type == UserType.PessoaFisica) {
      this.pages = [
        { title: "Meus Jobs", component: MyProfilePage, icon: "list" }
      ];
    } else if (this.loggedUser.type == UserType.Empresa) {
      this.pages = [
        { title: "Novo Job", component: PlanPage, icon: "create" }
      ];
    }

    this.pages.push(
      { title: "Meu Perfil", component: MyProfilePage, icon: "person" },
      { title: "Termos de Uso", component: TermsOfServicePage, icon: "book" },
      {
        title: "Política de Privacidade",
        component: PrivacyPage,
        icon: "information-circle"
      },
      { title: "Sobre o Promux", component: AboutPage, icon: "help" }
    );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.asProvider
      .doLogout()
      .then(() => {
        this.nav.setRoot(LoginPage);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
