import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePhotoArticlePageRoutingModule } from './update-photo-article-routing.module';

import { UpdatePhotoArticlePage } from './update-photo-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePhotoArticlePageRoutingModule
  ],
  declarations: [UpdatePhotoArticlePage]
})
export class UpdatePhotoArticlePageModule {}
