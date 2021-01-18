<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderProduct;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\OrderComplete;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
	private static $initialCount = 0;

    public function index()
    {
    	return Order::all();
    }
    public function getAmount($amount=100)
    {
        // dd($amount);
        if ($amount == "1000") {
            return $this->index();
        }
        return Order::take($amount)->get();
    }

    public function details($id)
    {
    	$order = Order::find($id);
    	if(!$order) {
    		return null; 
    	}

    	$partner = $order->partner; // full info about a partner, include partner->name field for output
    	$products = $order->products; // return array of products as object
    	$orderDetails = $order->details(); // return all ordered position
		
		return response(['order' => $order, 'orderDetails' => $orderDetails]);
    }

    public function update($id, Request $request)
    {
    	$order = Order::find($id);
    	if(!$order) {
    		return response(['message' => 'update failed, server error'], 500);
    	}
    	$order->update($request->all());

    	return response(['message' => 'update completed'], 200);
    }

    public function delayedOrders()
    {
        $date = Carbon::now();

        return $result = Order::where('status', '10')->where('delivery_dt', '<=', $date)->orderByDesc('delivery_dt')->get();
    }

    public function notConfirmedOrders()
    {
        $date = Carbon::now();

        return $result = Order::where('status', '0')->where('delivery_dt', '<=', $date)->orderByDesc('delivery_dt')->get();
    }

    public function completedOrders()
    {
        $date = Carbon::now();

        return $result = Order::where('status', '20')->orderByDesc('delivery_dt')->get();
    }

    public function newOrders()
    {
        $date = Carbon::now();

        return $result = Order::where('status', '0')->where('delivery_dt', '>', $date)->orderBy('delivery_dt')->get();
    }

    public function todayOrders()
    {
        $date = Carbon::now();
        $next = Carbon::now()->addDay();

        return $result = Order::whereBetween('delivery_dt', [$date, $next])->where('status', '10')->get();
    }

    public function sendMail($id)
    {
        $order = Order::find($id);
        $mailList = $order->createMailList();
        if (env('MAIL_USERNAME') && env('MAIL_PASSWORD')) {
            try {
                Mail::to($mailList)->send(new OrderComplete($order));
                return response(['message' => 'mail OK'], 200);
            } catch (Exception $e) {
            }

        } else {
            return response(['message' => 'Some key is missing. Check Mail configuration inside the .env file.'], 403);
        }
    }
}
