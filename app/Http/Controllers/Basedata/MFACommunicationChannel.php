<?php

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\MFACommunicationChannel as ModelsMFACommunicationChannel;
use Illuminate\Http\Request;

/**
 * Multi-Factor Authentication (MFA) Communication Channel
 * @package App\Http\Controllers\Basedata
 * 
 * @route:prefix /mfa-channels
 */
class MFACommunicationChannel extends Controller
{
    /**
     * Get MFA Channels which are active within the system.
     * 
     * @route:get /
     * 
     * @param Request $req
     * 
     * @return mixed
     */
    public function getActiveChannels(Request $req) {
        try {
            // Find
            $find = ModelsMFACommunicationChannel::query()->where('is_active', '=', true);

            return response()->success(
                200,
                'MFA Communication Channel',
                $find->get()
            );
        } catch (\Exception $e) {
            return response()->error(
                500,
                'An error has occured while fetching active MFA communication channels.'
            );
        }
    }
}
