<?php

namespace App\Http\Controllers;

use App\Models\fournisseur;
use App\Http\Requests\StorefournisseurRequest;
use App\Http\Requests\UpdatefournisseurRequest;

class FournisseurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorefournisseurRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorefournisseurRequest $request)
    {
        $fournisseur = fournisseur::create([
            "nom_complet"=>$request->nom_complet,
        ]);

        return $fournisseur;
    }

    public function searchFour($fourn){
        $fournisseurs =fournisseur::where('nom_complet','like','%'.$fourn.'%')->get();
        return $fournisseurs;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\fournisseur  $fournisseur
     * @return \Illuminate\Http\Response
     */
    public function show(fournisseur $fournisseur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\fournisseur  $fournisseur
     * @return \Illuminate\Http\Response
     */
    public function edit(fournisseur $fournisseur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatefournisseurRequest  $request
     * @param  \App\Models\fournisseur  $fournisseur
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatefournisseurRequest $request, fournisseur $fournisseur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\fournisseur  $fournisseur
     * @return \Illuminate\Http\Response
     */
    public function destroy(fournisseur $fournisseur)
    {
        //
    }
}
