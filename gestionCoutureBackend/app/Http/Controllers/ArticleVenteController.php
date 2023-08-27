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
    public function index()
    {
        $article = ArticleVente::paginate(3);
        return new ArticleVenteCollection($article);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function RecupDonnéeForm()
    {
        $categorie = Categorie::where("type","Vente")->get();
        $articleConf = Article::all();
        $combinedData = [
            'categories' => $categorie,
            'articleConf'=>$articleConf,
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
        // $format = explode(";", $request->photo)[0];
        // if($format ==="data:image/png"){
        //     $image = str_replace('data:image/png;base64,','',$request->photo);
        // }
        // if($format ==="data:image/jpg"){
        //     $image = str_replace('data:image/jpg;base64,','',$request->photo);
        // }

        // if($format ==="data:image/jpeg"){
        //     $image = str_replace('data:image/jpeg;base64,','',$request->photo);
        // }

        $categorie = Categorie::where('libelle', $request->categorie)->first();
        // $lib = substr($request->libelle, 0, 3);
        // $ref = "ref-" . $lib . $categorie->id . "3";

        // dd($request->libelle);

        $articleVente = ArticleVente::create([
            "libelle" => $request->libelle,
            "prix" => 100,
            "stock" => 10,
            "valuePromo"=>$request->valuePromo,
            "categorie_id" => $categorie->id,
            "coutFabrication" => $request->coutFabrication,
            "photo" => $request->photo,
            "marge"=>$request->marge,
            "Ref" => $request->ref,

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
    public function update(UpdateArticleVenteRequest $request, ArticleVente $articleVente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ArticleVente  $articleVente
     * @return \Illuminate\Http\Response
     */
    public function destroy(ArticleVente $articleVente)
    {
        //
    }
}
