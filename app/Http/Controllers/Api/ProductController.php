<?php

namespace App\Http\Controllers\Api;

use App\ProductReview;
use App\Product;
use App\Category;
use App\Store;


use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();

        foreach ($products as $prod) {
            $prod['store_name'] = Store::find($prod->store_id)->name;
            $prod['store_picture'] = Store::find($prod->store_id)->display_picture;
            $prod['category_name'] = Category::find($prod->category_id)->name;
        }
        return response()->json($products);
    }

    public function myProducts()
    {

        $user = Auth::user();
        $store = $user->store;
        $products = $store->products->reverse()->values();
        foreach ($products as $prod) {
            $prod["key"] = $prod->id;
            $prod["category"] = Category::find($prod->category_id)->name;
        }
        return response()->json($products);
    }

    public function getFiltered(Request $request)
    {
        if ($request->has("search")) {
            $products = collect(DB::select("Select * from products where name like ?", ['%' . $request['search'] . '%']));
        } else {

            $products = Product::all();
        }

        $products = $products->reverse()->values();

        if ($request->has("price_min")) {
            $products = $products->where('price', '>=', $request['price_min'])->values();
        }
        if ($request->has("price_max")) {
            $products = $products->where('price', '<=', $request['price_max'])->values();
        }
        if ($request->has("category")) {
            $cat = Category::where('name', '=', $request['category'])->first();
            if ($cat) {
                $products = $products->where('category_id', $cat->id)->values();
            }
        }
        if ($request->has("lat") && $request->has("long")) {
            //
        }

        if ($request->has("low_price")) {
            $products = $products->sortBy('price')->values();
        }

        if ($request->has("high_price")) {
            $products = $products->sortByDesc('price')->values();
        }






        return response()->json($products);
    }


    public function getShopProducts($shop_id)
    {

        $store = Store::find($shop_id);
        $products = $store->products->reverse()->values();
        foreach ($products as $prod) {
            $prod["key"] = $prod->id;
            $prod["category"] = Category::find($prod->category_id)->name;
        }
        return response()->json($products);
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
        $store = $user->store;
        $request['store_id'] = $store->id;
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($product_id)
    {
        $product = Product::findOrFail($product_id);
        $product->store->user;
        $reviews = $product->reviews;


        if (count($reviews) > 0) {

            $total = 0;
            $noOfReviews = 0;

            foreach ($reviews as $rev) {
                $total += $rev['rating'];
                $noOfReviews++;
                $rev->user;
            }


            $product["avg_rating"] = $total / $noOfReviews;
        }
        $product["key"] = $product->id;

        $product["category"] = Category::find($product->category_id)->name;
        return response()->json($product);
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
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        // $category = Category::select('id')->where('name', $request['category'])->first();
        // $request['category_id'] = $category->id;
        // unset($request['category']);

        $product->update($request->all());
        return response()->json($product, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
    }
}
