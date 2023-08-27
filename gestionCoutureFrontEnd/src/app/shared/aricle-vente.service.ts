import { Injectable } from '@angular/core';
import { ApiAbstractService } from '../api-abstract.service';
import { Article, ArticleVente, RecupDonnee, ResponseBack } from '../response-back';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AricleVenteService extends ApiAbstractService<RecupDonnee> {

  localhost = environment.localhost;
  constructor(private http:HttpClient){
    super(http);
  }

  override uri(): string {
    return '/aricle_categorie'
  }

  AddArticle(article:ArticleVente):Observable<ResponseBack>{
  return this.http.post<ResponseBack>(`${this.localhost}/articleVente`,article);
}


getArticleVente(page?:number):Observable<ResponseBack>{
  return this.http.get<ResponseBack>(`${this.localhost}/articleVente?page=${page}`);
}


}
