<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     * CSRF 保护检查
     *
     * @var array
     */
    protected $except = [
        // 添加字段后排出csrf检查
        // 仅针对web.php的路由
        // api.php是第三方接口，无法进行csrf检查
    ];
}
