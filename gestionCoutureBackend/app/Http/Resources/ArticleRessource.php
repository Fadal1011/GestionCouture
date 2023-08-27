<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    protected $message;

    public function __construct($resource, $message="")
    {
        parent::__construct($resource);
        $this->message = $message;
    }


    public function toArray($request)
    {
         return [
            'data' => [
                'id' => $this->id,
                'libelle' => $this->libelle,
                'prix' => $this->prix,
                'stock'=>$this->stock,
                'categorie'=>$this->categorie->libelle,
                'photo'=>$this->photo,
                'ref'=>$this->ref,
                'fournisseurs' => FournisseurRessource::collection($this->fournisseurs)
            ],
            'message' => $this->message,
        ];
    }
}
