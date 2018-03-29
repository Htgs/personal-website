<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function auth() {
        if (Auth::User()) {
            return Auth::User();
        } else {
            abort(401);
        }
    }
}
