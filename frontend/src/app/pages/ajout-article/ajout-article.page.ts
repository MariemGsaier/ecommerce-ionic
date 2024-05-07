import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core'; // Ajoutez cette ligne pour importer Capacitor

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
    // Vérifier si l'ID existe
    if (userId) {
      // Convertir l'ID en nombre (car localStorage stocke les valeurs en chaînes de caractères)
      this.userIdNumber = userId;
    }
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

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      saveToGallery: true,
    });

    // Si l'utilisateur utilise Capacitor pour prendre la photo, convertissez l'image Base64 en fichier
    if (Capacitor.getPlatform() === 'web') {
      if (image.base64String) {
        this.convertBase64ToFile(image.base64String);
      }
    } else {
      this.imageSource = 'data:image/jpeg;base64,' + image.base64String;
      console.log(this.imageSource);
    }
  };

  // Fonction pour convertir l'image Base64 en fichier
  convertBase64ToFile(base64String: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Créez un nouveau fichier à partir du blob
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

    // Enregistrez le fichier dans la variable selectedFile
    this.selectedFile = file;
    console.log('Fichier sélectionné :', this.selectedFile);
  }

  ajouter_article() {
    // Récupérer les valeurs des champs du formulaire
    const categorie = document.getElementById('categorie');
    const categorieValue = (categorie as HTMLIonSelectElement).value;
    const libelle = (document.getElementById('libelle') as HTMLInputElement)
      .value;
    const prix = (document.getElementById('prix') as HTMLInputElement).value;
    const description = (
      document.getElementById('description') as HTMLInputElement
    ).value;
    // console.log(categorieValue)
    // Vérifier si tous les champs sont remplis
    if (
      !categorieValue ||
      !libelle ||
      !prix ||
      !this.selectedFile ||
      !description
    ) {
      // Afficher un message d'erreur à l'utilisateur
      this.snackBar.open(
        'Veuillez remplir tous les champs du formulaire.',
        'Fermer',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
        }
      );
      return; // Arrêter l'exécution de la méthode
    }

    const articleData = new FormData();
    articleData.append('libelle', libelle);
    articleData.append('categoryId', categorieValue);
    articleData.append('prix', prix);
    articleData.append('description', description);
    articleData.append('vendeurId', this.userIdNumber);
    articleData.append('files[]', this.selectedFile);

    console.log(articleData);

    // Appeler la méthode addProduct du service article
    this.articleService.addProduct(articleData).subscribe(
      (response) => {
        // Gérer la réponse de l'API (succès)
        console.log(response);

        this.snackBar.open('Article ajouté avec succès', 'Fermer', {
          duration: 3000, // Durée du snackbar en millisecondes
          panelClass: ['success-snackbar'],
        });
        // Rediriger l'utilisateur vers une autre page (par exemple, la page de liste des articles)
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
