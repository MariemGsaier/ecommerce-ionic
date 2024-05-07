import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-vendeur',
  templateUrl: './ajout-vendeur.page.html',
  styleUrls: ['./ajout-vendeur.page.scss'],
})
export class AjoutVendeurPage implements OnInit {

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }



  passwordType: string = 'password'; 
  passwordIcon: string = 'eye'; 

  ngOnInit() {
  }

  togglePassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text'; 
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye'; 
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

  ajouter_vendeur() {
    // Récupérer les valeurs des champs du formulaire
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const telephone = (document.getElementById('telephone') as HTMLInputElement).value;
    const adresse = (document.getElementById('adresse') as HTMLInputElement).value;
   
   
    
    // Effectuer des validations ici
     // Vérifier si tous les champs sont remplis
     if (!username || !email || !password || !telephone || !adresse ) {
      // Afficher un message d'erreur à l'utilisateur
      this.snackBar.open('Veuillez remplir tous les champs du formulaire.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return; // Arrêter l'exécution de la méthode
    }

    const articleData = new FormData();
    articleData.append('username', username);
    articleData.append('email', email);
    articleData.append('password', password);
    articleData.append('telephone', telephone);
    articleData.append('adresse', adresse); 
    if (this.selectedFile) {
    articleData.append('files[]', this.selectedFile);
    }
    console.log(articleData)
    // Appeler la méthode signup du service utilisateur
    this.utilisateurService.addSeller(articleData).subscribe(
      (response) => {
        // Gérer la réponse de l'API (succès)
        console.log(response);
        
        this.snackBar.open('Vendeur ajouté avec succés', 'Fermer', {
          duration: 3000, // Durée du snackbar en millisecondes
          panelClass : ['success-snackbar']
        });
        // Rediriger l'utilisateur vers une autre page (par exemple, la page de connexion)
        setTimeout(() => {
          this.router.navigate(['/tabs-admin/list-vendeur']);
        }, 100); // Attendre 100 millisecondes avant de rediriger
  
        // Recharger la page après la redirection
        setTimeout(() => {
          window.location.reload();
        }, 200);
      },
      (error) => {
        // Gérer l'erreur (échec de l'inscription)
        console.error(error);
        // Afficher un message d'erreur à l'utilisateur
        this.snackBar.open('Erreur lors de l\'ajout du vendeur. Veuillez réessayer.', 'Fermer', {
          duration: 3000, // Durée du snackbar en millisecondes
          panelClass : ['error-snackbar']
        });
      }
    );
    }
}
