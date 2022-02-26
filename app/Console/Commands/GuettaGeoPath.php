<?php

namespace App\Console\Commands;

use App\Models\Boundaries\GeoPath;
use App\Models\Boundaries\PSGC;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class GuettaGeoPath extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'guetta:geopath';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @method RetrieveFromGuetta
     */
    private function GuettaService(int $parentId) {
        if ($parentId >= 1) {
            $client = Http::get('https://gema-api.globe.com.ph/v1/guetta/boundaries', [
                'parentId' => $parentId
            ]);
        } else {
            $client = Http::get('https://gema-api.globe.com.ph/v1/guetta/boundaries');
        }
        

        if ($client->successful()) {
            $response = $client->object();
            
            foreach ($response as $res) {
                // $this->info($res->id . '|' . $res->name);
                foreach ($res->path as $path) {
                    $this->info($res->id . '|' . $res->name . '|' . $path->lng . '|' . $path->lat);

                    // Check Duplicates in GeoPath
                    $checkDuplicates = (GeoPath::query()->where([
                        'boundaries_psgc_id' => $res->id, 
                        'longitude' => $path->lng,
                        'latitude' => $path->lat
                    ])->count() >= 1 ? true : false);

                    if ($checkDuplicates == false) {
                        // Store Paths in Database
                        $storePath = GeoPath::query()->create([
                            'boundaries_psgc_id' => $res->id,
                            'longitude' => $path->lng,
                            'latitude' => $path->lat
                        ]);
                    }

                    
                }
            }
        } else {
            throw new \Exception('An error has occured while consuming Guetta.');
        }
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Starting Guetta');

        $psgc = PSGC::query()->whereIn('type', ['POVINCE', 'MUNICIPALITY', 'SUB-MUNICIPALITY', 'CITY', 'DISTRICT', 'BARANGAY', 'REGION']);
        foreach ($psgc->get() as $psgc) {
            
            
             
        }

        $this->GuettaService(0);
        
        
        // Fetch REGION boundaries from PSGC
        foreach ($psgc->get() as $region) {
            $this->info('Fetching ' . $region->type);
            $this->GuettaService($region->id);
            $this->info('END');
        }
        /*
        // Fetch PROVINCE boundaries from PSGC
        $provinces = PSGC::query()->where(['type' => 'PROVINCE']);
        foreach ($provinces->get() as $province) {
            $this->info('Fetching Provinces');
            $this->GuettaService($province->id);
            $this->info('END');
        }

        // Fetch municipality boundaries from PSGC
        $municipalities = PSGC::query()->where(['type' => 'MUNICIPALITY']);
        foreach ($municipalities->get() as $municipality) {
            $this->info('Fetching municipalities');
            $this->GuettaService($municipality->id);
            $this->info('END');
        }

        // Fetch municipality boundaries from PSGC
        $municipalities = PSGC::query()->where(['type' => 'MUNICIPALITY']);
        foreach ($municipalities->get() as $municipality) {
            $this->info('Fetching municipalities');
            $this->GuettaService($municipality->id);
            $this->info('END');
        } */

        $this->info('Guetta operation has ended successfully');
    }
}
