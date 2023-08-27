import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/response-back';

@Component({
  selector: 'app-liste-article',
  templateUrl: './liste-article.component.html',
  styleUrls: ['./liste-article.component.css']
})
export class ListeArticleComponent implements OnInit {
  @Input() listeArticle!:Article[];
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Output() recupId = new EventEmitter<number>();
  @Input() currentPage!:number;
  @Output() pagination = new EventEmitter<number>();
  @Output() ArticleObject = new EventEmitter();
  @Input() modeUpdate!:boolean;

  textConfirmation!:string;
  verifieId:number = 0
  @Output()UpdateActive = new EventEmitter<boolean>();

  ngOnInit(): void {
    // console.log(this.listeArticle);

  }


  Pagination(pageNumber: number) {
    this.pagination.emit(pageNumber);
  }

  onTextConfirmationChange(newTextConfirmation: string) {
    this.textConfirmation = newTextConfirmation;
  }

 getID(id:number){
  console.log(this.textConfirmation);
    this.verifieId = id;
    if(this.textConfirmation==="OK"){
      this.recupId.emit(id);
      this.textConfirmation = "Supprimer"
    //  console.log(this.textConfirmation);
    }
  }



  buttonUpdateActive(textButton:boolean){
    this.UpdateActive.emit(textButton);
  }

  getIDupdate(id:number){
    for (const article of this.listeArticle) {
      if (article.id === id) {
        this.ArticleObject.emit(article);
      }
    }
  }
}

