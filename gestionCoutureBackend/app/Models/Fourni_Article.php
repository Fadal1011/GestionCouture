<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fourni_Article extends Model
{
    protected $guarded=[

    ];
    use HasFactory;

    public function fournisseur()
    {
        return $this->belongsTo(fournisseur::class);
    }
}
