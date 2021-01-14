<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderProduct;
use Illuminate\Http\Request;

class OrderController extends Controller
{
	private static $initialCount = 0;

    public function index()
    {
    	return Order::take(70)->get();
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
		
		return response(['order' => $order, 'orderDetails' => $orderDetails]);
    }

    public function update($id, Request $request)
    {
    	// dd($request->all());
    	$order = Order::find($id);
    	if(!$order) {
    		return response(['message' => 'update failed, server error'], 500);
    	}
    	$order->update($request->all());

    	return response(['message' => 'update completed'], 200);
    }

    public function sortBack()
    {
    	return Order::orderByDesc('delivery_dt')->get();
    }
}
