<?php

namespace App\Core\Utilities\Communication;

use App\Models\Logs\SMSTracer;
use Illuminate\Support\Facades\Http;

class ShortMessagingService {    
    protected $message;
    protected $sender;
    protected $recipient;

    function __construct()
    {
        
    }

    public function body(string $message) {
        /*
        |--------------------------------------------------------------------------
        | Replace breaks
        |--------------------------------------------------------------------------
        */
        $message = str_replace("<br>", "\r", $message);

        $this->message = urlencode($message);
        return $this;
    }

    public function sender(string $sender) {
        /*
        |--------------------------------------------------------------------------
        | Retrieve Sender ID from dotenv
        |--------------------------------------------------------------------------
        */
        $this->sender = env($sender, "ECS");

        return $this;
    }

    public function recipient(string $number) {
        $this->recipient = $number;
        return $this;
    }

    public function build() {
        /*
        |--------------------------------------------------------------------------
        | Check if message parameter has been set
        |--------------------------------------------------------------------------
        */
        if ($this->message == null) {
            throw new \Exception("You have not set message body.");
            die();
        }

        /*
        |--------------------------------------------------------------------------
        | Check if sender parameter has been set
        |--------------------------------------------------------------------------
        */
        if ($this->sender == null) {
            throw new \Exception("You have not set sender ID.");
            die();
        }

        /*
        |--------------------------------------------------------------------------
        | Check if recipient parameter has been set
        |--------------------------------------------------------------------------
        */
        if ($this->recipient == null) {
            throw new \Exception("You have not set a recipient.");
            die();
        }

        /*
        |--------------------------------------------------------------------------
        | Build the API URL
        |--------------------------------------------------------------------------
        */
        $build = str_replace(":recipient", $this->recipient, str_replace(":senderid", $this->sender, str_replace(":body", $this->message, env("SMS_API_BASEURL")) ) );
        
        /*
        |--------------------------------------------------------------------------
        | Send to SMS API
        |--------------------------------------------------------------------------
        */
        $ApiResponse = "SMS API has been turned off on the environment.";
        if (env("SMS_API_ENABLE")) {
            $api = Http::get($build);
            $ApiResponse = $api->body();
        }


        /*
        |--------------------------------------------------------------------------
        | Store log in DB
        |--------------------------------------------------------------------------
        */
        $logStore = SMSTracer::query()->create([
            'message_body' => urldecode($this->message),
            'recipient' => $this->recipient,
            'sender_id' => $this->sender,
            'api_response' => $ApiResponse
        ]);

        return true;
    }


}