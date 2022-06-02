<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use App\Core\Utilities\Communication\ShortMessagingService as SmsUtility;

/**
 * SMS and Email Templates.
 * This is use for various communication such as OTP, Notification, etc.
 * @package App\Models
 * 
 * @table core_communicationtemplates
 * @primarykey id
 */
class CommunicationTemplates extends Model
{
    protected $table = 'core_communicationtemplates';
    protected $primaryKey = 'id';
    public $timestamps = false;
    const CREATED_AT = null;
    const UPDATED_AT = null;

    /**
     * Send SMS
     * 
     * @param string|int $template_id
     * @param array $param
     * 
     * @return void
     */
    public function sendSms(
        string|int $template_id, 
        string $recipient,
        array $param
    ) {
        // Find Template
        if (is_int($template_id)) {
            $findTemplate = $this->query()->find($template_id);
        } else if (is_string($template_id)) {
            $findTemplate = $this->query()->where('shortname', '=', $template_id)->first();
        }

        // Get SMS Template
        $sms_template_string = $findTemplate->sms_template_string ?? null;

        if ($sms_template_string == null) {
            throw new \Exception('Zeptomail Template ID not found.');
            die();
        }

        // Replace vars
        foreach ($param as $key => $value) {
            $sms_template_string = str_replace('{{' . $key . '}}', $value, $sms_template_string);
        }

        $sms = (new SmsUtility())
        ->body($sms_template_string)
        ->sender('SMS_API_SenderID_1')
        ->recipient($recipient)
        ->build();
    }

    /**
     * Send Email
     * 
     * @param string|int $template_id
     * @param array $param
     * 
     * @return bool
     */
    public function sendEmail(
        string|int $template_id, 
        string $recipient_name , 
        string $recipient_email, 
        string $sender_name,
        string $sender_address, 
        array $param
    ) {
        // Find Template
        if (is_int($template_id)) {
            $findTemplate = $this->query()->find($template_id);
        } else if (is_string($template_id)) {
            $findTemplate = $this->query()->where('shortname', '=', $template_id)->first();
        }

        // Get Zeptomail Template ID
        $zm_template_id = $findTemplate->zeptomail_template_id ?? null;

        if ($zm_template_id == null) {
            throw new \Exception('Zeptomail Template ID not found.');
            die();
        }

        // Send Email
        $connect = Http::bodyFormat('json')->withHeaders([
            'Authorization' => env('ZM_API_AuthKey')
        ])->post(env('ZM_API_TEMPLATE_BASEURL'), [
            "mail_template_key" => $zm_template_id,
            "bounce_address" => env('ZM_API_BounceAddress'),
            "from" => [
                "address" => ($sender_address ?? 'no-reply') . '@' . env('ZM_API_BaseDomain'),
                "name" => $sender_name ?? 'BFP ECS'
            ],
            "to" => [
                [
                    "email_address" => [
                        "address" => $recipient_email,
                        "name" => $recipient_name
                    ]
                ]
            ],
            "merge_info" => $param
        ]);

        return true;
    }
}
