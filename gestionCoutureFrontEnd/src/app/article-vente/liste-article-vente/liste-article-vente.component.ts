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



Pagination(pageNumber: number) {
  this.pagination.emit(pageNumber);
}
}
