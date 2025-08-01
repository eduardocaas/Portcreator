// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NavComponent } from './components/admin/nav/nav.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin/user/profile/profile.component';
import { FormProfileComponent } from './components/admin/user/form-profile/form-profile.component';
import { FormCertificationComponent } from './components/admin/certification/form-certification/form-certification.component';
import { CertificationCardComponent } from './components/admin/certification/certification-card/certification-card.component';
import { CertificationDetailsComponent } from './components/admin/certification/certification-details/certification-details.component';
import { CertificationComponent } from './components/admin/certification/certification/certification.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { HomeComponent } from './components/public/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsProfileComponent } from './components/admin/user/details-profile/details-profile.component';
import { TypePipe } from './pipes/type.pipe';
import { CertificationSearchPipe } from './pipes/certification-search.pipe';
import { PortfolioDetailsComponent } from './components/admin/portfolio/portfolio-details/portfolio-details.component';
import { PortfolioFormComponent } from './components/admin/portfolio/portfolio-form/portfolio-form.component';
import { PortfolioComponent } from './components/admin/portfolio/portfolio/portfolio.component';
import { FooterComponent } from './components/admin/footer/footer.component';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { PublicPortfolioComponent } from './components/public/public-portfolio/public-portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavComponent,
    DashboardComponent,
    ProfileComponent,
    FormProfileComponent,
    FormCertificationComponent,
    CertificationCardComponent,
    CertificationDetailsComponent,
    CertificationComponent,
    NotFoundComponent,
    HomeComponent,
    DetailsProfileComponent,
    TypePipe,
    CertificationSearchPipe,
    PortfolioDetailsComponent,
    PortfolioFormComponent,
    PortfolioComponent,
    FooterComponent,
    PublicPortfolioComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() =>
      initializeFirestore(getApp(), {
        ignoreUndefinedProperties: true
      })),
    provideStorage(() => getStorage())],
  bootstrap: [AppComponent]
})
export class AppModule { }
