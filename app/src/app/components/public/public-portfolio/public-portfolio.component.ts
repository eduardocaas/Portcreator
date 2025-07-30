import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

enum PublicPortfolioStatus {
  LOADING,
  PUBLIC,
  PRIVATE,
  NOT_FOUND
}

@Component({
  selector: 'app-public-portfolio',
  templateUrl: './public-portfolio.component.html',
  styleUrl: './public-portfolio.component.css'
})
export class PublicPortfolioComponent implements OnInit {

  private portfolioStatus: PublicPortfolioStatus;

  constructor(
    private readonly _route: ActivatedRoute
  ) {
    this.portfolioStatus = PublicPortfolioStatus.LOADING;
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      // PRIMEIRO VER SE EXISTE E ENTÃO VER SE TA PUBLIC:TRUE, DEPOIS PUXAR TUDO
    }
    else {
      this.portfolioStatus = PublicPortfolioStatus.NOT_FOUND;

    }
  }
}
