import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  // {
  //   path: '',
  //   redirectTo: 'tabs/profile-client',
  //   pathMatch: 'full',
  // },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  /*
  {
    path: 'ajout-article',
    loadChildren: () =>
      import('./pages/ajout-article/ajout-article.module').then(
        (m) => m.AjoutArticlePageModule
      ),
  },
  {
    path: 'modif-article/:id',
    loadChildren: () =>
      import('./pages/modif-article/modif-article.module').then(
        (m) => m.ModifArticlePageModule
      ),
  },
  */
  /*{
    path: 'ajout-vendeur',
    loadChildren: () =>
      import('./pages/ajout-vendeur/ajout-vendeur.module').then(
        (m) => m.AjoutVendeurPageModule
      ),
  },*/
  /*
  {
    path: 'modif-vendeur/:id',
    loadChildren: () =>
      import('./pages/modif-vendeur/modif-vendeur.module').then(
        (m) => m.ModifVendeurPageModule
      ),
  },
  */
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  /*
  {
    path: 'list-vendeur',
    loadChildren: () =>
      import('./pages/list-vendeur/list-vendeur.module').then(
        (m) => m.ListVendeurPageModule
      ),
  },
  */
 /*
  {
    path: 'profile-vendeur',
    loadChildren: () =>
      import('./pages/profile-vendeur/profile-vendeur.module').then(
        (m) => m.ProfileVendeurPageModule
      ),
  },
  {
    path: 'panier',
    loadChildren: () =>
      import('./pages/panier/panier.module').then((m) => m.PanierPageModule),
  },
  */
  {
    path: 'profile-client',
    loadChildren: () =>
      import('./pages/profile-client/profile-client.module').then(
        (m) => m.ProfileClientPageModule
      ),
  },
  /*
  {
    path: 'list-article-vendeur',
    loadChildren: () =>
      import('./pages/list-article-vendeur/list-article-vendeur.module').then(
        (m) => m.ListArticleVendeurPageModule
      ),
  },*/
  // a supprimer baad ma tetgad fazet role
  // {
  //   path: 'modifier-profil/:id',
  //   loadChildren: () =>
  //     import('./pages/modifier-profil/modifier-profil.module').then(
  //       (m) => m.ModifierProfilPageModule
  //     ),
  // },
  // {
  //   path: 'modifier-mdp',
  //   loadChildren: () =>
  //     import('./pages/modifier-mdp/modifier-mdp.module').then(
  //       (m) => m.ModifierMdpPageModule
  //     ),
  // },
  /*
  {
    path: 'paiement',
    loadChildren: () =>
      import('./pages/paiement/paiement.module').then(
        (m) => m.PaiementPageModule
      ),
  },
  */
  {
    path: 'tabs-admin',
    loadChildren: () => import('./pages/tabs-admin/tabs-admin.module').then( m => m.TabsAdminPageModule)
  },
  {
    path: 'tabs-vendeur',
    loadChildren: () => import('./pages/tabs-vendeur/tabs-vendeur.module').then( m => m.TabsVendeurPageModule)
  },
  
  {
    path: 'update-phot-user/:id',
    loadChildren: () => import('./pages/update-phot-user/update-phot-user.module').then( m => m.UpdatePhotUserPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
