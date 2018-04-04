<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
//     protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('guest')->except('logout');
    }
    
    /**
     * 自定义认证字段
     * @return string
     */
    // public function username() {
    //     return 'name';
    // }
    
    /**
     * 根据底层的login方法进行修改
     * @param \App\Http\Controllers\Auth\Request $request
     * @return type
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
//        if (Auth::check(['email' => $request->email, 'password' => $request->password])) {
            // 认证通过...
            return $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
         $this->incrementLoginAttempts($request);

         return $this->sendFailedLoginResponse($request);
    }
    
    /**
     * 根据底层方法修改
     * @param \App\Http\Controllers\Auth\Request $request
     * @return type
     */
    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);
//        return $this->authenticated($request, $this->guard()->user())
//                ?: redirect()->intended($this->redirectPath());
        return $this->authenticated($request, $this->guard()->user())
                ?: $request->json($this->guard()->user());
    }
    
    public function logout(Request $request) {
        $this->guard()->logout();

        $request->session()->invalidate();

        return;
    }
}
