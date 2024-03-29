<?php

namespace App\Http\Resources;

use App\Models\Article;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ArticleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    private $message;
    public function __construct($resource, $message="")
    {
        parent::__construct($resource);
        $this->message = $message;
    }
    public function toArray($request)
    {
        return [
            'message' => $this->message,
            'current_page' => $this->currentPage(),
            'per_page' => $this->perPage(),
            'TotalPages'=>$this->total(),
            'data' => $this->collection->map(function ($article) {
                return [
                    'id' => $article->id,
                    'libelle' => $article->libelle,
                    'prix' => $article->prix,
                    'stock' => $article->stock, 
                    'categorie' => $article->categorie->libelle,
                    'photo' => $article->photo,
                    'ref' => $article->ref,
                    'fournisseurs' => FournisseurRessource::collection($article->fournisseurs)
                ];
            }),
        ];
    }

}

