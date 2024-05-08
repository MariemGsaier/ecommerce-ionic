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

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;

    if (!email || !password) {
      this.snackBar.open(
        'Veuillez remplir tous les champs du formulaire.',
        'Fermer',
        {
          duration: 3000,
          panelClass: ['red-snackbar'],
        }
      );
      return;
    }

    this.utilisateurService.login(email, password).subscribe(
      (response) => {
        console.log(response);
        const token = response.token;
        const userId = response.user_id;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        this.utilisateurService.getProfileById(userId).subscribe(
          (profileResponse) => {
            console.log(profileResponse);
            const role = profileResponse[7];
            console.log(role);
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
                this.router.navigate(['/login']);
                break;
            }
            setTimeout(() => {
              window.location.reload();
            }, 200);

            this.snackBar.open('Authentification réussie', 'Fermer', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
          },
          (error) => {
            console.error(error);
            this.router.navigate(['/login']);
          }
        );
      },

      (error) => {
        console.error(error);
        this.snackBar.open(
          "Erreur lors de l'authentification. Vérifier vos informations.",
          'Fermer',
          {
            duration: 3000,
            panelClass: ['red-snackbar'],
          }
        );
      }
    );
  }
}
