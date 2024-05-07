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
  article: any = {}; // Objet pour stocker les données de l'article

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }
  fileInput!: HTMLInputElement; 

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


    
    modifierArticle()
    {
      const categorie = (document.getElementById('categorie'));
      const categorieValue = (categorie as HTMLIonSelectElement).value;
      const libelle = (document.getElementById('libelle') as HTMLInputElement).value;
      const prix = (document.getElementById('prix') as HTMLInputElement).value;
      const description = (document.getElementById('description') as HTMLInputElement).value;
    
      // Vérifier si tous les champs sont remplis
      if (!categorieValue || !libelle || !prix || !description) {
        // Afficher un message d'erreur à l'utilisateur
        this.snackBar.open('Veuillez remplir tous les champs du formulaire.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return; // Arrêter l'exécution de la méthode
  }

  const articleData = {
    libelle: libelle,
    categoryId: categorieValue,
    prix: prix,
    description: description,
  };

  this.articleService.updateProduct(this.articleId,articleData).subscribe(
    (response) => {
      // Gérer la réponse de l'API (succès)
      console.log(response);
      
      this.snackBar.open('Article mis a jour avec succés', 'Fermer', {
        duration: 3000, // Durée du snackbar en millisecondes
        panelClass : ['success-snackbar']
      });
      // Rediriger l'utilisateur vers une autre page (par exemple, la page de connexion)
      setTimeout(() => {
        this.router.navigate(['/tabs-vendeur/list-article-vendeur']);
      }, 100); // Attendre 100 millisecondes avant de rediriger

      // Recharger la page après la redirection
      setTimeout(() => {
        window.location.reload();
      }, 200);
    },
    (error) => {
      
      console.error(error);
      
      this.snackBar.open('Erreur lors de la mise à jour de l\'article. Veuillez réessayer.', 'Fermer', {
        duration: 3000, 
        panelClass : ['error-snackbar']
      });
    }
  );
}

  openFileInput() {
    this.fileInput.click();
  }

  // Fonction appelée lorsque l'utilisateur sélectionne un fichier
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if ( inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0]; // Récupère le premier fichier sélectionné
      // Faites ce que vous voulez avec le fichier sélectionné, par exemple l'envoyer au serveur, le prévisualiser, etc.
      console.log('Fichier sélectionné :', file);
    }
  }

}
