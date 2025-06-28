import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Portfolio } from '../models/public/Portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private readonly _firestore = inject(Firestore);
  private readonly _portfolioCollection: CollectionReference;

  constructor() {
    this._portfolioCollection = collection(this._firestore, 'portfolio')
  }

  save(portfolio: Portfolio){
    if (!portfolio) return;

    addDoc(this._portfolioCollection, portfolio).then((document: DocumentReference) => {
      return document.id;
    })
  }
}
