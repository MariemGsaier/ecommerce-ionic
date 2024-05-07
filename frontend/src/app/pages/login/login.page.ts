import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye';

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  /*
  togglePassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text'; 
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye'; 
  }
*/
  login() {
    // Récupérer les valeurs des champs du formulaire
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;

    // Effectuer des validations ici
    // Vérifier si tous les champs sont remplis
    if (!email || !password) {
      // Afficher un message d'erreur à l'utilisateur
      this.snackBar.open(
        'Veuillez remplir tous les champs du formulaire.',
        'Fermer',
        {
          duration: 3000,
          panelClass: ['red-snackbar'],
        }
      );
      return; // Arrêter l'exécution de la méthode
    }

    // Appeler la méthode signup du service utilisateur
    this.utilisateurService.login(email, password).subscribe(
      (response) => {
        // Gérer la réponse de l'API (succès)
        console.log(response);
        // Gérer la réponse de l'API (succès)
        const token = response.token;
        const userId = response.user_id;

        // Enregistrer le token dans le localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        // Appeler la méthode getProfile pour obtenir les informations complètes de l'utilisateur
        this.utilisateurService.getProfileById(userId).subscribe(
          (profileResponse) => {
            console.log(profileResponse);
            // Récupérer le rôle de l'utilisateur depuis la réponse de getProfile
            const role = profileResponse[7];
            console.log(role);
            // Rediriger l'utilisateur en fonction de son rôle
            switch (role) {
              case 'client':
                this.router.navigate(['/tabs/home']);
                break;
              case 'vendeur':
                this.router.navigate(['/tabs-vendeur/list-article-vendeur']);
                break;
              case 'admin':
                this.router.navigate(['/tabs-admin/list-vendeur']);
                break;
              default:
                // Redirection par défaut si le rôle n'est pas reconnu
                this.router.navigate(['/login']);
                break;
            }
            setTimeout(() => {
              window.location.reload();
            }, 200);

            this.snackBar.open('Authentification réussie', 'Fermer', {
              duration: 3000, // Durée du snackbar en millisecondes
              panelClass: ['green-snackbar'],
            });
          },
          (error) => {
            // Gérer l'erreur (échec de récupération du profil)
            console.error(error);
            this.router.navigate(['/login']); // Rediriger vers la page de connexion en cas d'erreur
          }
        );
      },

      (error) => {
        // Gérer l'erreur (échec de l'inscription)
        console.error(error);
        // Afficher un message d'erreur à l'utilisateur
        this.snackBar.open(
          "Erreur lors de l'authentification. Vérifier vos informations.",
          'Fermer',
          {
            duration: 3000, // Durée du snackbar en millisecondes
            panelClass: ['red-snackbar'],
          }
        );
      }
    );
  }
}
