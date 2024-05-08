import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PanierService } from 'src/app/services/panier.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.page.html',
  styleUrls: ['./profile-client.page.scss'],
})
export class ProfileClientPage implements OnInit {
  userIdNumber!: number;

  user: any = {};

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService,
    private alertController: AlertController,
    private panierService: PanierService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    // Vérifier si l'id existe
    if (userId) {
      // Convertir l'ID en nombre
      this.userIdNumber = +userId;
    }
    this.utilisateurService.getProfileById(this.userIdNumber).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des données du vendeur : ',
          error
        );
      }
    );
  }
  toUpdateProfil(id: number) {
    this.utilisateurService.getProfileById(id).subscribe((profileResponse) => {
      console.log(profileResponse);
      // Récupérer le rôle de l'utilisateur
      const role = profileResponse[7];
      console.log(role);
      // Rediriger l'utilisateur en fonction de son rôle
      switch (role) {
        case 'client':
          this.router.navigate(['/tabs/modifier-profil', id]);
          break;
        case 'vendeur':
          this.router.navigate(['/tabs-vendeur/modifier-profil', id]);
          break;
        case 'admin':
          this.router.navigate(['/tabs-admin/modifier-profil', id]);
          break;
      }
    });
  }
  toUpdatePwd(id: number) {
    this.utilisateurService.getProfileById(id).subscribe((profileResponse) => {
      console.log(profileResponse);
      // Récupérer le rôle de l'utilisateur
      const role = profileResponse[7];
      console.log(role);
      // Rediriger l'utilisateur en fonction de son rôle
      switch (role) {
        case 'client':
          this.router.navigate(['/tabs/modifier-mdp', id]);
          break;
        case 'vendeur':
          this.router.navigate(['/tabs-vendeur/modifier-mdp', id]);
          break;
        case 'admin':
          this.router.navigate(['/tabs-admin/modifier-mdp', id]);
          break;
      }
    });
  }

  async confirmlogout() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Voulez-vous vraiment se déconnecter  ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Opération annulée');
          },
        },
        {
          text: 'Oui',
          handler: () => {
            this.logout();
          },
        },
      ],
    });
    await alert.present();
  }

  logout(): void {
    // Supprimer le jeton du localStorage
    localStorage.removeItem('token');
    // Supprimer l'id de l'utilisateur du localStorage
    localStorage.removeItem('userId');
    this.panierService.viderPanier();
    // Rediriger l'utilisateur vers la page de connexion
    this.router.navigate(['/login']);
  }
}
