import { inject, Injectable } from '@angular/core';
import { collection, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { PortfolioPOJO } from '../models/public/PortfolioPOJO';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private readonly _firestore = inject(Firestore);
  private readonly _portfolioCollection: CollectionReference;

  constructor() {
    this._portfolioCollection = collection(this._firestore, 'portfolio')
  }

  async save(portfolio: PortfolioPOJO): Promise<void> {
    if (!portfolio?.id) throw new Error("Portfólio inválido");
    await setDoc(doc(this._portfolioCollection, portfolio.id), portfolio);
  }
}
