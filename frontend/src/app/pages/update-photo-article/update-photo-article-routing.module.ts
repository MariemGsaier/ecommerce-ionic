import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePhotoArticlePage } from './update-photo-article.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePhotoArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePhotoArticlePageRoutingModule {}
