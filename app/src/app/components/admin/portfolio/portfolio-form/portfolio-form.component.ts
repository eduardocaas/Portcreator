import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Certification } from 'src/app/models/admin/Certification';
import { Portfolio, PortfolioFieldsOnly } from 'src/app/models/public/Portfolio';
import { PortfolioPOJO } from 'src/app/models/public/PortfolioPOJO';
import { CertificationService } from 'src/app/services/certification.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
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
    private readonly _certificationService: CertificationService,
    private readonly _portfolioService: PortfolioService) {
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
    if (isChecked && property != 'status') {
      // Passando de portfolioIn para portfolioOut
      const value: Portfolio[T] = this.portfolioIn.get(property);
      this.portfolioOut[property] = value;
    }
    // Caminho especifico para status
    else if (property == 'status') {
      if (isChecked) {
        this.portfolioOut.status = true;
      }
      else {
        this.portfolioOut.status = false;
      }
    }
    else {
      // Se estiver desmarcado deixa como nulo
      this.portfolioOut.setNull(property);
    }
  }

  checkCertification(cert: Certification, check: boolean) {
    if (check) {
      this.portfolioOut.certifications?.push(cert)
    } else {
      this.portfolioOut.certifications = this.portfolioOut.certifications?.filter(c => c.id !== cert.id)
    }
  }

  generate() {
    this.setDefaultProperties()
    let pojo: PortfolioPOJO = this.portfolioOut.toPOJO();
    this._portfolioService.save(pojo)
      .then(() => {
        alert(`Portfólio criado, id: ${this.portfolioOut.id}!`)
      })
      .catch((error: any) => {
        alert("Erro ao gerar portfólio! MSG: " + error)
      });

  }

  setDefaultProperties() {
    this.portfolioOut.id = this.portfolioIn.id;
    this.portfolioOut.name = this.portfolioIn.name;
  }

  isEmailChecked: boolean = false;
  isLocationChecked: boolean = false;
  isDescriptionChecked: boolean = false;
  isGoalChecked: boolean = false;
  isGithubChecked: boolean = false;
  isLinkedinChecked: boolean = false;
  isStatusChecked: boolean = false;
}
