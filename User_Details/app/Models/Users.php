<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table= 'user';
    protected $primaryKey = 'id';
    protected $fillable = ['name','phone_number','email','dob','college_name','graduation_year'];
    use HasFactory;
}
