import { inject, Injectable } from '@angular/core';
import { collection, CollectionReference, doc, Firestore, getDoc, limit, query, setDoc, where } from '@angular/fire/firestore';
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

  async get(id: string): Promise<PortfolioPOJO> {
    /* const portfolioQuery = query(
      this._portfolioCollection,
      where('id', '==', id),
      where('status', '==', true),
      limit(1))
 */
    let docRef = doc(this._firestore, 'portfolio', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let doc: PortfolioPOJO = docSnap.data();
      return doc;
    } else {
      throw new Error("Portfólio não encontrado");
    }
  }
}
