import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;

  passwordType: string = 'password';
  passwordIcon: string = 'eye';

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  togglePassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
  }

  selectedFile: File | null = null;

  //sélectionne d'un fichier
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log('Fichier sélectionné :', this.selectedFile);
    }
  }

  register() {
    // Récupérer les valeurs des champs du formulaire
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

    const articleData = new FormData();
    articleData.append('username', username);
    articleData.append('email', email);
    articleData.append('password', password);
    articleData.append('telephone', telephone);
    articleData.append('adresse', adresse);
    if (this.selectedFile) {
      articleData.append('files[]', this.selectedFile);
    }

    this.utilisateurService.signup(articleData).subscribe(
      (response) => {
        console.log(response);

        this.snackBar.open('Inscription réussie', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        // Rediriger l'utilisateur vers une autre page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        this.snackBar.open(
          "Erreur lors de l'inscription. Veuillez réessayer.",
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
