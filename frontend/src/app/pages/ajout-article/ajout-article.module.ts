import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, Platform } from '@ionic/angular';

import { AjoutArticlePageRoutingModule } from './ajout-article-routing.module';

import { AjoutArticlePage } from './ajout-article.page';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutArticlePageRoutingModule
  ],
  providers: [
    Camera,
    Platform,
  ],
  declarations: [AjoutArticlePage]
})
export class AjoutArticlePageModule {}
