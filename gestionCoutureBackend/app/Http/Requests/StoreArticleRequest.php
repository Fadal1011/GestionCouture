<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "libelle"=>"required",
            "prix"=>"required|min:1",
            "stock"=>"required|min:1",
            "categorie"=>"required",
            "photo"=>"required",
            "fournisseur"=>"required"
        ];
    }
}
