import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { AlertController } from '@ionic/angular';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-vendeur',
  templateUrl: './list-vendeur.page.html',
  styleUrls: ['./list-vendeur.page.scss'],
})
export class ListVendeurPage implements OnInit {
  sellers: any[] = [];
  filteredSellers: any[] = [];

  constructor(private utilisateurService: UtilisateurService,
    private alertController: AlertController,private snackBar: MatSnackBar) { 
   

  }

  ngOnInit() {
    this.getSellers();
  }

  getSellers() {
    this.utilisateurService.getSellers().subscribe(
      (response) => {
        this.sellers = response.sellers;
        this.filteredSellers = this.sellers.slice();
      },
      (error) => {
        console.error('Erreur lors de la récupération des vendeurs :', error);
      }
    );
  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();

    // Filtrer les articles par rapport à la liste complète des articles
    this.filteredSellers = this.sellers.filter((sellers) =>
    sellers.nom_utilisateur.toLowerCase().includes(filterValue)
    );
  }

   // Fonction pour confirmer la suppression d'un vendeur
   async confirmDelete(seller: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Voulez-vous vraiment supprimer ${seller.nom_utilisateur} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Opération annulée');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.deleteSeller(seller);
          }
        }
      ]
    });

    await alert.present();
  }

  // Fonction pour supprimer un vendeur
  deleteSeller(seller: any) {
    this.utilisateurService.deleteSeller(seller.id).subscribe(
      (response) => {
        console.log('Vendeur supprimé avec succès : ', response.message);
        this.snackBar.open('Vendeur supprimé avec succés', 'Fermer', {
          duration: 3000, // Durée du snackbar en millisecondes
          panelClass : ['success-snackbar']
        });
        // Rechargez la liste des vendeurs après la suppression
        this.getSellers();
      },
      (error) => {
        console.error('Erreur lors de la suppression du vendeur : ', error);
        this.snackBar.open('Ce vendeur a des articles. Supprimez-les d\'abord', 'Fermer', {
          duration: 3000, // Durée du snackbar en millisecondes
          panelClass : ['error-snackbar']
        });
      }
    );
  }

 // Fonction pour la recherche
 onSearch(event: CustomEvent) {
  const searchTerm = (event.target as HTMLInputElement).value;
 

  // Si vous avez une liste complète de vendeurs non filtrée
  const filteredSellers = this.sellers.filter(seller => {
    return seller.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Maintenant, mettez à jour la liste des vendeurs pour afficher les résultats de recherche filtrés
  this.sellers = filteredSellers;
}

// Fonction pour ajouter un vendeur
onAddSeller() {
  // Implémentez la logique pour ajouter un vendeur ici
}

// Fonction pour modifier un vendeur
onEditSeller(seller: any) {
  // Implémentez la logique pour modifier un vendeur ici
}

// Fonction pour supprimer un vendeur
onDeleteSeller(seller: any) {
  // Implémentez la logique pour supprimer un vendeur ici
}

}
