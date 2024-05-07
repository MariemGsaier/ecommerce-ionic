import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluateArticlePageRoutingModule } from './evaluate-article-routing.module';

import { EvaluateArticlePage } from './evaluate-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluateArticlePageRoutingModule
  ],
  declarations: [EvaluateArticlePage]
})
export class EvaluateArticlePageModule {}
