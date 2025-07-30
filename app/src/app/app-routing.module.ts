import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { NavComponent } from './components/admin/nav/nav.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin/user/profile/profile.component';
import { CertificationComponent } from './components/admin/certification/certification/certification.component';
import { NotFoundComponent } from './components/public/not-found/not-found.component';
import { HomeComponent } from './components/public/home/home.component';
import { FormCertificationComponent } from './components/admin/certification/form-certification/form-certification.component';
import { CertificationDetailsComponent } from './components/admin/certification/certification-details/certification-details.component';
import { PortfolioComponent } from './components/admin/portfolio/portfolio/portfolio.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '/:id', component: PortfolioComponent }
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'app', component: NavComponent, canActivate: [authGuard], children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'certifications', component: CertificationComponent },
      { path: 'certifications/create', component: FormCertificationComponent },
      { path: 'certifications/create/:id', component: FormCertificationComponent },
      { path: 'certifications/:id', component: CertificationDetailsComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
