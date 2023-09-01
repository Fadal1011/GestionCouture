import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // CLI imports
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListeArticleComponent } from './article/liste-article/liste-article.component';
import { ItemsComponent } from './article/liste-article/items/items.component';
import { ArticleVenteComponent } from './article-vente/article-vente.component';
import { ListeArticleVenteComponent } from './article-vente/liste-article-vente/liste-article-vente.component';
import { ItemArticleVenteComponent } from './article-vente/liste-article-vente/item-article-vente/item-article-vente.component';




@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormComponent,
    NavbarComponent,
    ListeArticleComponent,
    ItemsComponent,
    ArticleVenteComponent,
    ListeArticleVenteComponent,
    ItemArticleVenteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
