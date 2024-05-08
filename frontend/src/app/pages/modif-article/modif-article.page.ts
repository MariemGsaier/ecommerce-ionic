import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-modif-article',
  templateUrl: './modif-article.page.html',
  styleUrls: ['./modif-article.page.scss'],
})
export class ModifArticlePage implements OnInit {
  articleId!: number;
  article: any = {};

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  fileInput!: HTMLInputElement;

  ngOnInit() {
    this.articleId = this.route.snapshot.params['id'];
    console.log(this.articleId);
    this.articleService.getArticle(this.articleId).subscribe(
      (response) => {
        this.article = response;
        console.log(this.article);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des données de l'article : ",
          error
        );
      }
    );
  }

  modifierArticle() {
    const categorie = document.getElementById('categorie');
    const categorieValue = (categorie as HTMLIonSelectElement).value;
    const libelle = (document.getElementById('libelle') as HTMLInputElement)
      .value;
    const prix = (document.getElementById('prix') as HTMLInputElement).value;
    const description = (
      document.getElementById('description') as HTMLInputElement
    ).value;

    if (!categorieValue || !libelle || !prix || !description) {
      this.snackBar.open(
        'Veuillez remplir tous les champs du formulaire.',
        'Fermer',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
        }
      );
      return;
    }

    const articleData = {
      libelle: libelle,
      categoryId: categorieValue,
      prix: prix,
      description: description,
    };

    this.articleService.updateProduct(this.articleId, articleData).subscribe(
      (response) => {
        console.log(response);

        this.snackBar.open('Article mis a jour avec succés', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        setTimeout(() => {
          this.router.navigate(['/tabs-vendeur/list-article-vendeur']);
        }, 100);

        setTimeout(() => {
          window.location.reload();
        }, 200);
      },
      (error) => {
        console.error(error);

        this.snackBar.open(
          "Erreur lors de la mise à jour de l'article. Veuillez réessayer.",
          'Fermer',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      }
    );
  }

  openFileInput() {
    this.fileInput.click();
  }

  // sélection fichier
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      console.log('Fichier sélectionné :', file);
    }
  }
}
