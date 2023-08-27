<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FournisseurCollection extends ResourceCollection
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
            'data' => $this->collection->map(function ($fournisseur) {
                return [
                    'id' => $fournisseur->id,
                    'libelle' => $fournisseur->nom_complet,
                ];
            }),
        ];
    }
}
