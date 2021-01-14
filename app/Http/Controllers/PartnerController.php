<?php

namespace App\Http\Controllers;

use App\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function update($id, Request $request)
    {
    	// dd($request->all());
    	$partner = Partner::find($id);
    	if(!$partner) {
    		return response(['message' => 'update failed, server error'], 500);
    	}
    	$partner->update($request->all());

    	return response(['message' => 'update completed'], 200);
    }
}
