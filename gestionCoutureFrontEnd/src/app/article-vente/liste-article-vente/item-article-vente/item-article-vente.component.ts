import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: '.app-item-article-vente',
  templateUrl: './item-article-vente.component.html',
  styleUrls: ['./item-article-vente.component.css']
})
export class ItemArticleVenteComponent {
@Input() itemsPerPage!: number;
@Input() totalItems!: number;
// @Input() recupId!: number;
@Input() currentPage!:number;
@Input() articleVente:any;
@Input() recupDonneeArticleVente!: [];
idArticle!:number

@Output() idArticleVenteSuppresion = new EventEmitter();
@Output() idArticleVenteModification= new EventEmitter();

recupIdsuppression(id:number){
this.idArticle = id;
this.idArticleVenteSuppresion.emit(this.idArticle);
}



recupIdModification(article:any){
  this.idArticleVenteModification.emit(article);
}
}
