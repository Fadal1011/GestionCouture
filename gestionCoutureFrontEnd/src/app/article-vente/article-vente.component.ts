import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AricleVenteService } from '../shared/aricle-vente.service';
import { ArticleVente, ResponseBack } from '../response-back';

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
  profilPicsrc: any;
  coutFabrication: number = 0;
  prixVente!: number;
  promo: boolean = false;



  //variable du lister Article
  itemsPerPage!: number;
  totalItems!: number;
  recupId!: number;
  currentPage = 1;
  recupDonneeArticleVente: any


  constructor(private formBuilder: FormBuilder, private articleVenteservice: AricleVenteService) { }



  ngOnInit() {
    // Initialisation du formulaire et chargement des données
    this.insertUpdate = this.formBuilder.group({
      libelle: ["", Validators.required],
      categorie: ["", Validators.required],
      valuePromo: ["", Validators.required],
      coutFabrication: ["", Validators.required],
      articleConf: this.formBuilder.array([]),
      marge: ["", Validators.required],
      prix_vente: ["", Validators.required],
      photo: ["", Validators.required],
      ref: ["", Validators.required]
    });

    this.chargeForm();
    this.RecupArticleVente();
  }

  // Gestionnaire de l'événement pour la case à cocher "Promo"
  isPromo(event: any) {
    this.promo = event.target.checked;
  }

  // Obtention des contrôles du tableau d'articles
  get articleConf() {
    return (this.insertUpdate.get('articleConf') as FormArray).controls as FormGroup[];
  }

  // Ajout d'une nouvelle ligne au tableau d'articles
  addColumncontrol() {
    const newArticle = this.formBuilder.group({
      libelle: ['', Validators.required],
      quantite: ['', Validators.required]
    });
    const articleConfArray = this.insertUpdate.get('articleConf') as FormArray;
    articleConfArray.push(newArticle);
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
    const quantite = +event.target.value;
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

  // Récupération du libellé sélectionné
  recupLibelle(event: any) {
    if (this.activeInputIndex !== null) {
      const libelle = event.target.textContent;
      const libelleControl = this.articleConf[this.activeInputIndex].get('libelle');
      if (libelleControl) {
        libelleControl.setValue(libelle);
      }
      for (const prix of this.tableauArticleConfection) {
        if (prix.libelle == libelle && this.activeInputIndex == this.activeInputQuanite) {
          this.coutFabrication += prix.prix * this.articleConf[this.activeInputQuanite].get('quantite')?.value;
          this.insertUpdate.get('coutFabrication')?.setValue(this.coutFabrication);
        }
      }

      this.FilterArticle = [];
    }
  }

  // Récupération de la marge et calcul du prix de vente
  recupMerge(event: any) {
    const montMarge = +event.target.value;
    this.prixVente = montMarge + this.coutFabrication;
    this.insertUpdate.get('prix_vente')?.setValue(this.prixVente);
  }

  // Insertion d'un nouvel article
  insert() {
    this.ajouterArticleVente();
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
            this.insertUpdate.value.photo = (e.target as FileReader).result;
            this.profilPicsrc = this.insertUpdate.value.photo;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Ajout d'un article de vente
  ajouterArticleVente() {
    const priorité = [
      { libelle: 'button' },
      { libelle: 'tissu' },
      { libelle: 'file' }
    ];



    const tousLesLibellePresent = priorité.every(obj2 =>
      this.insertUpdate.get('articleConf')?.value.some((obj1: { libelle: string; }) => obj1.libelle === obj2.libelle)
    );
    if (tousLesLibellePresent) {
          if(this.insertUpdate.get('valuePromo')?.value === "" && this.promo == true){
            console.log("vous devez mettre la valeur du promo");
            return
          }
        this.articleVenteservice.AddArticle(this.insertUpdate.value).subscribe(
          (response) => {

            this.recupDonneeArticleVente.unshift(response.data);
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
    this.insertUpdate.get('ref')?.patchValue(newRef);
  }




  //________________PARTIE AFFICHAGE DU TABLES____________________________

  RecupArticleVente(pageNumber?: number){
    this.articleVenteservice.getArticleVente(pageNumber).subscribe(
      (response)=>{
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
}
