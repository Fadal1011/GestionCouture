import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './article/article.component';
import { ArticleVenteComponent } from './article-vente/article-vente.component';

const routes: Routes = [
  { path: 'categorie', component: CategorieComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'articleVente', component: ArticleVenteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
