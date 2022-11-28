<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStasticsRequest;
use App\Http\Requests\UpdateStasticsRequest;
use App\Models\Channel;
use App\Models\Stastics;
use Illuminate\Http\Request;

class StasticsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('stastics.index');
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
     * @param  \App\Http\Requests\StoreStasticsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStasticsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Stastics  $stastics
     * @return \Illuminate\Http\Response
     */
    public function show(Stastics $stastics,Request $request)
    {
        $channel=Channel::find($request->id);
        return view('stastics.show',['channel'=>$channel]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Stastics  $stastics
     * @return \Illuminate\Http\Response
     */
    public function edit(Stastics $stastics)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStasticsRequest  $request
     * @param  \App\Models\Stastics  $stastics
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStasticsRequest $request, Stastics $stastics)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Stastics  $stastics
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stastics $stastics)
    {
        //
    }
}
