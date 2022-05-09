<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Model;

class DocType extends Model
{
    protected $table = 'basedata_doctype';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
