<?php 

namespace App\Utility;

class OTP {
    public $get = array();
    /**
     * @method Generate
     */
    protected function Generate() {
        $otp = sprintf("%06d", mt_rand(1, 999999));;
        return $otp;
    }

    public function Create() {
        $this->get = [
            'otp' => $this->Generate()
        ];
        return $this;
    }
}