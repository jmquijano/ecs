<?php 
/**
 * app/Models/Logs/SMSTracer.php 
 * @author jmquijano
 */
namespace App\Models\Logs;

use Illuminate\Database\Eloquent\Model;

class SMSTracer extends Model {
    protected $table = 'logs_smstracer';
    protected $primaryKey = 'id';

    protected $fillable = [
        'message_body',
        'recipient',
        'sender_id',
        'api_response'
    ];

    public $timestamps = false;
}