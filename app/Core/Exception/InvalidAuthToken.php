<?php
/**
 * app/Core/Exception/InvalidAuthToken.php 
 * @author jmquijano
 */

namespace App\Core\Exception;

use Exception;

class InvalidAuthToken extends Exception {
    public function render() {
        return response()->error(401, $this->getMessage());
    }
}