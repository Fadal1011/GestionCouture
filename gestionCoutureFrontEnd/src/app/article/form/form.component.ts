import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResponseBack, Article, category } from '../../response-back';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  articleFormGroup!: FormGroup
  @Input() modeUpdateFormat!: boolean
  @Output() addArticl = new EventEmitter();
  @Output() updateArticl = new EventEmitter();

   fournisseurSelectionner!: any[]
  @Input() tabFournisseur!: string[]
  @Input() list!: category[];
  FilterFournisseur!: string[]
  @Input() profilePicSrc!: string
  @Input() isLoading!: boolean;
  ref!: string;
  @Input() recupDonnee!: Article
  @Input() listArticle!: []
  @Input() ModeUpdate2!: boolean

  textContentSubmit:string="Ajouter";

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.articleFormGroup = this.formBuilder.group({
      libelle: ["", Validators.required],
      categorie: ["", Validators.required],
      stock: ["", Validators.required],
      prix: ["", Validators.required],
      fournisseur: ["", Validators.required],
      photo: ["", Validators.required],
      ref: ["", Validators.required]
    })
  }

  recupTextContent(event:Event){
    const ElementClique = event.target as HTMLElement;
    if(ElementClique.textContent){
      this.textContentSubmit = ElementClique.textContent
    }

  }

  Ajout_ou_Modifier() {
    if (this.textContentSubmit == "Ajouter"){
      console.log("sdkjhnjkdhnj");

      this.articleFormGroup.value.fournisseur = this.fournisseurSelectionner;
      this.addArticl.emit(this.articleFormGroup.value)
      // this.articleFormGroup.reset();
      this.articleFormGroup.value.fournisseur = "";
      this.fournisseurSelectionner = []
    }
    else {
      this.articleFormGroup.value.fournisseur = this.fournisseurSelectionner;
      this.updateArticl.emit(this.articleFormGroup.value)

    }
  }

  AnnulerModification(){
    // this.ModeUpdate2 = false;
    // this.articleFormGroup.reset();
    // this.profilePicSrc = "../../assets/image/noprofil.jpg"
    // console.log(this.textContentSubmit);
  }


   restForm(){
    this.articleFormGroup.reset();
    this.profilePicSrc ="../../assets/image/noprofil.jpg"
    this.fournisseurSelectionner = []

   }



  searchFournisseur() {
    const query = this.articleFormGroup.value.fournisseur;
    this.FilterFournisseur = this.tabFournisseur.filter((name: string) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  }

  DeSelectionnerFournisseur(event: MouseEvent) {
    const ElementCliqué = event.target as HTMLElement;
    const textContent = ElementCliqué.textContent;
    console.log(textContent);
    if (textContent != null) {
      this.FilterFournisseur.push(textContent);
      this.fournisseurSelectionner = this.fournisseurSelectionner.filter((Content: string) => Content !== textContent);
    }
  }




  SelectionnerFournisseur(event: MouseEvent) {
    const ElementCliqué = event.target as HTMLElement;
    const textContent = ElementCliqué.textContent;

    if (!this.fournisseurSelectionner) {
      this.fournisseurSelectionner = [];
    }

    if (textContent != null) {
      this.fournisseurSelectionner.push(textContent);
      this.FilterFournisseur = this.FilterFournisseur.filter((Content: string) => Content !== textContent);

      // Supprimer également l'élément sélectionné de tabFournisseur
      this.tabFournisseur = this.tabFournisseur.filter((Content: string) => Content !== textContent);
      console.log(this.tabFournisseur);

    }

  }


  onFileChange(event: Event) {
    const filesTarget = event.target as HTMLInputElement;
    if (filesTarget.files) {
      const file = filesTarget.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent) => {
          // Vous pouvez vérifier si 'e.target' existe avant d'accéder à 'result'
          if (e.target) {
            // this.profilePicSrc = e.target.result;
            this.articleFormGroup.value.photo = (e.target as FileReader).result;
            this.profilePicSrc = this.articleFormGroup.value.photo;
            // console.log(this.articleFormGroup.value.photo);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  chargerRef() {
    const libelle = this.articleFormGroup.get('libelle')?.value || '';
    const categorie = this.articleFormGroup.get('categorie')?.value || '';
    const newRef = "REF-" + libelle.substring(0, 3) + "-" + categorie;
    this.articleFormGroup.get('ref')?.patchValue(newRef);
  }
}
