import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { PortfolioPOJO } from 'src/app/models/public/PortfolioPOJO';
import { PortfolioService } from 'src/app/services/portfolio.service';

export enum PublicPortfolioStatus {
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

  protected PublicPortfolioStatus = PublicPortfolioStatus;
  protected portfolioStatus: PublicPortfolioStatus;
  protected portfolio?: PortfolioPOJO;
  private readonly routeId?: string | null;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _service: PortfolioService
  ) {
    this.portfolioStatus = PublicPortfolioStatus.LOADING;
    this.routeId = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    timer(2000).subscribe(() => this.loadPortfolio())
  }

  async loadPortfolio() {

    if (this.routeId) {
      try {
        this.portfolio = await this._service.get(this.routeId);
        if (!this.portfolio.status) {
          this.portfolioStatus = PublicPortfolioStatus.PRIVATE;
        }
        else {
          this.portfolioStatus = PublicPortfolioStatus.PUBLIC;
        }
      }
      catch (err) {
        console.error('Falha ao buscar portfólio', err);
        this.portfolioStatus = PublicPortfolioStatus.NOT_FOUND;
      }
    }
    else {
      this.portfolioStatus = PublicPortfolioStatus.NOT_FOUND;
    }
  }
}
