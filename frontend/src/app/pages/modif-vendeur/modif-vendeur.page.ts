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
  seller: any = {};

  passwordType: string = 'password';
  passwordIcon: string = 'eye';

  constructor(
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.sellerId = this.route.snapshot.params['id'];
    console.log(this.sellerId);
    this.utilisateurService.getUser(this.sellerId).subscribe(
      (response) => {
        this.seller = response;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des données du vendeur : ',
          error
        );
      }
    );
  }

  updateSeller() {
    const username = (document.getElementById('username') as HTMLInputElement)
      .value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    const telephone = (document.getElementById('telephone') as HTMLInputElement)
      .value;
    const adresse = (document.getElementById('adresse') as HTMLInputElement)
      .value;

    if (!username || !email || !password || !telephone || !adresse) {
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
      username: username,
      email: email,
      password: password,
      telephone: telephone,
      adresse: adresse,
    };

    this.utilisateurService.updateSeller(this.sellerId, userData).subscribe(
      (response) => {
        console.log(response);

        this.snackBar.open('Vendeur mis a jour avec succés', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        setTimeout(() => {
          this.router.navigate(['/tabs-admin/list-vendeur']);
        }, 100);

        setTimeout(() => {
          window.location.reload();
        }, 200);
      },
      (error) => {
        console.error(error);
        this.snackBar.open(
          'Erreur lors de la mise à jour du vendeur. Veuillez réessayer.',
          'Fermer',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      }
    );
  }

  togglePassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
  }
}
