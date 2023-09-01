<?php

namespace App\Http\Controllers;

use App\Models\ArticleVente;
use App\Http\Requests\StoreArticleVenteRequest;
use App\Http\Requests\UpdateArticleVenteRequest;
use App\Http\Resources\ArticleVenteCollection;
use App\Http\Resources\ArticleVenteRessource;
use App\Models\Article;
use App\Models\Categorie;

class ArticleVenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($nbrePage=3)
    {
        $article = ArticleVente::paginate($nbrePage);
        return new ArticleVenteCollection($article);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function RecupDonnéeForm()
    {
        $categorie = Categorie::where("type", "Vente")->get();
        $articleConf = Article::all();

        $formattedArticleConf = $articleConf->map(function ($article) {
            return [
                'id' => $article->id,
                'libelle' => $article->libelle,
                'prix' => $article->prix,
                'stock' => $article->stock,
                'categorie' => $article->categorie->libelle, // Utilisation du libellé de la catégorie
                'Ref' => $article->Ref,
                'ArticleConf' => $article->articles,
            ];
        });

        $combinedData = [
            'categories' => $categorie,
            'articleConf' => $formattedArticleConf,
        ];

        return $combinedData;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreArticleVenteRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreArticleVenteRequest $request)
    {
        $categorie = Categorie::where('libelle', $request->categorie)->first();
        $articleVente = ArticleVente::create([
            "libelle" => $request->libelle,
            "prix" => 100,
            "stock" => 10,
            "valuePromo"=>$request->valuePromo,
            "categorie_id" => $categorie->id,
            "coutFabrication" => $request->coutFabrication,
            "photo" => $request->photo,
            "marge"=>$request->marge,
            "Ref" => $request->Ref,

        ]);
        return new ArticleVenteRessource($articleVente);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ArticleVente  $articleVente
     * @return \Illuminate\Http\Response
     */
    public function show(ArticleVente $articleVente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ArticleVente  $articleVente
     * @return \Illuminate\Http\Response
     */
    public function edit(ArticleVente $articleVente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateArticleVenteRequest  $request
     * @param  \App\Models\ArticleVente  $articleVente
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateArticleVenteRequest $request, $id)
    {
        $articleVente=ArticleVente::find($id);
        $categorie = Categorie::where('libelle', $request->categorie)->first();
        $articleVente->update([
            "libelle" => $request->libelle,
            "prix" => 100,
            "stock" => 10,
            "valuePromo"=>$request->valuePromo,
            "categorie_id" => $categorie->id,
            "coutFabrication" => $request->coutFabrication,
            "photo" => $request->photo,
            "marge"=>$request->marge,
            "Ref" => $request->Ref,

        ]);

        $tabArticleConf = request()->input('articleConf');
        $articlesWithQuantities = [];

        if ($tabArticleConf !== null) {
            foreach ($tabArticleConf as $articleData) {
                $id = $articleData['id'];
                $quantite = $articleData['quantite'];
                $articlesWithQuantities[$id] = ['quantite' => $quantite];
            }
        }

        $articleVente->articles()->sync($articlesWithQuantities);
        return new ArticleVenteRessource($articleVente);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ArticleVente  $articleVente
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $articleVente = ArticleVente::find($id);
        $articleVente->delete();
        return new ArticleVenteRessource($articleVente,'article supprimer avec success');
    }
}
