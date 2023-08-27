import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { Article, RecupDonnee, ResponseBack } from '../response-back';
import { FormGroup } from '@angular/forms';
import { ApiAbstractService } from '../api-abstract.service';


@Injectable({
  providedIn: 'root'
})
export class ArticleService extends ApiAbstractService<RecupDonnee> {

  localhost = environment.localhost
  constructor(private http:HttpClient){
    super(http);
  }
  override uri(): string {
    return '/categorie_fournisseur'
  }



  // showSuccess(message: string) {
  //   this.toastr.success(message);
  // }

  // showError(message: string) {
  //   this.toastr.error(message);
  // }


  AddArticle(article:Article):Observable<Article>{
    return this.http.post<Article>(`${this.localhost}/article`,article);
  }

  listArticle(page?:number):Observable<ResponseBack>{
    return this.http.get<ResponseBack>(`${this.localhost}/article?page=${page}`)

  }



  // recupDonnee():Observable<RecupDonnee>{
  //   return this.http.get<RecupDonnee>(`${this.localhost}/categorie_fournisseur`);
  // }

  Delete(id:number):Observable<number>{
    return this.http.delete<number>(`${this.localhost}/article/${id}`);
  }

  UpdateArticle(article:Article,id:number):Observable<Article>{
   return this.http.put<Article>(`${this.localhost}/article/${id}`,article);
  }


}
