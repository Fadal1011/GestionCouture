<?php

use App\Models\Categorie;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_ventes', function (Blueprint $table) {
            $table->id();
            $table->string('libelle')->unique();
            $table->boolean('promo')->default(false);
            $table->integer('valuePromo')->nullable()->default(null);
            $table->integer('prix');
            $table->string('stock');
            $table->foreignIdFor(Categorie::class)->constrained()->cascadeOnDelete();
            $table->longText('photo');
            $table->string('Ref');
            $table->integer('coutFabrication');
            $table->integer('marge');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_ventes');
    }
};
