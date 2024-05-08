import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  quantity: number = 1;
  panier: any[] = [];
  panierLength: number = 0;

  constructor(private panierService: PanierService) {}

  ngOnInit() {
    console.log('panier', this.panierService.panier);
    console.log('total', this.panierService.calculateTotal());
    this.panier = this.panierService.panier;
    this.panierLength = this.panierService.lengthPanier;
    console.log(this.panierLength);
  }

  decreaseQuantity(article: any) {
    if (article.quantite > 1) {
      article.quantite--;
    }
  }

  increaseQuantity(article: any) {
    article.quantite++;
  }

  removeItem(article: any) {
    this.panierService.supprimerDuPanier(article);
  }
  calculTotal() {
    return this.panierService.calculateTotal();
  }
}
