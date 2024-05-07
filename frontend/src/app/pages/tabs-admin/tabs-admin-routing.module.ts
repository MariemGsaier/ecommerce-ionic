import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAdminPage } from './tabs-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAdminPage,
    children:[
      {
        path: 'profile-client',
        loadChildren: () => import('../profile-client/profile-client.module').then( m => m.ProfileClientPageModule)
      },

      {
        path:'list-vendeur',
        loadChildren: () => import('../list-vendeur/list-vendeur.module').then( m => m.ListVendeurPageModule)
      },
      {
        path: 'ajout-vendeur',
        loadChildren: () =>
          import('../ajout-vendeur/ajout-vendeur.module').then(
            (m) => m.AjoutVendeurPageModule
          ),
      },
      {
        path: 'modif-vendeur/:id',
        loadChildren: () =>
          import('../modif-vendeur/modif-vendeur.module').then(
            (m) => m.ModifVendeurPageModule
          ),
      },
      {
        path: 'update-phot-user/:id',
        loadChildren: () => import('../update-phot-user/update-phot-user.module').then( m => m.UpdatePhotUserPageModule)
      },

      {
        path: 'modifier-profil/:id',
        loadChildren: () =>
          import('../modifier-profil/modifier-profil.module').then(
            (m) => m.ModifierProfilPageModule
          ),
      },

      {
        path: 'modifier-mdp',
        loadChildren: () =>
          import('../modifier-mdp/modifier-mdp.module').then(
            (m) => m.ModifierMdpPageModule
          ),
      },

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAdminPageRoutingModule {}
