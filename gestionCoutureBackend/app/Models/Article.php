<?php

namespace App\Models;

use App\Http\Resources\ArticleRessource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory ,SoftDeletes;

    protected $guarded=[

    ];

    public function categorie(){
        return $this->BelongsTo(Categorie::class);
    }
    public function fournisseurs()
    {
        return $this->belongsToMany(fournisseur::class, 'fournisseur_articles');
    }


    protected static function boot()
{
    parent::boot();

    static::created(function (Article $article) {
        $tabFournisseur = request()->input('fournisseur');
        $fournisseurs = Fournisseur::whereIn('nom_complet', $tabFournisseur)->pluck('id');
        $article->fournisseurs()->attach($fournisseurs);
    });
}

}
