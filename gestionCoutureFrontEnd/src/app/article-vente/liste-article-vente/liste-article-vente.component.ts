import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-liste-article-vente',
  templateUrl: './liste-article-vente.component.html',
  styleUrls: ['./liste-article-vente.component.css']
})
export class ListeArticleVenteComponent {
@Input() itemsPerPage!: number;
@Input() totalItems!: number;
@Input() recupId!: number;
@Input() currentPage!:number;
@Input() recupDonneeArticleVente!: [];

@Output() pagination = new EventEmitter();
@Output() idArticleVenteSuppresion = new EventEmitter();

@Output() idArticleVenteModification = new EventEmitter();
@Output() PerPage = new EventEmitter();
@Output() trierArticle = new EventEmitter();


Pagination(pageNumber: number) {
  this.pagination.emit(pageNumber);
}

recupIdArticleVente(id:number){
this.idArticleVenteSuppresion.emit(id);
}
recupIdArticleVenteModification(article:any){
this.idArticleVenteModification.emit(article);
}

recupPerpage(Event:any){
  const perPage = Event.target.value;
  this.PerPage.emit(perPage);
}

trierArticleEmit(Event:any){
  const libelle = Event.target.value;
  this.trierArticle.emit(libelle);
}
}
