<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Model;

/**
 * Certificate Type
 * @package App\Models\Basedata
 * 
 * @table basedata_certificatetype
 * @primarykey id
 */
class CertificateType extends Model
{
    protected $table = 'basedata_certificatetype';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
