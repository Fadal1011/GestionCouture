<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleVenteRessource extends JsonResource
{
    protected $message;

    public function __construct($resource, $message="")
    {
        parent::__construct($resource);
        $this->message = $message;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
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
                'Ref'=>$this->Ref,
                'valuePromo'=>$this->valuePromo,
                'coutFabrication'=>$this->coutFabrication,
                'marge'=>$this->marge,
                'AricleConf' => $this->articles
            ],
            'message' => $this->message,
        ];
    }
}
