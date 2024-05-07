import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifArticlePageRoutingModule } from './modif-article-routing.module';

import { ModifArticlePage } from './modif-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifArticlePageRoutingModule
  ],
  declarations: [ModifArticlePage]
})
export class ModifArticlePageModule {}
