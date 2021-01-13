<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderProduct;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
    	return Order::all();
    }

    public function index10()
    {
    	return OrderProduct::whereBetween('order_id', [1000, 1200])->get();
    }

    public function details($id)
    {
    	$order = Order::find($id);
    	if(!$order) {
    		return null; 
    	}

    	$partner = $order->partner; // full info about a partner, include partner->name field for output
    	$products = $order->products; // return array of products as object
    	$orderDetails = OrderProduct::where('order_id', $id)->get(); // return all ordered position
		
		return response(['order' => $order, 'partner' => $partner, 'products' => $products, 'orderDetails' => $orderDetails]);
    }
}
