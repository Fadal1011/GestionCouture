import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ServiceCategorieService } from '../shared/service-categorie.service';
import { ResponseBack, Article, RecupDonnee, category } from '../response-back';
import { ArticleService } from '../shared/article.service';
import { FormGroup } from '@angular/forms';
// import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  newArticles!: Article
  list!: category[];
  isLoading!: boolean;
  tabFournisseur!: string[];
  listArticle!: [];
  formData!:[];


  itemsPerPage!: number;
  totalItems!: number;
  recupId!: number;
  currentPage = 1;
  recupDonneeArticle!: Article;
  id_du_article_a_updates!: number | undefined;
  profilSrc:string="../../assets/image/noprofil.jpg"

  modeUpdate2!: boolean;
  @ViewChild(FormComponent, {static: false}) formComponent!: FormComponent

  // modeUpdate: boolean = false;

  ngOnInit(): void {
    this.listeArticles()
    this.formDataDonnee()
    // this.listCategories();
    // console.log(this.listArticle);

  }

  constructor(private articleservice: ArticleService) { }
  // listCategories(pageNumber?: number) {
  //   this.isLoading = true;
  //   this.articleservice.recupDonnee(pageNumber).subscribe(
  //     (res: RecupDonnee) => {

  //       this.list = res.categories.data;
  //       this.listArticle = res.articles.data;

  //       this.tabFournisseur = res.fournisseur.data.map((item: Article) => item.libelle);
  //       this.listArticle = res.articles.data;
  //       this.itemsPerPage = res.articles.per_page as number;
  //       this.totalItems = res.articles.TotalPages as number;
  //       setTimeout(() => {
  //         this.isLoading = false;
  //       }, 3000);
  //     }
  //   )
  // }

  buttonUpdateActive (textButton:boolean){
    this.modeUpdate2 = textButton
  }

  // paginations(pageNumber?: number) {
  //   this.articleservice.listArticle(pageNumber).subscribe(
  //     (res: RecupDonnee) => {
  //       this.listArticle = res.data;
  //       this.itemsPerPage = res.articles.per_page as number
  //       this.totalItems = res.articles.TotalPages as number
  //     }
  //   )
  // }

  // paginations(pageNumber?: number){
  //   this.articleservice.listArticle(pageNumber).subscribe(
  //     (response)=>{
  //       this.listArticle =response.data
  //       this.itemsPerPage = response.per_page as number
  //       this.totalItems = response.TotalPages as number
  //     }
  //   )
  // }

  AppelRecupArticle(article: Article) {
    this.recupDonneeArticle = article;
    this.formComponent.fournisseurSelectionner = this.recupDonneeArticle.fournisseurs
    this.formComponent.fournisseurSelectionner = this.formComponent.fournisseurSelectionner.map((fournisseur: { libelle: any; })=>fournisseur.libelle)
    console.log(this.formComponent.fournisseurSelectionner);

    this.id_du_article_a_updates = article.id
    this.profilSrc = "data:image/png;base64,"+article.photo;
  }

  AppeladdArticle(getFun: Article) {
    this.newArticles = getFun
    if (!this.modeUpdate2) {
      this.addArticle(this.newArticles);
    }
    else {
      console.log(this.newArticles);
      if (this.id_du_article_a_updates) {
        this.UpdateArticles(this.id_du_article_a_updates)
      }
    }
  }

  listeArticles(pageNumber?: number){
    this.articleservice.listArticle(pageNumber).subscribe(
      (response)=>{
        this.listArticle =response.data
        this.itemsPerPage = response.per_page as number
        this.totalItems = response.TotalPages as number
        console.log(this.listArticle);

      }
    )
  }

  formDataDonnee(){
    this.articleservice.all().subscribe(
      (response)=>{
        console.log(response);
        this.list = response.categories.data
        this.tabFournisseur = response.fournisseur.data.map((item: Article) => item.libelle);
      }
    )
  }



  addArticle(article: Article) {
    this.articleservice.AddArticle(article).subscribe(
      (response: Article) => {
        console.log(article)
        this.listeArticles();
        this.profilSrc ="../../assets/image/noprofil.jpg"

        this.formComponent.restForm()
        // this.articleservice.showSuccess("Article ajouter avec succées")
      },
      (error) => {
        // this.articleservice.showError("erreur lors de l'enreregistrer")
      }
    )
  }


  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.listeArticles(this.currentPage)
  }



  delete(id: number) {
    this.articleservice.Delete(id).subscribe(
      (response) => {
        console.log(response);
        this.listeArticles(this.currentPage);
      }
    )
  }



  UpdateArticles(id: number) {
    this.articleservice.UpdateArticle(this.newArticles, id).subscribe(
      (res: Article) => {
        console.log(res);
        this.listeArticles(this.currentPage);
        this.formComponent.restForm()
      },
      (error:{}) => {
        console.error('Une erreur est survenue :', error);
      },
    );
  }

  AppelDelete(getId: number) {
    this.recupId = getId
    this.delete(this.recupId)
  }


}
