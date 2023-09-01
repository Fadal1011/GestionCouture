<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleVenteController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\FournisseurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/addLibelle',[CategorieController::class,'store']);
Route::get('/listLibelle/{nombre?}',[CategorieController::class,'index']);
route::put("/modifierLibelle/{id}",[CategorieController::class,'update']);
route::post("/deleteLibelle",[CategorieController::class,'destroy']);
route::get("/searchLibelle/libelle/{libelle}",[CategorieController::class,'search']);
route::get("/all",[CategorieController::class,'all']);



route::post('/fournisseur',[FournisseurController::class,'store']);
route::get('/search/{fourn}',[FournisseurController::class,'searchFour']);




Route::get('/categorie_fournisseur',[ArticleController::class,'index']);
Route::post('/article',[ArticleController::class,'store']);
Route::delete('/article/{id}',[ArticleController::class,'destroy']);
Route::put('/article/{id}',[ArticleController::class,'update']);
Route::get('/article',[ArticleController::class,'ArticlePaginate']);











Route::post('/articleVente',[ArticleVenteController::class,'store']);
Route::get('/articleVente/{nbrePage?}',[ArticleVenteController::class,'index']);
Route::put('/articleVente/{id}',[ArticleVenteController::class,'update']);
Route::delete('/articleVente/{id}',[ArticleVenteController::class,'destroy']);

Route::get('/aricle_categorie',[ArticleVenteController::class,'RecupDonnéeForm']);

