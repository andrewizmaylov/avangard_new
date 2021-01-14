<?php

namespace App\Http\Controllers;

use App\OrderProduct;
use Illuminate\Http\Request;

class OrderProductsController extends Controller
{
    public function update($id, Request $request)
    {
    	// dd($id, $request->all());
    	foreach ($request->all() as $itemInOrder) {
    		$row = OrderProduct::find($itemInOrder["id"]);
    		$row->quantity = $itemInOrder["quantity"];
    		$row->save();

    		return response(['message' => 'record updated'], 200);
    	}
    }
}
