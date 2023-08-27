import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '.app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent{
  @Input () article!:any;
  @Input() listeArticle!: any[];
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Input() verifieId!: number;
  @Input() timeLeft!: number;

  @Output() recupIdArticle = new EventEmitter<number>();
  @Output() ConfirmDelete = new EventEmitter<number>();
  @Output() getIDupdateArticle = new EventEmitter<number>();
  @Output() ArticleObject =new EventEmitter()
  @Output() textConfirmationChange = new EventEmitter<string>();
  @Output() buttonText = new EventEmitter<boolean>();


  textConfirmation!: string;
  modeUpdateButton!:boolean

  getID(id: number) {
    this.recupIdArticle.emit(id);
    this.textConfirmation ="Supprimer"
    this.textConfirmationChange.emit(this.textConfirmation);
  }

  getIDupdate(id: number) {
    this.ArticleObject.emit(id);

  }

  buttonUpdateActive(){
    this.modeUpdateButton = true;
    this.buttonText.emit(this.modeUpdateButton)
  }


  Confirm(event: MouseEvent) {
    const ElementClique = event.target as HTMLElement;

    if (ElementClique.textContent == 'Supprimer') {
      this.startCountdown();
      ElementClique.textContent = 'OK';
      this.textConfirmation = 'OK';
      setTimeout(() => {
        this.textConfirmation = 'Supprimer';
        ElementClique.textContent = 'Supprimer';
      }, 3000);
      this.textConfirmationChange.emit(this.textConfirmation);
    }
  }



  startCountdown() {
    this.timeLeft = 3
    const countdownInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(countdownInterval);
        this.verifieId = 0
        this.textConfirmation = 'Supprimer'
        this.textConfirmationChange.emit(this.textConfirmation);
      }
    }, 1000);
  }
}
