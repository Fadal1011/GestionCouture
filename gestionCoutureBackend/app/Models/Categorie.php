<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categorie extends Model
{
    use HasFactory , SoftDeletes;
    protected $guarded=[

    ];
    public function article(){
        return $this->belongsTo(Article::class,'categore_id');
    }
}
