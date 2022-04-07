<?php 
/**
 * app/Utility/HttpRequestFootprint.php  
 * @author jmquijano
 */

namespace App\Core\Utilities\Http;

use Illuminate\Http\Request;

class ClientRequestFootprint {
    public array|string $footprint;
    /**
     * Get Current Request Footprint such as Client IP address and Device.
     * Retrieve the client/user's device information (user agent) and IP address
     * @param Request $req
     * @return array|json
     */
    public function __construct(Request $req, bool $json_encode = false)
    {
        $footprint = [
            "Client-IP" => $req->ip(),
            "Client-Device" => $req->header('User-Agent')
        ];
        
        $this->footprint = $json_encode ? json_encode($footprint) : $footprint;
    }
}