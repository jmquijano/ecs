<?php 
/**
 * app/Trait/ContactChannelFormatTrait.php 
 * @author jmquijano
 */
namespace App\Trait;

trait ContactChannelFormatTrait {
    private string $AreaCode;
    public function PrependAreaCode(string $AreaCode) {
        $this->AreaCode = $AreaCode;
        return $this;
    }

    public function FormatMobileNumber(?string $MobileNumber = null, ?int $cut = 10, ?string $position = "right") {
        switch ($position) {
            case "right":
                $MobileNumber = substr($MobileNumber, -$cut);
                break;
            case "left":
                $MobileNumber = substr($MobileNumber, $cut);
                break;
        }
        return ($this->AreaCode ?? "63") . $MobileNumber;
    }
}