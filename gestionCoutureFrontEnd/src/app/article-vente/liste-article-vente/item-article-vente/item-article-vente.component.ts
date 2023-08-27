import { Component, Input } from '@angular/core';

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
}
