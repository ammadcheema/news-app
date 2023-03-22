<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HashidsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // skip decoding for this route
        if (in_array(request()->route()->getName(), config('constants.skipDecodeRoutes'))) {
			return $next($request);
		}

		if ($request->has('decodeMe')) {
			$request->merge(json_decode($request->decodeMe, true));
		}
        
		$inputs = $request->all();
		$inputs = x_decode_ids($inputs);
		$request->replace($inputs);

		return $next($request);
    }
}
