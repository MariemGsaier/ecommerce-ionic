import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-update-phot-user',
  templateUrl: './update-phot-user.page.html',
  styleUrls: ['./update-phot-user.page.scss'],
})
export class UpdatePhotUserPage implements OnInit {
  userIdNumber!: number;
  userId!: number;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);

    const userIdSes = localStorage.getItem('userId');
    console.log(userIdSes);
    // Vérifier si l'id existe
    if (userIdSes) {
      // Convertir l'id en nombre
      this.userIdNumber = +userIdSes;
    }
  }

  selectedFile: File | null = null;

  // sélection  fichier
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log('Fichier sélectionné :', this.selectedFile);
    }
  }

  modifier_photo() {
    const userData = new FormData();
    if (this.selectedFile) {
      userData.append('files[]', this.selectedFile);
    }

    console.log(userData);

    this.utilisateurService.updateUserPhoto(this.userId, userData).subscribe(
      (response) => {
        console.log(response);

        this.snackBar.open('Photo mis à jour avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });

        this.utilisateurService
          .getProfileById(this.userIdNumber)
          .subscribe((profileResponse) => {
            console.log(profileResponse);
            // Récupération du rôle de l'utilisateur
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
          'Erreur lors de la modification de la photo. Veuillez réessayer.',
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
