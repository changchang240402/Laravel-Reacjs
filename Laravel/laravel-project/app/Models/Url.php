<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Url extends Model
{
    use HasFactory;

    protected $table = 'urls';

    protected $fillable = [
        'url',
        'code',
        'hash',
        'user_id',
    ];

    public function url(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
}

