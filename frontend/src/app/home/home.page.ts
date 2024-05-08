import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  articles: any[] = [];
  filteredArticles: any[] = [];
  authentifie?: any;

  averageRatings: any = {};

  constructor(
    private articleService: ArticleService,
    private alertController: AlertController,
    private router: Router,
    private panierService: PanierService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getArticles();
    if (localStorage.getItem('token') !== null) {
      this.authentifie = true;
    } else {
      this.authentifie = false;
    }
  }
  get lengthPanier() {
    return this.panierService.lengthPanier;
  }
  getArticles() {
    this.articleService.getArticles().subscribe(
      (response) => {
        console.log('resp', response);
        this.articles = response.articles;
        this.filteredArticles = this.articles.slice();
        console.log(this.articles);
        this.articles.forEach((article) => {
          this.getAverageRating(article.id);
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    );
  }
  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();

    // Filtrer les articles
    this.filteredArticles = this.articles.filter((article) =>
      article.libelle.toLowerCase().includes(filterValue)
    );
  }
  getArticlesByCategory(categoryId: number) {
    if (categoryId === 0) {
      // Si id categorie =0 (dans le cas afficher tout)
      this.filteredArticles = this.articles.slice();
    } else {
      // Sinon récupération des articles par id categorie
      this.articleService.getArticlesByCategory(categoryId).subscribe(
        (response) => {
          console.log('respCat', response);
          this.filteredArticles = response.articles;
        },
        (error) => {
          console.error('Erreur lors de la récupération des articles :', error);
        }
      );
    }
  }
  addToCart(article: any) {
    //si utilisateur est non authentfie
    if (this.authentifie === false) {
      this.alertController
        .create({
          header: 'Se connecter',
          message:
            'Vous devez vous connecter pour ajouter cet article au panier.',
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
            },
            {
              text: 'Se connecter',
              handler: () => {
                // Redirection vers la page de connexion
                this.router.navigate(['/login']);
              },
            },
          ],
        })
        .then((alert) => alert.present());
    } else {
      const existingIndex = this.panierService.panier.findIndex(
        (item) => item.id === article.id
      );
      // si utilisateur est authentifie
      this.panierService.ajouterAuPanier(article);
      this.snackBar.open('Article ajouté au panier', 'Fermer', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
    }
  }

  getAverageRating(articleId: number) {
    this.articleService.getArticleRating(articleId).subscribe(
      (response) => {
        this.averageRatings[articleId] = response.average_rating;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération de la moyenne des évaluations :',
          error
        );
      }
    );
  }
}
