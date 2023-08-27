<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleCollection;
use App\Http\Resources\ArticleRessource;
use App\Http\Resources\CategorieCollection;
use App\Http\Resources\Fourni_ArticleRessource;
use App\Http\Resources\FournisseurCollection;
use App\Models\Categorie;
use App\Models\Fourni_Article;
use App\Models\fournisseur;
use ErrorException;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function ArticlePaginate()
    {
        $article_fourni = Article::with("fournisseurs")->paginate(3);
        return new ArticleCollection($article_fourni,"liste des articles");
    }

    public function index()
    {
        $listCategorie = Categorie::where("type","Confection")->get();
        $categories = new CategorieCollection($listCategorie, "voici la liste de tous les Collections");
        $listfournisseur = fournisseur::all();
        $fournisseur = new FournisseurCollection($listfournisseur,"voici la liste de tous les Fournisseur");

        $combinedData = [
            'categories' => $categories,
            'fournisseur'=>$fournisseur,
        ];

        return  $combinedData;
    }

    public function create()
    {
        //
    }

    public function store(StoreArticleRequest $request)
    {
        $format = explode(";", $request->photo)[0];
        if($format ==="data:image/png"){
            $image = str_replace('data:image/png;base64,','',$request->photo);
        }
        if($format ==="data:image/jpg"){
            $image = str_replace('data:image/jpg;base64,','',$request->photo);
        }

        if($format ==="data:image/jpeg"){
            $image = str_replace('data:image/jpeg;base64,','',$request->photo);
        }
        $categorie = Categorie::where('libelle', $request->categorie)->first();
        $lib = substr($request->libelle, 0, 3);
        $ref = "ref-" . $lib . $categorie->id . "3";
    //   DB::transaction(function () use ($request,$categorie,$image,$ref){
            $article = Article::create([
                "libelle" => $request->libelle,
                "prix" => $request->prix,
                "stock" => $request->stock,
                "categorie_id" => $categorie->id,
                "photo" => $image,
                "Ref" => $ref,
            ]);
        // });
        // DB::commit();
        return new ArticleRessource($article);

    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateArticleRequest  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateArticleRequest $request,$id)
    {
        if($request->filled("photo")){
            $format = explode(";", $request->photo)[0];
            if($format ==="data:image/png"){
                $image = str_replace('data:image/png;base64,','',$request->photo);
            }
            if($format ==="data:image/jpg"){
                $image = str_replace('data:image/jpg;base64,','',$request->photo);
            }

            if($format ==="data:image/jpeg"){
                $image = str_replace('data:image/jpeg;base64,','',$request->photo);
            }
        }

        if($request->filled('categorie')){
            $categorie = Categorie::where('libelle', $request->categorie)->first();
            $lib = substr($request->libelle, 0, 3);
            $ref = "ref-" . $lib . $categorie->id . "3";
        }

        $article = Article::find($id);
        $lib = substr($request->libelle,0,3);
        $ref = "ref-".$lib.$request->categories."3";
        $article->update([
            "libelle" =>$request->filled("libelle") ? $request->libelle: $article->libelle,
            "prix" => $request->filled('prix') ? $request->prix : $article->prix,
            "stock" => $request->filled('stock') ? $request->stock : $article->stock,
            "categorie_id" =>$request->filled('categorie') ? $categorie->id : $article->categorie_id,
            "photo" => $request->filled('photo') ? $image : $article->photo,
            "Ref" => $ref,
        ]);

        if ($request->filled('fournisseur')) {
            $tabFournisseur = $request->fournisseur;
            $fournisseurs = Fournisseur::whereIn('nom_complet', $tabFournisseur)->pluck('id');
            $article->fournisseurs()->sync($fournisseurs);
        }



        return new ArticleRessource($article,"la modification de l'article s'est passée avec succées");

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article,$id)
    {
        $article = Article::find($id);
        $article->delete();
        return new ArticleRessource($article,"article supprimer avec success");
    }
}
