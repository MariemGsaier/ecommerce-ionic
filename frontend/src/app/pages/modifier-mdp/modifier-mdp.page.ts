import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-modifier-mdp',
  templateUrl: './modifier-mdp.page.html',
  styleUrls: ['./modifier-mdp.page.scss'],
})
export class ModifierMdpPage implements OnInit {
  userId!: number;
  user: any = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };
  password?: string;

  constructor(
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);
    this.utilisateurService.getUser(this.userId).subscribe(
      (response) => {
        this.password = response[3]; // Assigner la valeur du nom d'utilisateur

        console.log('user', response);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des données de l"utilisateur : ',
          error
        );
      }
    );
  }

  updatePassword() {
    if (
      !this.user.old_password ||
      !this.user.new_password ||
      !this.user.confirm_password
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
    if (this.user.old_password !== this.password) {
      this.snackBar.open('l"ancien mot de passe est icnorrecte ! .', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
    if (this.user.new_password !== this.user.confirm_password) {
      this.snackBar.open(
        ' La confirmation mot de passe n"est pas compatible !',
        'Fermer',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
        }
      );
      return;
    }

    const userData = {
      new_password: this.user.new_password,
      old_password: this.user.old_password,
    };
    console.log('userData', userData);

    this.utilisateurService.updatePwd(this.userId, userData).subscribe(
      (response) => {
        console.log(response);

        this.snackBar.open('Mot de passe a jour avec succés', 'Fermer', {
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
          'Erreur lors de la mise à jour du mot de passe. Veuillez réessayer.',
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
