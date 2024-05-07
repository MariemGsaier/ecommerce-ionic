import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-evaluate-article',
  templateUrl: './evaluate-article.page.html',
  styleUrls: ['./evaluate-article.page.scss'],
})
export class EvaluateArticlePage implements OnInit {

  articleId!: number;
  article: any = {}; 

    //rating 
  star1 = 'star-outline';
  star2 = 'star-outline';
  star3 = 'star-outline';
  star4 = 'star-outline';
  star5 = 'star-outline';
  userRating = 0;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    // Récupérer l'ID de l'article à partir des paramètres de l'URL
    this.articleId = this.route.snapshot.params['id'];
    console.log(this.articleId)
    // Appeler la méthode du service pour récupérer les données de l'article
    this.articleService.getArticle(this.articleId).subscribe(
      (response) => {
        this.article = response; 
        console.log(this.article)
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de l\'article : ', error);
      }
    );
  }

  rateArticle(rate: number) {
    this.userRating = rate;
    this.updateStars(rate);
  }

  updateStars(rate: number) {
    this.star1 = rate >= 1 ? 'star' : 'star-outline';
    this.star2 = rate >= 2 ? 'star' : 'star-outline';
    this.star3 = rate >= 3 ? 'star' : 'star-outline';
    this.star4 = rate >= 4 ? 'star' : 'star-outline';
    this.star5 = rate === 5 ? 'star' : 'star-outline';
  }

  evaluateArticle() {
    this.articleService.rateArticle(this.articleId, this.userRating).subscribe(
      (response) => {
        this.snackBar.open('Évaluation réussie', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
          setTimeout(() => {
          this.router.navigate(['/tabs/home']);
        }, 100); // Attendre 100 millisecondes avant de rediriger
  
        // Recharger la page après la redirection
        setTimeout(() => {
          window.location.reload();
        }, 200);
      },
      (error) => {
        this.snackBar.open('Erreur lors de l\'évaluation. Veuillez réessayer.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}




