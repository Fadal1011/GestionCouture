<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategorieRessource extends JsonResource
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
            'message' =>$this->message,
            'data' => [
                "libelle" => $this->libelle,
            ],
        ];
    }
}
