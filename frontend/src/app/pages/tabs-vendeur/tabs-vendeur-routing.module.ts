import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsVendeurPage } from './tabs-vendeur.page';

const routes: Routes = [
  {
    path: '',
    component: TabsVendeurPage,
    children:[
      {
        path: 'profile-client',
        loadChildren: () => import('../profile-client/profile-client.module').then( m => m.ProfileClientPageModule)
      },

      {
        path:'list-article-vendeur',
        loadChildren: () => import('../list-article-vendeur/list-article-vendeur.module').then( m => m.ListArticleVendeurPageModule)
      },
      {
        path: 'ajout-article',
        loadChildren: () =>
          import('../ajout-article/ajout-article.module').then(
            (m) => m.AjoutArticlePageModule
          ),
      },
      {
        path: 'modif-article/:id',
        loadChildren: () =>
          import('../modif-article/modif-article.module').then(
            (m) => m.ModifArticlePageModule
          ),
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
              import('..//modifier-mdp/modifier-mdp.module').then(
                (m) => m.ModifierMdpPageModule
              ),
          },
          {
            path: 'update-photo-article/:id',
            loadChildren: () => import('../update-photo-article/update-photo-article.module').then( m => m.UpdatePhotoArticlePageModule)
          },

          {
            path: 'update-phot-user/:id',
            loadChildren: () => import('../update-phot-user/update-phot-user.module').then( m => m.UpdatePhotUserPageModule)
          },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsVendeurPageRoutingModule {}
