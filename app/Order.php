<?php

namespace App;

use App\OrderProduct;
use App\Partner;
use App\Product;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
    	'status', 'client_email', 'partner_id', 'delivery_dt'
    ];

    protected $amount;

    public function products()
    {
    	return $this->belongsToMany(Product::class, 'order_products');
    }
    public function partner()
    {
    	return $this->belongsTo(Partner::class);
    }

    public function details()
    {
        return OrderProduct::where('order_id', $this->id)->get();
    }

    public function createMailList()
    {
        $client = [];
        $emailList = [];

        $emailList[] = $client['client_email'] = $this->client_email;
        $emailList[] = $client['partner_email'] = $this->partner->email;

        $vendors = [];
        foreach ($this->products as $product) {
            $emailList[] = $vendors[$product->name] = $product->vendor->email;
        }

        return $emailList;
        // return (['client' => $client, 'vendors' => $vendors]);
    }

    public function orderAmount()
    {
        foreach ($this->details() as $product) {
            $this->amount = $this->amount + ($product->quantity*$product->price);
        }
        
        return $this->amount;
    }
}
