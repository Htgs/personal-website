<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UtilsController extends Controller
{
    //
    /**
     * 返回token值
     * @return type
     */
    public function token() {
        $token = csrf_token();
        return response()->json($token);
    }
}
