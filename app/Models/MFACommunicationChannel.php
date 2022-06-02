<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * MFA Communication Channel
 * @package App\Models
 * 
 * @table mfa_communication_channel
 * @primarykey id
 */
class MFACommunicationChannel extends Model {
   protected $table = 'mfa_communication_channel';
   protected $primaryKey = 'id';
   public $timestamps = false;
   const CREATED_AT = 'created_at';
   const UPDATED_AT = 'updated_at';
}