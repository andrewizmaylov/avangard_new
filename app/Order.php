<?php

namespace App;

use App\Partner;
use App\Product;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
    	'status', 'client_email', 'partner_id', 'delivery_dt'
    ];

    public function products()
    {
    	return $this->belongsToMany(Product::class, 'order_products');
    }
    public function partner()
    {
    	return $this->belongsTo(Partner::class);
    }
}
