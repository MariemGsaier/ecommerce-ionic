import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'profile-client',
        loadChildren: () => import('../profile-client/profile-client.module').then( m => m.ProfileClientPageModule)
      },

      {
        path:'home',
        loadChildren: () => import('../../home/home.module').then( m => m.HomePageModule)
      },

      {
        path: 'panier',
        loadChildren: () => import('../panier/panier.module').then( m => m.PanierPageModule)
      },

      {
        path: 'modifier-profil/:id',
        loadChildren: () =>
          import('../modifier-profil/modifier-profil.module').then(
            (m) => m.ModifierProfilPageModule
          ),
      },
      {
        path: 'modifier-mdp/:id',
        loadChildren: () =>
          import('../modifier-mdp/modifier-mdp.module').then(
            (m) => m.ModifierMdpPageModule
          ),
      },
      {
        path: 'paiement',
        loadChildren: () =>
          import('../paiement/paiement.module').then(
            (m) => m.PaiementPageModule
          ),
      },
      {
        path: 'evaluate-article/:id',
        loadChildren: () => import('../evaluate-article/evaluate-article.module').then( m => m.EvaluateArticlePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}


