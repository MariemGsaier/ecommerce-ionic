import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.page.html',
  styleUrls: ['./modifier-profil.page.scss'],
})
export class ModifierProfilPage implements OnInit {
  userId!: number;
  user: any = {};
  new_username?: string;
  new_email?: string;
  new_phone?: string;
  new_adresse?: string;

  constructor(
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);
    this.utilisateurService.getUser(this.userId).subscribe(
      (response) => {
        this.user = response;
        this.new_username = this.user[1];
        this.new_email = this.user[2];
        this.new_phone = this.user[4];
        this.new_adresse = this.user[5];
        console.log('user', this.user);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des données du vendeur : ',
          error
        );
      }
    );
  }

  updateProfile() {
    if (
      !this.new_username ||
      !this.new_email ||
      !this.new_phone ||
      !this.new_adresse
    ) {
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
    const userData = {
      new_username: this.new_username,
      new_email: this.new_email,
      new_phone: this.new_phone,
      new_adresse: this.new_adresse,
    };
    console.log('userData', userData);

    this.utilisateurService.updateProfile(this.userId, userData).subscribe(
      (response) => {
        console.log(response);

        this.snackBar.open('Profil mis a jour avec succés', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.utilisateurService
          .getProfileById(this.userId)
          .subscribe((profileResponse) => {
            console.log(profileResponse);
            const role = profileResponse[7];
            console.log(role);
            // Rediriger l'utilisateur en fonction de son rôle
            switch (role) {
              case 'client':
                this.router.navigate(['/tabs/profile-client']);
                break;
              case 'vendeur':
                this.router.navigate(['/tabs-vendeur/profile-client']);
                break;
              case 'admin':
                this.router.navigate(['/tabs-admin/profile-client']);
                break;
            }
            setTimeout(() => {
              window.location.reload();
            }, 200);
          });
      },

      (error) => {
        console.error(error);
        this.snackBar.open(
          'Erreur lors de la mise à jour du profil. Veuillez réessayer.',
          'Fermer',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      }
    );
  }

  back() {
    this.utilisateurService
      .getProfileById(this.userId)
      .subscribe((profileResponse) => {
        console.log(profileResponse);
        const role = profileResponse[7];
        console.log(role);
        // Rediriger l'utilisateur en fonction de son rôle
        switch (role) {
          case 'client':
            this.router.navigate(['/tabs/profile-client']);
            break;
          case 'vendeur':
            this.router.navigate(['/tabs-vendeur/profile-client']);
            break;
          case 'admin':
            this.router.navigate(['/tabs-admin/profile-client']);
            break;
        }
      });
  }
}
