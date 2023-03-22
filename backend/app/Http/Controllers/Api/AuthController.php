<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiBaseController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Validator;
use DB;
   
class AuthController extends ApiBaseController {

    public function register(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'name'  	        => 'required|string|max:255',
                'email'             => "required|email|string|max:255|unique:users",
                'password'          => 'required|string|min:8|confirmed',
                'language' => 'string',
                'category' => 'string',
                'country'  => 'string',
            ]);

            if($validator->fails()){
                return $this->sendError(
                    $validator->errors(),
                    Response::HTTP_BAD_REQUEST,
                    '',
                ); 
            }

            $input = $request->all();
            if(isset($request->category) && $request->category) {
                $input['selected_category'] = $request->category;
            }

            if(isset($request->language) && $request->language) {
                $input['selected_language'] = $request->language;
            }

            if(isset($request->country) && $request->country) {
                $input['selected_country'] = $request->country;
            }

            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $user = User::find($user->id);
            $response = UserResource::make($user);
            return $this->sendSuccess($response, 'User register successfully.');

        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
   

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email'             => "required|email|string|max:255|exists:users",
                'password'          => 'required|string|min:8',
            ]);

            if($validator->fails()){
                return $this->sendError(
                    $validator->errors(),
                    Response::HTTP_BAD_REQUEST
                ); 
            }

            if(Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
                $user = Auth::user();
                $response = UserResource::make($user);
                return $this->sendSuccess($response, 'Login  successful');
            }
            
            return $this->sendError(['email' => [config('constants.customErrorMessages.InvalidUsernameOrPassword')]], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'password'          => 'string|min:8',
                'category'          => 'string',
                'language'          => 'string',
                'country'           => 'string',
                'name'              => 'string',
            ]);

            if($validator->fails()){
                return $this->sendError(
                    $validator->errors(),
                    Response::HTTP_BAD_REQUEST
                ); 
            }

            $user = User::find(auth('api')->user()->id);
            if(isset($request->name) && $request->name) {
                $user->name = $request->name ?? $user->name;
            }
            if(isset($request->category) && $request->category) {
                $user->selected_category = $request->category ?? $user->selected_category;
            }

            if(isset($request->language) && $request->language) {
                $user->selected_language = $request->language ?? $user->selected_language;
            }
            
            if(isset($request->country) && $request->country) {
                $user->selected_country = $request->country ?? $user->selected_country;
            }
            
            // if(isset($request->password) && $request->password) {
            //     $user->password = bcrypt($request->password) ?? $user->password;
            // }

            $user->save();

            $response = UserResource::make(User::find(auth('api')->user()->id));
            return $this->sendSuccess($response, 'Profile updated');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
