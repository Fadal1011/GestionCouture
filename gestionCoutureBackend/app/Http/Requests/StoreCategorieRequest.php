<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategorieRequest extends FormRequest
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
            "libelle" =>"required|min:3",
            "type" => "required",
        ];
    }

    public function messages()
{
    return [
        'libelle.required' => 'Le champ "libelle" est obligatoire.',
        'libelle.min' => 'Le champ "libelle" doit avoir trois caracteres',
    ];
}
}
