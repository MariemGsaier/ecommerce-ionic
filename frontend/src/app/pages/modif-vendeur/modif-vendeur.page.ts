import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modif-vendeur',
  templateUrl: './modif-vendeur.page.html',
  styleUrls: ['./modif-vendeur.page.scss'],
})
export class ModifVendeurPage implements OnInit {
  sellerId!: number;
  seller: any = {}; // Objet pour stocker les données du vendeur

  /*
  fileInput!: HTMLInputElement; 
*/

  passwordType: string = 'password'; 
  passwordIcon: string = 'eye'; 
  
  constructor( private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    private router: Router,)
     { }

    ngOnInit() {
      // Récupérer l'ID du vendeur à partir des paramètres de l'URL
      this.sellerId = this.route.snapshot.params['id'];
      console.log(this.sellerId)
      // Appeler la méthode du service pour récupérer les données du vendeur
      this.utilisateurService.getUser(this.sellerId).subscribe(
        (response) => {
          this.seller = response; 
          // console.log(this.seller)
        },
        (error) => {
          console.error('Erreur lors de la récupération des données du vendeur : ', error);
        }
      );
    }

    updateSeller()
    {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const telephone = (document.getElementById('telephone') as HTMLInputElement).value;
    const adresse = (document.getElementById('adresse') as HTMLInputElement).value;
    
      // Vérifier si tous les champs sont remplis
      if (!username || !email || !password || !telephone || !adresse) {
        // Afficher un message d'erreur à l'utilisateur
        this.snackBar.open('Veuillez remplir tous les champs du formulaire.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return; // Arrêter l'exécution de la méthode
  }
  const userData = {
    username: username,
    email: email,
    password: password,
    telephone: telephone,
    adresse: adresse,
  };

  this.utilisateurService.updateSeller(this.sellerId,userData).subscribe(
    (response) => {
      // Gérer la réponse de l'API (succès)
      console.log(response);
      
      this.snackBar.open('Vendeur mis a jour avec succés', 'Fermer', {
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
      this.snackBar.open('Erreur lors de la mise à jour du vendeur. Veuillez réessayer.', 'Fermer', {
        duration: 3000, // Durée du snackbar en millisecondes
        panelClass : ['error-snackbar']
      });
    }
  );
}

  togglePassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text'; 
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye'; 
  }

  // openFileInput() {
  //   this.fileInput.click();
  // }

  // Fonction appelée lorsque l'utilisateur sélectionne un fichier
  // onFileSelected(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if ( inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0]; // Récupère le premier fichier sélectionné
  //     // Faites ce que vous voulez avec le fichier sélectionné, par exemple l'envoyer au serveur, le prévisualiser, etc.
  //     console.log('Fichier sélectionné :', file);
  //   }
  // }

}
