import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { NavComponent } from './components/admin/nav/nav.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin/user/profile/profile.component';
import { CertificationComponent } from './components/admin/certification/certification/certification.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', component: NavComponent, canActivate: [authGuard], children: [
    { path: '', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'certifications', component: CertificationComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
