<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Model;

class CertificateType extends Model
{
    protected $table = 'basedata_certificatetype';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
