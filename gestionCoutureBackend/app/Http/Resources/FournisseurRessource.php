<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FournisseurRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
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
                'id' => $this->id,
                'libelle' => $this->nom_complet
        ];
    }
}
