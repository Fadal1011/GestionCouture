import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { AricleVenteService } from '../shared/aricle-vente.service';
import { ArticleVente, ResponseBack } from '../response-back';
import { ButtonSubmit } from '../button-submit';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-article-vente',
  templateUrl: './article-vente.component.html',
  styleUrls: ['./article-vente.component.css']
})
export class ArticleVenteComponent implements OnInit {
  insertUpdate!: FormGroup;
  tableauCategorie!: any;
  tableauArticleConfection!: any;
  FilterArticle!: any;
  activeInputIndex: number | null = null;
  activeInputQuanite: number | null = null;
  coutFabrication: number = 0;
  prixVente!: number;
  promo: boolean = false;
  trier:string ="croissant";


  modeSubmit = ButtonSubmit.Add

  //variable du lister Article
  itemsPerPage!: number;
  totalItems!: number;
  recupId!: number;
  currentPage = 1;
  recupDonneeArticleVente: any
  desactiveQuantite: boolean = true

  perPagePagination!:number;

  constructor(private formBuilder: FormBuilder, private articleVenteservice: AricleVenteService) { }


  recupValTrie(valSelect:string){
    this.trier=valSelect
    this.trierAricle(this.recupDonneeArticleVente)
  }


  ngOnInit() {
    // Initialisation du formulaire et chargement des données
    this.insertUpdate = this.formBuilder.group({
      libelle: ["", [Validators.required, Validators.minLength(3)]],
      categorie: ["", Validators.required],
      valuePromo: [""],
      coutFabrication: ["", Validators.required],
      articleConf: this.formBuilder.array([]),
      marge: ["", [Validators.required,this.MergeValidation()]],
      prix: ["", Validators.required],
      photo: ["assets/image/noprofil.jpg", Validators.required],
      Ref: ["", Validators.required]
    });
    this.chargeForm();
    this.RecupArticleVente();
  }

  get articleConf() {
    return (this.insertUpdate.get('articleConf') as FormArray).controls as FormGroup[];
  }

  get photo() {
    return this.insertUpdate.get('photo')
  }

  get libelle(){
    return this.insertUpdate.get('libelle');
  }


  customAsyncValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }
      const existingLibelles = this.insertUpdate.get('articleConf')?.value.map((article: any) => article.libelle) || [];
      const exists = existingLibelles.includes(value);
      return exists ? { articleExists: true } : null;
    };
  }

  confectionExists(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const TabArticle = this.tableauArticleConfection.map((article: any) => article.libelle);

      const existing = TabArticle.includes(value)
      return !existing ? { articleExists: true } :null;
    };
  }

  // Dans un service, un fichier utilitaire, ou directement dans votre composant (en dehors de la classe)
  MergeValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      // const coutFabrication = this.insertUpdate.get('coutFabrication')?.value / 3;
      const ValidationLMerge = value >= 5000;


      return ValidationLMerge ? null : { mergeValue: false };
    };
  }


  // Gestionnaire de l'événement pour la case à cocher "Promo"
  isPromo(event: any) {
    this.promo = event.target.checked;
  }

  isLibelleInvalid(index: number): boolean {
    const articleCtrl = this.articleConf.at(index);

    if (!articleCtrl) {
      return false; // ou tout autre valeur par défaut
    }

    const libelleControl = articleCtrl.get('libelle');
    return libelleControl?.invalid || false;
  }



  // Obtention des contrôles du tableau d'articles

  // Ajout d'une nouvelle ligne au tableau d'articles
  addColumncontrol(existingArticleLibelles: string[]) {
    const newArticle = this.formBuilder.group({
      id:["",Validators.required],
      categorie:["",Validators.required],
      libelle: ['', [Validators.required,this.confectionExists(),this.customAsyncValidator()]],
      quantite: ['', Validators.required]
    });

    console.log(newArticle.value);

    const articleConfArray = this.insertUpdate.get('articleConf') as FormArray;
    articleConfArray.push(newArticle);

    console.log(articleConfArray);

  }


  addNewArticle() {
    const articleConfArray = this.insertUpdate.get('articleConf') as FormArray;
    const existingLibelles = articleConfArray.value.map((article: any) => article.libelle) || [];
    this.addColumncontrol(existingLibelles);
  }


  // Chargement des données de base
  chargeForm() {
    this.articleVenteservice.all().subscribe(
      (response) => {
        this.tableauCategorie = response.categories;
        this.tableauArticleConfection = response.articleConf;
      }
    );
  }

  // Récupération de la quantité depuis l'input
  recupQuantite(event: any) {
    this.activeInputQuanite = +event.target.getAttribute("id");
  }

  // Recherche d'articles
  searchArticle(event: any) {
    let libelleValue = event.target.value;
    this.FilterArticle = this.tableauArticleConfection.filter((name: any) =>
      name.libelle.toLowerCase().includes(libelleValue.toLowerCase())
    );

    if (libelleValue == "") {
      this.FilterArticle = [];
    }
    this.activeInputIndex = +event.target.getAttribute("id");
  }



  // Récupération de la marge et calcul du prix de vente
  recupMerge(event: any) {
    const montMarge = +event.target.value;
    this.prixVente = montMarge + this.coutFabrication;
    this.insertUpdate.get('prix')?.setValue(this.prixVente);
  }

  // Insertion d'un nouvel article
  insertUpdateArticle() {
    if (this.insertUpdate.valid) {
        if (this.modeSubmit == ButtonSubmit.Add) {
          this.ajouterArticleVente();
        }

        else{
          this.modification();
        }
    } else {
      Object.keys(this.insertUpdate.controls).forEach(field => {
        const control = this.insertUpdate.get(field);
        if (control?.dirty && control.invalid) {
          console.log(`Field '${field}' is invalid`);
        }
      });
    }

  }

  // Gestionnaire de changement de fichier
  onFileChange(event: Event) {
    const filesTarget = event.target as HTMLInputElement;
    if (filesTarget.files) {
      const file = filesTarget.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent) => {
          if (e.target) {
            this.photo?.setValue(reader.result)
            // this.insertUpdate
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Ajout d'un article de vente
  ajouterArticleVente() {
    const priorité = [
      { categorie: 'button' },
      { categorie: 'tissu' },
      { categorie: 'file' }
    ];



    const tousLesLibellePresent = priorité.every(obj2 =>
      this.insertUpdate.get('articleConf')?.value.some((obj1: { categorie: string; }) => obj1.categorie === obj2.categorie)
    );
    if (tousLesLibellePresent) {
      if (this.insertUpdate.get('valuePromo')?.value === "" && this.promo == true) {
        console.log("vous devez mettre la valeur du promo");
        return
      }
      this.articleVenteservice.AddArticle(this.insertUpdate.value).subscribe(
        (response) => {
          this.recupDonneeArticleVente.unshift(response.data);
          this.resetForm();
        }
      )
    }
    else {
      console.log("il y'a des priorité manquante");
      return
    }
  }

  // Génération de la référence
  chargerRef() {
    const libelle = this.insertUpdate.get('libelle')?.value || '';
    const categorie = this.insertUpdate.get('categorie')?.value || '';
    const newRef = "REF-" + libelle.substring(0, 3) + "-" + categorie + "7";
    this.insertUpdate.get('Ref')?.patchValue(newRef);
  }




  //________________PARTIE AFFICHAGE DU TABLES____________________________

  recupPage(page: number){
    this.perPagePagination =+page;
    this.currentPage=1;
    this.RecupArticleVente();
  }

  trierAricle(trie:[]){
    if(this.trier=="croissant"){
      trie.sort(function(a:any, b:any) {
        return a.libelle.localeCompare(b.libelle);
    });
    }
    if(this.trier=="Decroissant"){
      trie.sort(function(a:any, b:any) {
        return b.libelle.localeCompare(a.libelle);
    });
    }
  }


  RecupArticleVente(pageNumber?: number) {
    this.articleVenteservice.getArticleVente(this.perPagePagination,pageNumber).subscribe(
      (response) => {
        this.recupDonneeArticleVente = response.data
        this.itemsPerPage = response.per_page as number
        this.totalItems = response.TotalPages as number
        console.log(this.recupDonneeArticleVente);

      }
    )
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;

    this.RecupArticleVente(this.currentPage)
  }


  supprimerArticle(id: number) {
    this.articleVenteservice.deleteArticleVente(id).subscribe(
      (response) => {
        console.log(response.data.libelle);
        this.recupDonneeArticleVente = this.recupDonneeArticleVente.filter((article: { id: number; }) => article.id !== response.data.id)
      }
    )
  }


  chargerFormulaire(article: any) {
    this.recupId = article.id
    this.modeSubmit = ButtonSubmit.Update;
    console.log(article.AricleConf); // Vérifiez si les données sont présentes
    this.insertUpdate.patchValue(article);

    const articleConfArray = this.insertUpdate.get('articleConf') as FormArray;
    articleConfArray.clear(); // Effacer les contrôles existants du FormArray

    for (const articleData of article.AricleConf) {
      const newArticle = this.formBuilder.group({
        id:[articleData.id,Validators.required],
        categorie:[articleData.categorie,Validators.required],
        libelle: [articleData.libelle, [Validators.required,this.customAsyncValidator(),this.confectionExists()]],
        quantite: [articleData.pivot.quantite, Validators.required]
      });
      articleConfArray.push(newArticle);
    }
  }



  modification(){
    this.articleVenteservice.modificationArticleVente(this.recupId,this.insertUpdate.value).subscribe(
      (response)=>{
        console.log(response);
        this.modeSubmit = ButtonSubmit.Add;
        this.RecupArticleVente();
        this.resetForm();
      }
    )
  }

  resetForm(){
    this.insertUpdate.reset();
    this.insertUpdate.get("photo")?.setValue('assets/image/noprofil.jpg')
    const articleConfArray = this.insertUpdate.get('articleConf') as FormArray;
    articleConfArray.clear();
  }


  recupLibelle(event: any) {
    if (this.activeInputIndex !== null) {
      const libelle = event.target.textContent;
      for (let article of this.tableauArticleConfection){
        if(libelle === article.libelle){
          const libelleControl = this.articleConf[this.activeInputIndex].get('libelle');
          const idControl = this.articleConf[this.activeInputIndex].get('id')
          const categorieControl = this.articleConf[this.activeInputIndex].get('categorie')
          if (libelleControl && idControl && categorieControl) {
            libelleControl.setValue(article.libelle);
            idControl.setValue(article.id);
            categorieControl.setValue(article.categorie);
          }
        }
      }
      this.FilterArticle = [];
    }
  }

  calcul(Event:any){
    if (this.activeInputIndex !== null) {
      let prix = Event.target?.value
      const libelleControl = this.articleConf[this.activeInputIndex].get('libelle')
      for(let article of this.tableauArticleConfection){
        if(libelleControl?.value === article.libelle){
         let total = article.prix * prix
         this.coutFabrication += total

        }
      }
    }

    this.insertUpdate.get('coutFabrication')?.setValue(this.coutFabrication);

  }





}
