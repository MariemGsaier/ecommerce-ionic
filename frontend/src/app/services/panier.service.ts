import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  panier: any[] = [];
  lengthPanier: number = 0;

  constructor() {
    this.loadPanierFromLocalStorage();
  }

  private loadPanierFromLocalStorage() {
    const panierItem = localStorage.getItem('panier');
    if (panierItem) {
      this.panier = JSON.parse(panierItem);
      this.lengthPanier = this.panier.length;
      this.calculateTotal();
    }
  }

  private savePanierToLocalStorage() {
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.lengthPanier = this.panier.length;
    this.calculateTotal();
  }

  ajouterAuPanier(article: any) {
    console.log('articleService', article);
    const index = this.panier.findIndex((item) => item.id === article.id);
    if (index !== -1) {
      this.panier[index].quantite++;
    } else {
      article.quantite = 1;
      this.panier.push(article);
    }
    this.savePanierToLocalStorage();
  }

  supprimerDuPanier(article: any) {
    const index = this.panier.findIndex((item) => item.id === article.id);
    if (index !== -1) {
      this.panier.splice(index, 1);
      this.lengthPanier--;
    }
    this.savePanierToLocalStorage();
  }

  modifierQuantite(article: any, nouvelleQuantite: number) {
    const index = this.panier.findIndex((item) => item.id === article.id);
    if (index !== -1) {
      this.panier[index].quantite = nouvelleQuantite;
    }
    this.savePanierToLocalStorage();
  }

  calculateTotal(): number {
    let total = 0;
    for (const article of this.panier) {
      total += article.prix * article.quantite;
    }
    return total;
  }
  viderPanier() {
    this.panier = []; // Vider le panier
    this.lengthPanier = 0; // Réinitialiser la longueur du panier
    localStorage.removeItem('panier'); // Supprimer le panier du localStorage
  }
}
