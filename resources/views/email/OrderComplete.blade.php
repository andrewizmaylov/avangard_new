@component('mail::message')
# Order Confirmation

We are glad to inform you, that order №{{$order->id}} is delivered.

Order consists of  <br/>
@foreach($order->products as $item)
{{$item->name}} <br/>
@endforeach

Order amount is {{$order->orderAmount()}}



Thanks,<br>
{{ config('app.name') }}
@endcomponent
