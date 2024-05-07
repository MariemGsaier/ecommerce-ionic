import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListArticleVendeurPageRoutingModule } from './list-article-vendeur-routing.module';

import { ListArticleVendeurPage } from './list-article-vendeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListArticleVendeurPageRoutingModule
  ],
  declarations: [ListArticleVendeurPage]
})
export class ListArticleVendeurPageModule {}
