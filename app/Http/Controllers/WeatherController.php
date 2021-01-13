<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function showWeather()
    {
    	$client = new Client();

    	$response = $client->request('GET', 'https://api.weather.yandex.ru/v2/forecast?', [
    		'query' => [
    			'lat' => '53.243325',
    			'lon' => '34.363731',
    			'lan' => 'ru_RU'
    		],
    		'headers' => [
    			'X-Yandex-API-Key' => env('YANDEX_WEATHER_API')
    		],
    	]);
    	// dd($response->getStatusCode());
    	if($response->getStatusCode() !== 200) {
			return response(['message' => 'data failed', 'result' => null], 200);
    	}
    	$result = json_decode($response->getBody()->getContents());
		return response(['message' => 'ok', 'result' => $result], 200);
    }
}
