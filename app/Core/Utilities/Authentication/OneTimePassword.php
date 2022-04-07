<?php 
/**
 * app/Utility/OTP.php 
 * @author jmquijano
 */
namespace App\Core\Utilities\Authentication;

use App\Models\MFACommunicationChannel;
use App\Models\OTP as OTPModel;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;

use Carbon\Carbon;

class OneTimePassword {
    public $get = array();
    /**
     * @method GenerateCode
     */
    protected function GenerateCode() {
        $otp = sprintf("%06d", mt_rand(1, 999999));;
        return $otp;
    }

    /**
     * @method Create
     */
    public function Create(?int $mfa_communication_channel = 1, ?int $expire = 3600) {
        try {
            // Find MFA Communication Channel
            $findChannel = MFACommunicationChannel::query()->findOrFail($mfa_communication_channel);

            // Check if MFA Comm. Channel is active
            if ($findChannel->is_active) {
                // Get Generated Code
                $code = $this->GenerateCode();
                $hashed_code = Hash::make($code);

                // Store OTP in database
                $store = OTPModel::query()->create([
                    'otp' => $hashed_code,
                    'is_revoked' => false,
                    'mfa_communication_channel_id' => $mfa_communication_channel,
                    'expires_at' => (new Carbon())->now()->addSeconds($expire)
                ]);

                $this->get = $store->toArray();
                $this->get['code'] = $code;

                return $this;
            } else {
                die(throw new \Exception('The communication channel has been disabled.'));
            }

        } catch (ModelNotFoundException $e) {
            throw new \Exception('The communication channel was not found.');
        } catch (\Exception $e) {
            throw $e;
        }
    }
}