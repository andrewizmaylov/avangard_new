<?php

namespace App\Http\Controllers;

use App\OrderProduct;
use Illuminate\Http\Request;

class OrderProductsController extends Controller
{
    public function update($id, Request $request)
    {
    	// dd($id, ($request->all())[2]["quantity"]);
    	foreach ($request->all() as $itemInOrder) {
    		// dd($itemInOrder["quantity"]);
    		$row = OrderProduct::find($itemInOrder["id"]);
    		$row->update(["quantity" => $itemInOrder["quantity"]]);
    		// dd(OrderProduct::find($itemInOrder["id"]));
    		// $row->save();

    		// return response(['message' => 'record updated'], 200);
    	}
    }
}
