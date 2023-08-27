import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBack } from '../response-back';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategorieService {

  localhost:string='http://127.0.0.1:8000/api';

  constructor(private http:HttpClient) {}

  all():Observable<ResponseBack>{
    return this.http.get<ResponseBack>(`${this.localhost}/all`)
  }
  listCategories(pageNumber: number):Observable<ResponseBack>{
    return this.http.get<ResponseBack>(`${this.localhost}/listLibelle?page=${pageNumber}`)
  }

  addCategorie(categorie:{}):Observable<ResponseBack> {
    return this.http.post<ResponseBack>(`${this.localhost}/addLibelle`,categorie);
  }
  searchCategorie(libelleCategorie:string){
    return this.http.get(`${this.localhost}/searchLibelle/libelle/${libelleCategorie}`)
  }

  supprimerCategorie(idsCategorie:{}):Observable<ResponseBack>{
    return this.http.post<ResponseBack>(`${this.localhost}/deleteLibelle`,idsCategorie)
  }

  modifierCategorie(categorie:{},id:number):Observable<ResponseBack>{
    return this.http.put<ResponseBack>(`${this.localhost}/modifierLibelle/${id}`,categorie)
  }
}
