import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-update-photo-article',
  templateUrl: './update-photo-article.page.html',
  styleUrls: ['./update-photo-article.page.scss'],
})
export class UpdatePhotoArticlePage implements OnInit {
  articleId!: number;
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
     // Récupérer l'ID de l'article à partir des paramètres de l'URL
     this.articleId = this.route.snapshot.params['id'];
     console.log(this.articleId)
  }

  selectedFile: File | null = null;


  // Fonction appelée lorsque l'utilisateur sélectionne un fichier
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log('Fichier sélectionné :', this.selectedFile);
    }
  }

  modifier_photo() {
    

  const articleData = new FormData();
  if(this.selectedFile)
  {
  articleData.append('files[]', this.selectedFile);
  }

    console.log(articleData)
  
    // Appeler la méthode updateProductPhoto du service article
    this.articleService.updateProductPhoto(this.articleId,articleData).subscribe(
      (response) => {
        // Gérer la réponse de l'API (succès)
        console.log(response);
        
        this.snackBar.open('Photo de l\'article mis à jour avec succès', 'Fermer', {
          duration: 3000, 
          panelClass : ['success-snackbar']
        });
        setTimeout(() => {
          this.router.navigate(['/tabs-vendeur/list-article-vendeur']);
        }, 100); // Attendre 100 millisecondes avant de rediriger
  
        // Recharger la page après la redirection
        setTimeout(() => {
          window.location.reload();
        }, 200);
      },
      (error) => {
        // Gérer l'erreur
        console.error(error);
        // Afficher un message d'erreur à l'utilisateur
        this.snackBar.open('Erreur lors de l\'ajout de l\'article. Veuillez réessayer.', 'Fermer', {
          duration: 3000,
          panelClass : ['error-snackbar']
        });
      }
    );
  }

}
