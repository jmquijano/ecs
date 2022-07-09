<?php 
/**
 * @package App\Core\Exceptions\Models
 * @author Justine Quijano
 */
namespace App\Core\Exception\Models;

use Illuminate\Database\Eloquent\Model;

class ExceptionModel extends Model {
    protected $table = 'core_exceptions';
    protected $primaryKey = 'uuid';
    public $timestamps = false;

    /**
     * Get Exception as Array
     * 
     * @param string $code
     * @param bool|null $array
     * @return array
     */
    public function get(string $code, ?bool $array = false) : array {
        $findExceptionCode = $this->query()->where('code', '=', $code);
        
        return $array ? $findExceptionCode->first()->makeHidden(['uuid'])->toArray() : $findExceptionCode->first()->makeHidden(['uuid']);
    }

    /**
     * Get Message String
     * 
     * @param string $code
     * @param array|null $replaceVars
     * @param bool|null $makeErrorCodeVisible
     * @return string
     */
    public function getMessageString(
        string $code, 
        ?array $replaceVars = [], 
        ?bool $makeErrorCodeVisible = false) : string 
    {
        $findExceptionCode = $this->query()->where('code', '=', $code);
        $message = str($findExceptionCode->pluck('message')->first());

        if (env("APP_DEBUG")) {
            $makeErrorCodeVisible = true;
        }
        
        // Replace Variables
        foreach ($replaceVars as $key => $var) {
            $message = str_replace('{{' . $key . '}}', $var, $message);
        }

        return $message . ($makeErrorCodeVisible ? ' (EC: ' .  $findExceptionCode->pluck('code')->first() . ')' : '');
    }
}