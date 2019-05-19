<?php

namespace App\Http\Controllers\Api;

use App\Post;
use App\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function allPosts()
    {
        $user = Auth::user();
        // $user = User::find(1);

        $store = $user->shop;
        // $posts = $store->posts->sortByDesc('created_at');
        $posts = $store->posts->reverse()->values();
        return response()->json($posts);
    }

    public function index()
    {
        $posts = Post::all();

        foreach ($posts as $post) {
            $post['shop_name'] = Shop::find($post->store_id)->name;
            $post['shop_picture'] = Shop::find($post->store_id)->display_picture;
        }

        return response()->json($posts);
    }


    public function getShopPosts($shop_id)
    {
        $shop = Shop::find($shop_id);
        $posts = $shop->posts->reverse()->values();
        return response()->json($posts);
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
        // $user = User::find(1);

        $shop = $user->shop;
        $request['shop_id'] = $shop->id;

        $post = Post::create($request->all());
        return response()->json($post, 201);
    }

    public function productPost(Request $request)
    {
        $description = "We just added a new product to our store. Buy " . $request['name'] . " at Rs. " . $request['price'] . " only." . " Contact us for more info";

        $request->replace([
            "description" => $description,
            "image_path" => $request['display_picture']
        ]);

        return $this->store($request);
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
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        $post->update($request->all());
        return response()->json($post, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();
    }
}
