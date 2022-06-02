<?php

namespace App\Models\OTP;

use App\Models\Basedata\TransactionType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * OTP Requests
 * @package App\Models\OTP
 * 
 * @table otp_requests
 * @primarykey id
 * 
 * @fillable (json) initiator
 * @fillable (int) otp
 * @fillable (int) transactiontype
 * @fillable (string) transaction_reference_number
 * @fillable (timestamptz) created_at
 * @fillable (timestamptz) expires_at
 * @fillable (bool) is_revoked
 */
class Requests extends Model
{
    protected $table = 'otp_requests';
    protected $primaryKey = 'id';
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'initiator', // json
        'otp', // FK
        'transactiontype', // FK
        'transaction_reference_number',
        'created_at',
        'expires_at',
        'is_revoked'
    ];

    /**
     * Generate Reference Number
     * 
     * @param mixed $prefix
     * 
     * @return string
     */
    public function generateReferenceNumber($prefix) {
        // column
        $column = 'transaction_reference_number';

        // Set a prefix
        $prefix = $prefix . '-' .  date('Y') . date('m') . date('d') . '-';

        // Find the highest reference number
        $highest = $this->query()->orWhere($column, 'like',  $prefix . '%');

        $highest = (
            $highest->count() >= 1 ? 
            // (intval($highest->max($column)) + 1)
            $prefix . sprintf('%05d', $highest->count() + 1)
            : 
            $prefix . sprintf('%05d', $highest->count() + 1)
        );

        return strval(
            $highest
        );
    }

    /**
     * Get Transaction Type
     * 
     * @param string|int $transaction_type
     * 
     * @return mixed
     */
    private function getTransactionType(string|int $transaction_type) {
        // Lookup Transaction Type
        $transaction = new TransactionType();
        if (is_string($transaction_type)) {
            $transaction = $transaction->findByShortname($transaction_type);
        } else if (is_integer($transaction_type)) {
            $transaction = $transaction->query()->find($transaction_type);
        }

        return $transaction;
    }

    /**
     * Find Matching Valid OTP Request
     * 
     * @param string|int $transaction_type
     * @param array $initiator
     * 
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function findMatchingValidRequest(string|int $transaction_type, array $initiator) {
        $transaction = $this->getTransactionType($transaction_type);

        // Find
        $find = $this->query()
                ->where('initiator->type', '=', $initiator['type'] ?? null)
                ->where('initiator->user_id', '=', $initiator['user_id'] ?? null)
                ->where('transactiontype', '=', $transaction->id ?? null)
                ->where('expires_at', '>=', Carbon::now())
                ->where('is_revoked', '=', false)
                ->latest('id');

        return $find;
    }

    /**
     * Create New OTP Request
     * 
     * @param string|int $transaction_type
     * @param array $initiator
     * 
     * @return mixed
     */
    public function createNew(string|int $transaction_type, array $initiator) {
        $transaction = $this->getTransactionType($transaction_type);

        $initiator = json_encode($initiator);

        $create = $this->query()->create([
            'initiator' => $initiator,
            'transactiontype' => $transaction->id,
            'transaction_reference_number' => $this->generateReferenceNumber($transaction->prefix),
            'expires_at' => Carbon::now()->addMinutes(30),
            'is_revoked' => false
        ]);

        return $create;
    }
}
