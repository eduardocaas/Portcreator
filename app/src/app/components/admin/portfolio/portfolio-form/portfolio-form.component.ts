import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/public/Portfolio';
import { CertificationService } from 'src/app/services/certification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrl: './portfolio-form.component.css'
})
export class PortfolioFormComponent implements OnInit {

  constructor(
    private readonly _userService: UserService,
    private readonly _certificationService: CertificationService) {}

  ngOnInit(): void {
    this._userService.getById().subscribe((user) => {
      this.portfolio?.setUser(user);
    })
    this._certificationService.getAll(true).subscribe((certifications) => {
      this.portfolio?.setCertifications(certifications);
    })
  }

  portfolio: Portfolio | undefined;
}
