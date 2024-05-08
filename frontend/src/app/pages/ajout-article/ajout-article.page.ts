import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.page.html',
  styleUrls: ['./ajout-article.page.scss'],
})
export class AjoutArticlePage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;

  userIdNumber!: string;
  imageSource: any;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    // Vérifier si l'id user existe
    if (userId) {
      // Conversion de id en nombre
      this.userIdNumber = userId;
    }
  }

  selectedFile: File | null = null;

  //selection du fichier
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log('Fichier sélectionné :', this.selectedFile);
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      saveToGallery: true,
    });
    if (Capacitor.getPlatform() === 'web') {
      if (image.base64String) {
        this.convertBase64ToFile(image.base64String);
      }
    } else {
      this.imageSource = 'data:image/jpeg;base64,' + image.base64String;
      console.log(this.imageSource);
    }
  };
  convertBase64ToFile(base64String: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    this.selectedFile = file;
    console.log('Fichier sélectionné :', this.selectedFile);
  }
  ajouter_article() {
    // Récupération  des champs du formulaire
    const categorie = document.getElementById('categorie');
    const categorieValue = (categorie as HTMLIonSelectElement).value;
    const libelle = (document.getElementById('libelle') as HTMLInputElement)
      .value;
    const prix = (document.getElementById('prix') as HTMLInputElement).value;
    const description = (
      document.getElementById('description') as HTMLInputElement
    ).value;
    // Vérification si tous les champs sont remplis
    if (
      !categorieValue ||
      !libelle ||
      !prix ||
      !this.selectedFile ||
      !description
    ) {
      // Afficher un message d'erreur
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

    const articleData = new FormData();
    articleData.append('libelle', libelle);
    articleData.append('categoryId', categorieValue);
    articleData.append('prix', prix);
    articleData.append('description', description);
    articleData.append('vendeurId', this.userIdNumber);
    articleData.append('files[]', this.selectedFile);

    console.log(articleData);

    //addProduct du service article
    this.articleService.addProduct(articleData).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Article ajouté avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        // Rediriger l'utilisateur vers une autre page
        setTimeout(() => {
          this.router.navigate(['/tabs-vendeur/list-article-vendeur']);
        }, 100);

        // Recharger la page après la redirection
        setTimeout(() => {
          window.location.reload();
        }, 200);
      },
      (error) => {
        console.error(error);

        this.snackBar.open(
          "Erreur lors de l'ajout de l'article. Veuillez réessayer.",
          'Fermer',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      }
    );
  }
}
