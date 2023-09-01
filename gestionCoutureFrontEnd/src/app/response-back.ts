import { InterfaceAbstraitDonne } from "./interface-abstrait-donne";

export interface ResponseBack {
  message:string,
  data:[],
  links?:{},
  meta?:data,
  per_page?:number,
  TotalPages?:number,
  current_page?:number
}

export interface ResponseBack2 {
  message:string,
  data:ArticleVente,
  links?:{},
  meta?:data
}


export interface data{
  total:number,
  per_page:number,
}

export interface category extends InterfaceAbstraitDonne{

}

export interface Article extends InterfaceAbstraitDonne{
  prix:number;
  stock:number;
  categorie:string;
  photo:string;
  fournisseurs:string[];
  Ref:string;
}

export interface ArticleVente extends InterfaceAbstraitDonne{
  prix:number;
  stock:number;
  categorie:string;
  photo:string;
  ref:string;
  marge:number;
  AricleConf:any[];
  valuePromo:number;
  coutFabrication:number
}

export interface RecupDonnee{
    categories:ResponseBack,
    fournisseur:ResponseBack,
    articleConf:any;
}
