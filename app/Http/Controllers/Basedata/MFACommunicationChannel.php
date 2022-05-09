<?php

namespace App\Http\Controllers\Basedata;

use App\Http\Controllers\Controller;
use App\Models\MFACommunicationChannel as ModelsMFACommunicationChannel;
use Illuminate\Http\Request;

class MFACommunicationChannel extends Controller
{
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
