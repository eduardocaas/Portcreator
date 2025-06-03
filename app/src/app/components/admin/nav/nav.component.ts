import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) { }

  logout() {
    this._authService.logout();
    this._router.navigate(['']);
  }
}
