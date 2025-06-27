import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Certification } from 'src/app/models/admin/Certification';
import { Portfolio, PortfolioFieldsOnly } from 'src/app/models/public/Portfolio';
import { CertificationService } from 'src/app/services/certification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrl: './portfolio-form.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // fade in
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [   // fade out
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PortfolioFormComponent implements OnInit {

  constructor(
    private readonly _userService: UserService,
    private readonly _certificationService: CertificationService) {
  }

  showProfile: boolean = true;
  showCertification: boolean = false;
  toggleEdit() {
    this.showProfile = !this.showProfile;
    this.showCertification = !this.showCertification;

  }

  portfolioIn: Portfolio = new Portfolio();
  portfolioOut: Portfolio = new Portfolio();

  ngOnInit(): void {
    this._userService.getById().subscribe((user) => {
      this.portfolioIn?.setUser(user);
    })
    this._certificationService.getAll(true).subscribe((certifications) => {
      this.portfolioIn?.setCertifications(certifications);
    })
  }

  clone() {
    timer(500).subscribe(() => {
      this.portfolioOut = this.portfolioIn?.clone();
    })
  }

  checkValue<T extends keyof PortfolioFieldsOnly>(property: T, isChecked: boolean) {
    if (!this.portfolioOut || !this.portfolioIn) return;
    if (isChecked) {
      const value: Portfolio[T] = this.portfolioIn.get(property);
      this.portfolioOut[property] = value;
    } else {
      this.portfolioOut.setNull(property);
    }
  }

  checkCertification(cert: Certification, check: boolean) {
    if(check) {
      this.portfolioOut.certifications?.push(cert)
    } else {
      this.portfolioOut.certifications = this.portfolioOut.certifications?.filter(c => c.id !== cert.id)
    }
    console.log(this.portfolioOut.certifications)
  }

  generate() {
    console.log(this.portfolioOut);
  }

  isEmailChecked: boolean = false;
  isLocationChecked: boolean = false;
  isDescriptionChecked: boolean = false;
  isGoalChecked: boolean = false;
  isGithubChecked: boolean = false;
  isLinkedinChecked: boolean = false;
}
