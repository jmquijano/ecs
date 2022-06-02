<?php 
namespace App\Http\Controllers;

use App\Models\Boundaries\GeoPath;
use App\Models\Boundaries\PSGC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

/**
 * Boundaries (PSGC)
 * @package App\Http\Controllers
 */
class Boundaries extends Controller {
    public function Provinces(Request $req) {
        try {
            $serialize = [];

            $getpsgc = PSGC::query()->where('type', '=', 'PROVINCE')->where('is_active', '=', true)->orderBy('id', 'asc');

            foreach ($getpsgc->get() as $psgc) {
                $geopath = GeoPath::query()->where('boundaries_psgc_id', '=', $psgc->id);
                $serialize[] = [
                    'id' => $psgc->id,
                    'name' => $psgc->name,
                    'type' => $psgc->type,
                    'path' => $geopath->get(['longitude as lng', 'latitude as lat'])
                ];
            }
            return response()->success(200, 'Provinces', $serialize);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    public function Cities(Request $req) {
        try {
            $parent = rtrim($req->get('parent'), '0');
            // $range = intval(str_replace('0', '9', $parent));
            $serialize = [];

            if ($parent >= 1) {
                $getpsgc = PSGC::query()
                ->whereIn('type', ['CITY', 'MUNICIPALITY', 'SUB-MUNICIPALITY'])
                // ->whereBetween('id', [$parent, $range])
                ->where('id', 'like',  $parent . '%')
                ->where('is_active', '=', true)
                ->orderBy('id', 'asc');

                foreach ($getpsgc->get() as $psgc) {
                    $geopath = GeoPath::query()->where('boundaries_psgc_id', '=', $psgc->id);
                    $serialize[] = [
                        'id' => $psgc->id,
                        'name' => $psgc->name,
                        'type' => $psgc->type,
                        'path' => $geopath->get(['longitude as lng', 'latitude as lat'])
                    ];
                }
            }
            
            return response()->success(200, 'Cities', $serialize);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }

    public function Barangays(Request $req) {
        try {
            $parent = rtrim($req->get('parent'), '0');
            // $range = intval(str_replace('0', '9', $parent));
            $serialize = [];

           

            if ($parent >= 1) {
                $cache_key = "Barangays_{$parent}";
                $getpsgc = PSGC::query()->whereIn('type', ['BARANGAY'])
                            // ->whereBetween('id', [$parent, $range])
                            ->where('id', 'like',  $parent . '%')
                            ->where('is_active', '=', true)
                            ->orderBy('id', 'asc');

                if (Cache::has($cache_key)) {
                    $serialize = Cache::get($cache_key);
                } else {
                    foreach ($getpsgc->get() as $psgc) {
                        $geopath = GeoPath::query()->where('boundaries_psgc_id', '=', $psgc->id);
                        $serialize[] = [
                            'id' => $psgc->id,
                            'name' => $psgc->name,
                            'type' => $psgc->type,
                            'path' => $geopath->get(['longitude as lng', 'latitude as lat'])
                        ];
                    }

                    Cache::put($cache_key, $serialize, 3600);
                }
            }
            
            return response()->success(200, 'Barangays', $serialize);
        } catch (\Exception $e) {
            return response()->error(500, $e->getMessage());
        }
    }
}