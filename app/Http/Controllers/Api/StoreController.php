<?php

namespace App\Http\Controllers\Api;

use App\Store;
use App\StoreType;
use App\Address;
use App\User;
use App\ShopAttachment;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stores = Store::all();

        foreach ($stores as $store) {
            $store->attachments;
        }
        return response()->json($stores);
    }

    public function myShop()
    {

        $user = Auth::user();
        // $user = User::find(5);
        $store = $user->store;

        $store['store_owner'] = $user->name;
        $store['store_type'] = StoreType::find($store->store_type_id)->name;
        $store['address'] = Address::find($store->address_id)->place;
        $store['city'] = Address::find($store->address_id)->city;
        $store['name'] = strtoupper($store->name);

        $store->attachments;

        foreach ($store['attachments'] as $attachment) {

            $attachment['status'] = 'Done';
            $attachment['uid'] = $attachment['id'];
        }

        return response()->json($store);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $address = Address::create([
            'place' => $request->input('address'),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
            'zip' => $request->input('zip'),
            'country' => $request->input('country')
        ]);

        $storetype = StoreType::select('id')->where('name', $request['store_type'])->first();
        $request['user_id'] = $user->id;
        $request['address_id'] = $address->id;

        $attachments = $request['attachments'];


        unset($request['address']);
        unset($request['latitude']);
        unset($request['longitude']);
        unset($request['zip']);
        unset($request['country']);
        unset($request['city']);
        unset($request['attachments']);


        $store = Store::create($request->all());

        foreach ($attachments as $attachment) {
            ShopAttachment::create([
                'name' => $attachment['name'],
                'url' => $attachment['response']['url'],
                'shop_id' => $store->id
            ]);
        }

        return response()->json($store, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        // $user = User::find(2);
        $store = $user->store;


        $address = Address::find($store->address_id);
        $address->update([
            'place' => $request->input('address'),
            'latitude' => $request->input('latitude'),
            'longitude' => $request->input('longitude'),
            'zip' => $request->input('zip'),
            'city' => $request->input('city'),
            'country' => $request->input('country')
        ]);



        unset($request['address']);
        unset($request['latitude']);
        unset($request['longitude']);
        unset($request['zip']);
        unset($request['country']);
        unset($request['city']);


        if (!empty($request['attachments'])) {

            $store->attachments()->delete();
            $attachments = $request['attachments'];
            unset($request['attachments']);

            foreach ($attachments as $attachment) {

                if (isset($attachment['response'])) {
                    $url =  $attachment['response']['url'];
                } else {
                    $url =  $attachment['url'];
                }
                ShopAttachment::create([
                    'name' => $attachment['name'],
                    'url' => $url,
                    'shop_id' => $store->id
                ]);
            }
        }

        $store->update($request->all());

        return response()->json($store, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $store = Store::find($id);
        $store->delete();
    }
}
