<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleVente extends Model
{
    use HasFactory;

    protected $guarded=[];
    public function categorie(){
        return $this->BelongsTo(Categorie::class);
    }

    public function articles(){
        return $this->BelongsToMany(Article::class, 'article_article_ventes')
        ->withPivot('quantite');
    }
    protected static function boot()
    {
        parent::boot();

        static::created(function (ArticleVente $articleVente) {
            $tabArticleConf = request()->input('articleConf');
            $articlesWithQuantities = [];
            if($tabArticleConf !==null){
                foreach ($tabArticleConf as $articleData) {
                    $libelle = $articleData['libelle'];
                    $quantite = $articleData['quantite'];

                    $article = Article::where('libelle', $libelle)->first();

                    if ($article) {
                        $articlesWithQuantities[$article->id] = ['quantite' => $quantite];
                    }
                }
            }



            $articleVente->articles()->attach($articlesWithQuantities);
        });
    }
}
