<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        $roles = is_array($role) ? $role : explode('|',$role);

        if(Auth::user()->hasAnyRole($roles)){
            return $next($request);
        }

        return redirect('/login');
    }
}
