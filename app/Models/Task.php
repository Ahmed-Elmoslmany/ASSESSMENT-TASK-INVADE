<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\enums\TaskStatus;
use App\Models\Category;
use App\Models\User;

class Task extends Model
{

    use HasFactory, SoftDeletes;

    protected $casts = [
        'status' => TaskStatus::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function getStatusColorAttribute()
    {
        return $this->status->getColor();
    }


}
