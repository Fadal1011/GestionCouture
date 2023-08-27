<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Http\Resources\CategorieCollection;
use App\Http\Resources\CategorieRessource;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Mockery\Undefined;
use Spatie\LaravelIgnition\Http\Requests\UpdateConfigRequest;

class CategorieController extends Controller
{


    public function index($nombre = null)
    {
        $nombrePaginate = 3;

        if ($nombre) {
            $nombrePaginate = $nombre;
        }
     $listCategorie = Categorie::orderBy('id', 'DESC')->paginate($nombrePaginate);

       return new CategorieCollection($listCategorie);


    }

    public function store(StoreCategorieRequest $request)
    {

        $categorie = Categorie::create([
            "libelle" => $request->libelle,
            "type" => $request->type
        ]);

        $categorieRes = new CategorieRessource($categorie);
        return $categorieRes;
    }

    public function update(UpdateCategorieRequest $request, $id)
    {
        $libelle = $request->libelle;
        $updateCategorie = Categorie::find($id);
        $updateCategorie->update(['libelle' => $libelle]);

        return new CategorieRessource($updateCategorie);
    }


    public function destroy(Request $request)
    {
        // if(!empty($id)){
        //     $recupElement = Categorie::find($id);
        //     $recupElement->delete();
        //     return response()->json([
        //         "message" => "Le catégori sélectionnées a été supprimée avec succès"
        //     ]);
        // }

        $ids = $request->ids;
        if($ids ===[]){
            return response()->json([
                "message" => "Aucune categorie n'a été selectionner"
            ]);
        }

        $categorie =Categorie::whereIn('id', $ids)->delete();
        // return new CategorieRessource($categorie);

        return response()->json([
            "message" => "Les catégories sélectionnées ont été supprimées avec succès"
        ]);
    }

    public function search($libelle)
    {
        $searchcat = Categorie::where('libelle', $libelle)->first();
        return new CategorieRessource($searchcat);
        // return $searchcat;
    }

    public function all(){
        $listCategorie = Categorie::all();
        return new CategorieCollection($listCategorie);
   }
}
