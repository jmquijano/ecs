<?php


namespace App\Core\Utilities\Authentication;

use App\Core\Utilities\Generator\Uuid;
use Carbon\Carbon;
use PHPOpenSourceSaver\JWTAuth\Claims\Expiration;
use PHPOpenSourceSaver\JWTAuth\Claims\IssuedAt;
use PHPOpenSourceSaver\JWTAuth\Claims\Issuer;
use PHPOpenSourceSaver\JWTAuth\Claims\JwtId;
use PHPOpenSourceSaver\JWTAuth\Claims\NotBefore;
use PHPOpenSourceSaver\JWTAuth\JWT as JWTAuthJWT;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;

class JsonWebToken
{
    protected $iss;

    protected $sub;

    protected $payload;
    protected $exp;

    public $token;
    public $expires_in;
    public $jti;

    protected function setIssuer(string $issuer) {
        $this->iss = $issuer;
        return $this;
    }

    protected function setSubject($subject) {
        $this->sub = $subject;
        return $this;
    }

    protected function setPayload($payload) {
        $this->payload = $payload;
        return $this;
    }

    protected function setExpiration($payload) {
        $this->exp = $payload;
        return $this;
    }
    

    public function parse($request) {
        $token = \JWTAuth::parseToken();
        return $token->getPayload();

        // return \JWTAuth::getPayload($token)->toArray();
    }

    public function parseByParam(string $access_token) {
        \JWTAuth::setToken($access_token);
        return \JWTAuth::getPayload()->toArray();
    }


    public function __call($name, $arguments)
    {
        // TODO: Implement __call() method.
        $method = strtolower($name);

        switch ($name) {
            case "issuer":
                call_user_func_array(array($this, 'setIssuer'), $arguments);
                break;
            case "subject":
                call_user_func_array(array($this, 'setSubject'), $arguments);
                break;
            case "payload":
                call_user_func_array(array($this, 'setPayload'), $arguments);
                break;
            case "expire":
                call_user_func_array(array($this, 'setExpiration'), $arguments);
                break;
        }

        return $this;
    }

    public function Create() {
        $iss = $this->iss;
        $sub = $this->sub;
        $additionalPayload = $this->payload;

        $data = [
            'iss' => new Issuer($iss),
            'iat' => new IssuedAt(Carbon::now('UTC')) ,
            'nbf' => new NotBefore(Carbon::now('UTC')),
            'jti' => new JwtId(Uuid::create()->v4),
        ];

        if ($this->exp !== null) {
            $data['exp'] = new Expiration(Carbon::now('UTC')->addSeconds(intval($this->exp)));
        } else {
            $data['exp'] = new Expiration(Carbon::now('UTC')->addDays(1));
        }

        if ($sub !== null) {
            $data['sub'] = $sub;
        }

        if ($additionalPayload !== null) {
            $data['data'] = $additionalPayload;
        }

        $customClaims = \JWTFactory::customClaims($data);
        $payload = \JWTFactory::make($data);
        $token = \JWTAuth::encode($payload);

        // Set
        $this->token = $token->get();
        $this->expires_in = json_decode($data['exp'])->exp;
        $this->jti = json_decode($data['jti'])->jti;

        return $this;

    }
}