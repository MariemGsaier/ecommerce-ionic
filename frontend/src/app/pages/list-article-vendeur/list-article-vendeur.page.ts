import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-article-vendeur',
  templateUrl: './list-article-vendeur.page.html',
  styleUrls: ['./list-article-vendeur.page.scss'],
})
export class ListArticleVendeurPage implements OnInit {
  constructor(
    private articleService: ArticleService,
    private alertController: AlertController,
    private snackBar: MatSnackBar
  ) {}

  userIdNumber!: number;

  articles: any[] = [];
  filteredArticles: any[] = [];

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);

    if (userId) {
      this.userIdNumber = +userId;
    }
    this.getArticles();
  }

  getArticles() {
    this.articleService.getSellerArticles(this.userIdNumber).subscribe(
      (response) => {
        this.articles = response.articles;
        console.log(this.articles);
        this.filteredArticles = this.articles.slice();
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

  async confirmDelete(article: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Voulez-vous vraiment supprimer ${article.libelle} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Opération annulée');
          },
        },
        {
          text: 'Oui',
          handler: () => {
            this.deleteArticle(article);
          },
        },
      ],
    });

    await alert.present();
  }

  // Fonction pour supprimer un vendeur
  deleteArticle(article: any) {
    this.articleService.deleteProduct(article.id).subscribe(
      (response) => {
        console.log('Article supprimé avec succès : ', response.message);
        this.snackBar.open('Article supprimé avec succés', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        // Rechargez la liste des vendeurs
        this.getArticles();
      },
      (error) => {
        console.error('Erreur lors de la suppression de cet article : ', error);
        this.snackBar.open(
          'Erreur lors de la suppression de cet article',
          'Fermer',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      }
    );
  }

  // Fonction pour la recherche
  onSearch(event: CustomEvent) {
    const searchTerm = (event.target as HTMLInputElement).value;

    const filteredSellers = this.articles.filter((article) => {
      return article.libelle.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.articles = filteredSellers;
  }
}
