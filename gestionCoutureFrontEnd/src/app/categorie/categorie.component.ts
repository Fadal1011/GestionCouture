import { Component, OnInit } from '@angular/core';
import { ServiceCategorieService } from '../shared/service-categorie.service';
import { ToastrService } from 'ngx-toastr';
import { category, ResponseBack, ResponseBack2 } from '../response-back';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {


  // ------------------------------------Propriétés-----------------------------------

  // typeBolean
  isButtonDisabled: boolean = true
  checkedAllCategories: boolean = false
  checkedAll: boolean = false;
  checkedAOne: boolean = false;
  formCheck: boolean = false;
  deleteCategegorie: boolean = true;

  // typeNumber
  itemsPerPage: number|undefined = 0;
  totalItems: number|undefined = 0;
  recupId: number = 0;
  currentPage = 1;


  //typeObject
  newCategorie: category = {
    id:0,
    libelle:""
  };
  categories: category[] = []
  CategirieSupp: number[] = [];
  Achecked!:number[]

  //typeSring
  recupValue: string | null = "";


  // ------------------------------Méthode d'initialisation-------------------------------

  ngOnInit() {
    this.listCategories(this.currentPage);
  }

  constructor(private serviceCategorieservice: ServiceCategorieService,private toastr:ToastrService) { }

  showSuccess(message:string) {
    this.toastr.success(message);
  }

  showError(message:string) {
    this.toastr.error(message);
  }
  // ----------------------------Méthode pour gérer le changement du radio button--------------------
  radioLibelle() {
    if (this.formCheck == false) {
      this.isButtonDisabled = true

    }
   else if (this.formCheck == true) {
      this.isButtonDisabled = true
      this.deleteCategegorie = true
    }
  }

  // ----------------------------Méthode pour gérer le checkbox de suppression---------------------------
  inputValue2(event: Event) {
    if (this.formCheck == true) {
      const inputValue = event.target as HTMLInputElement;
      if (inputValue.checked === true) {
        this.deleteCategegorie = false;
        this.CategirieSupp.push(+inputValue.value)
        console.log(this.CategirieSupp);
      }
      if (inputValue.checked === false) {
        const valueToRemove = +inputValue.value;
        const index = this.CategirieSupp.indexOf(valueToRemove);
        this.checkedAOne = false;
        console.log(index);
        if (index !== -1) {
          this.CategirieSupp.splice(index, 1);
          console.log(this.CategirieSupp);
        }

      }
      if (this.CategirieSupp.length == 0) {
        this.deleteCategegorie = true;
      }
      if(this.CategirieSupp.length==3){
        this.checkedAOne =true
      }
      if(this.checkedAOne==true){
        this.checkedAll = true;
      }
    }
  }
  // ---------------------------Méthode pour gérer le checkbox "Sélectionner tout"----------------------------------------
  inputValue(event: Event) {
    const inputValue = event.target as HTMLInputElement;
    this.CategirieSupp = [];
    if(this.formCheck===true){
      if(inputValue.checked == true){
        this.checkedAll = true

        this.deleteCategegorie = false;
        this.recupAllId(this.currentPage)
      }
    }

    if (inputValue.checked === false) {
      this.checkedAll = false;
      this.deleteCategegorie = true;
      this.CategirieSupp = [];
    }
  }

  // ---------------------------Méthode pour vérifier la longueur du libellé-----------------------------------
  inputLibelle() {
    this.isButtonDisabled = true
    if (!this.newCategorie.libelle || this.newCategorie.libelle.length > 2) {
      this.isButtonDisabled = false
      if (this.formCheck === false) {
        this.serviceCategorieservice.searchCategorie(this.newCategorie.libelle).subscribe(
          (response) => {
            if (Array.isArray(response)) {
              const libelle = response[0].libelle;
              this.isButtonDisabled = true
              console.log('Libellé récupéré :', libelle);
            } else {
              console.log('Aucune catégorie trouvée.');
            }
          }
        )
      }
    }
    if (this.newCategorie.libelle.length == 0) {
      this.isButtonDisabled = true
    }

  }
  // ------------------------------Méthode pour ajouter une catégorie--------------------------------
  addCategorie() {
    let newCategorie ={
      libelle: this.newCategorie.libelle
    }
    if (!this.newCategorie.libelle || this.newCategorie.libelle.length < 3) {
      this.showError("Le nom doit contenir au moins 3 caractère.")
      return;
    }
    this.serviceCategorieservice.addCategorie(newCategorie).subscribe(
      (response:ResponseBack) => {
        console.log(response);
        this.showSuccess(response.message);
        this.newCategorie = {
          id:0,
          libelle:''
        };
        this.listCategories(this.currentPage);
      },
      (error) => {
        this.showError("'Une erreur s\'est produite :'")
      }
    )
  }

  // -----------------------------------Méthode pour lister les catégories-------------------------------------
  listCategories(pageNumber: number) {
    this.serviceCategorieservice.listCategories(pageNumber).subscribe(
      (response:ResponseBack) => {
        console.log(response.data);

        this.categories = response.data as category[];
        this.totalItems = response.meta?.total;
        this.itemsPerPage = response.meta?.per_page
      },
      (error) => {
        this.showError("'Une erreur s\'est produite :'")
      }
    );
  }

  // -------------------------------Méthode pour supprimer des catégories--------------------------------------
  DeleteCategory() {
    const idsToDelete = {
      ids: this.CategirieSupp
    };

    this.serviceCategorieservice.supprimerCategorie(idsToDelete).subscribe(
      (response:ResponseBack) => {
        this.showSuccess(response.message);
        this.CategirieSupp = [];
        this.listCategories(this.currentPage);
      },
      (error) => {
        this.showError("erreur lors du suppression")
      }
    )
    this.checkedAOne = false;
    this.checkedAll = false;
  }

  // ------------------------------Méthode pour changer de page----------------------------------------
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.listCategories(pageNumber);
    this.checkedAOne = false;
    this.checkedAll=false;
    this.deleteCategegorie = true;

  }

  // --------------------------------Méthode pour récupérer l'ID----------------------------------------
  getID(id: number) {
    this.recupId = id;

  }
  // -------------------------------Méthode pour récupérer le contenu du texte-----------------------------
  getTextContent(event: MouseEvent) {
    if (this.formCheck === true) {
      this.newCategorie = {
        id: 0,
        libelle: ''
      };

      const ElementCliqué = event.target as HTMLElement;
      const textContent = ElementCliqué.textContent;

      if (textContent !== null) {
        this.recupValue = textContent;
        this.newCategorie.libelle = this.recupValue;
      }
    }
  }
  // ----------------------------------Méthode mettre à jour--------------------------
  modifierCategorie() {
    this.serviceCategorieservice.modifierCategorie(this.newCategorie, this.recupId).subscribe(
      (response:ResponseBack) => {
        this.showSuccess(response.message);
        this.listCategories(this.currentPage);
      },
      (error) => {
        this.showError("il faut cliquer sur un catregorie pour le modifier")
      }
    )
  }
  // -----------------------------Méthode pour ajouter ou mettre à jour----------------------------
  add_update() {
    if (this.formCheck === false) {
      this.addCategorie();
    }
    if (this.formCheck === true) {
      this.modifierCategorie();
    }
  }

  // ---------------------------Méthode pour ajouter ou mettre à jour--------------------------------
  recupAllId(pageNumber: number) {
    if (this.formCheck == true) {
      this.serviceCategorieservice.listCategories(pageNumber).subscribe(
        (response: ResponseBack) => {
           console.log(response.data)
          let datas:category[] = response.data as category[];
          for (const item of datas) {
            this.CategirieSupp.push(item.id);
          }
          this.checkedAll = true;
          console.log(this.CategirieSupp);
        },
        (error) => {
          console.error("Une erreur s'est produite :", error);
        }
      );
    }
  }

}
