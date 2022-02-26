<?php 

namespace App\Models\Enrollment;

use Illuminate\Database\Eloquent\Model;

class Drafts extends Model {
    protected $table = 'enrollment_drafts';
    protected $primaryKey = 'id';

    public $timestamps = false;
}