<?php

namespace App\Models\Basedata;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TransactionType extends Model
{
    protected $table = 'basedata_transactiontype';
    protected $primaryKey = 'id';
    public $timestamps = false;
    
    /**
     * Find by Shortname
     */
    public function findByShortname($value) {
        $find = $this->query()->where('shortname', '=', $value)->where('is_active', '=', true);

        if ($find->count() <= 0) {
            throw new ModelNotFoundException("$value couldn't be found on 'basedata_transactiontype'");
        }

        return $find->first();
    }
}
