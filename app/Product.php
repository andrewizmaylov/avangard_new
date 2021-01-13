<?php

namespace App;

use App\Vendor;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
    	'name', 'price', 'vendor_id'
    ];

    public function orders()
    {
    	return $this->belongsToMany(Order::class);
    }

    public function vendor()
    {
    	return $this->belongsTo(Vendor::class);
    }
}
