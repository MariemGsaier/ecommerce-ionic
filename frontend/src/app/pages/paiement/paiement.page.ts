import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { PanierService } from 'src/app/services/panier.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {
  selectedPaymentMethod: string = 'cash';
  changeDeliveryAddress: boolean = false;
  clientId!: number;
  adresse_user?: string;
  commande: any = {
    montant: '',
    adresse_livraison: '',
    num_carte: '',
    date_expiration: '',
    code_secret: '',
  };

  constructor(
    private commandeService: CommandeService,
    private snackBar: MatSnackBar,
    private utilisateurService: UtilisateurService,
    private router: Router,
    private panierService: PanierService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (userId) {
      // Convertir l'ID en nombre
      this.clientId = +userId;
    }

    this.utilisateurService.getUser(this.clientId).subscribe(
      (response) => {
        this.commande.adresse_livraison = response[5];
        console.log(
          'adresse client',
          (this.commande.adresse_livraison = response[5])
        );
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des données de l"utilisateur : ',
          error
        );
      }
    );
    this.commande.montant = this.panierService.calculateTotal();
  }

  passerCommande() {
    if (this.selectedPaymentMethod == 'carteBancaire') {
      if (
        !this.commande.num_carte ||
        !this.commande.date_expiration ||
        !this.commande.code_secret
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
    }
    if (this.changeDeliveryAddress && !this.commande.adresse_livraison) {
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

    const commandeData = {
      montant: this.commande.montant,
      adresse_livraison: this.commande.adresse_livraison,
      date: new Date(),
      clientId: this.clientId,
    };

    this.commandeService.passerCommande(commandeData).subscribe(
      (response) => {
        console.log(response);
        this.panierService.viderPanier();

        this.snackBar.open('Commande passée avec succés', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });

        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        this.snackBar.open(
          "Erreur lors de l'ajout de l'article. Veuillez réessayer.",
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
