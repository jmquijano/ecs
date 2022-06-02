<?php 
/**
 * app/Models/Logs/SMSTracer.php 
 * @author jmquijano
 */
namespace App\Models\Logs;

use Illuminate\Database\Eloquent\Model;

/**
 * SMS Tracer - Logs for sent SMS.
 * @package App\Models\Logs
 * 
 * @table logs_smstracer
 * @primarykey id
 * 
 * @fillable (string) message_body
 * @fillable (string) recipient
 * @fillable (string) sender_id - Sender Mask ID (e.g. BFP-ECS)
 * @fillable (mixed) api_response — Can be JSON encoded string.
 */
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