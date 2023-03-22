<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Controller as Controller;
use DB;

class ApiBAseController extends Controller
{
    public function sendSuccess($data, $message = '', $code = Response::HTTP_OK)
    {
        if($message == '') {
            $message = config('constants.httpErrorMessages.'.$code) ?? '';
        }

        $response = [
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'code' => $code
        ];

        return response()->json($response, $code);
    }

    public function sendError($errors = [], $code = Response::HTTP_NOT_FOUND, $message = '', $data = null)
    {
        if($message == '') {
            $message = config('constants.httpErrorMessages.'.$code) ?? '';
        }

        $response = [
            'status' => 'error',
            'message' => $message,
            'errors' => $errors,
            'data' => $data,
            'code' => $code
        ];

        return response()->json($response, 200);
    }

    public function getToken($user)
    {
        $token = $user->createToken('Personal_token')->accessToken;
        return $token;
    }

}
