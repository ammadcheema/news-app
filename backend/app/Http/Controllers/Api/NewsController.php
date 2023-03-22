<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiBaseController;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Validator;
use DB;
use GuzzleHttp\Client;


class NewsController extends ApiBaseController
{

    private $newsapi;
    private $apiKey, $client;
    private $countries = array(
		'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr',
		'hk', 'hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl', 'pt',
		'ro','rs','ru','sa','se','sg','si','sk','th','tr','tw','ua','us','ve','za');

	private $languages = array('ar','en','cn','de','es','fr','he','it','nl','no','pt','ru','sv');
	private $categories = array('business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology');
	private $sort = array('relevancy', 'popularity', 'publishedAt');

    public function __construct()
    {
		$this->api_key = env('NEWS_API_KEY', false);
        $this->client = new Client(['timeout'  => 30]);
        if(!$this->apiKey) {
            return $this->sendError('Invalid api key', Response::HTTP_BAD_REQUEST);
        }
    }

    public function AuthHeaders()
	{
		return array(
			'Accept' => 'application/json',
			'Authorization' => "Bearer {$this->api_key}");
	}
    public function getPreferences()
    {
        try {
            $data = array();
            $data['countries'] = $this->getCountries();
            $data['languages'] = $this->getLanguages();
            $data['categories'] = $this->getCategories();
            return $this->sendSuccess($data);
        } catch( \Exception $e ) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function getCountries()
    {
        try {   
            $data = $this->countries;
            $countries = array();
            foreach($data as $d) {
                array_push($countries,[
                    'key' => $d,
                    'value'=> config('constants.countryList.'.strtoupper($d))
                ]);
            }
            return $countries;
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getLanguages()
    {
        try {   
            $data = $this->languages;
            $languages = [];
            foreach($data as $d) {
                array_push($languages,[
                    'key' => $d, 
                    'value' => config('constants.languageList.'.$d)
                ]);
            }
            return $languages;
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getSources(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'language' => 'string',
            'category' => 'string',
            'country'  => 'string',
        ]);

        $user = Auth::user();

        if($validator->fails()){
            return $this->sendError(
                $validator->errors(),
                Response::HTTP_BAD_REQUEST
            ); 
        }

        $payload = [
            'category' =>  $request->category ?? $user->selected_category,
            'language' => $request->language ?? $user->selected_language,
            'country'  =>  $request->country ?? $user->selected_country
        ];

        $url = $this->getUrl('sources');
        $data = $this->client->request('GET', $url, ['headers'=>$this->AuthHeaders(), 'query'=>$payload]);
        
        if($data->getStatusCode() == 200){
            $data = json_decode($data->getBody()->__toString())->sources;
        } else {
            $data = json_encode($data->getBody());
            return $this->sendError($data->message);
        }

        return $this->sendSuccess($data);
    }

    public function getCategories()
    {
        try {   
            $data = $this->categories;
            $categories = array();
            foreach($data as $d) {
                array_push($categories,[
                    'key' => $d,
                    'value' => ucfirst(strtolower($d)),
                ]);
            }
            return $categories;
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getUrl($endPoint, $params=null){
		if(!is_null($params)){
			return "https://newsapi.org/v2/{$endPoint}?{$params}";
		}
		return "https://newsapi.org/v2/{$endPoint}";
	}

    public function getPayload($request) {
        
        $payload = array();
        //Add Search keyword if provided
        if (isset($request->keyword) && $request->keyword) {
            $payload['q'] = $request->keyword;
        }
        
        //Add Sources if provided
        if (!is_null($request->sources)) {
            $payload['sources'] = $request->sources;
        }
        
        //Add country if provided
        if (!is_null($request->country)) {
            $payload['country'] = $request->country;
        }
        
        //Add category if provided
        if (!is_null($request->category)) {
            $payload['category'] = $request->category;
        }
        
        //Add category if provided
        if (!is_null($request->sortBy)) {
            $payload['sortBy'] = $request->sortBy;
        }
        
        if (!is_null($request->pageSize)) {
            $payload['pageSize'] = $request->pageSize;
        }
        
        if(!is_null($request->page)) { 
            $payload['page']=$request->page; 
        }

        if (!is_null($request->domains)) { 
            $payload['domains'] = $request->domains;
        }

        if (!is_null($request->excludeDomains)) { 
            $payload['excludeDomains'] = $request->excludeDomains; 
        }

        if(!is_null($request->from)) {
            $payload['from']=$request->from;
        }

        if(!is_null($request->to)) {
            $payload['to']=$request->to;
        }
        // dd($payload);
        
        return $payload;
    }

    public function getTopHeadlines(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'sources'   =>  [ 
                                    'prohibited_unless:category,null,','required_without:category',
                                    'prohibited_unless:country,null,','required_without:country'
                                ],
                'category'  =>  [ 'prohibited_unless:sources,null','required_without:sources', ],
                'country'   =>  [ 'prohibited_unless:sources,null','required_without:sources',  ],
                'pageSize'  =>  ['integer', 'max:100', 'min:1'],
                'sortBy'    =>  ['in:'.implode(",", $this->sort)], 
            ]);
            if($validator->fails()){
                return $this->sendError(
                    $validator->errors(),
                    Response::HTTP_BAD_REQUEST
                ); 
            }

            $payload = $this->getPayload($request);
            $url = $this->getUrl('top-headlines');
            $headers = $this->AuthHeaders();
            try {
                $data = $this->client->request('GET', $url, ['headers'=>$headers, 'query'=>$payload]);

                if($data->getStatusCode() == 200){
                    $data = json_decode($data->getBody()->__toString());
                    $data = ['totalResults' => $data->totalResults, 'news' => $data->articles];
                } else {
                    $data = json_encode($data->getBody());
                    return $this->sendError($data->message);
                }
            } catch (\Exception $e) {
                return $this->sendError($e->getMessage());
            }    

            return $this->sendSuccess($data, '');
        
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getEverything(Request $request)
    {
       try {
            $validator = Validator::make($request->all(), [
                'sources'   =>  'string',
                'language'   => 'string',
                'pageSize'  =>  ['integer', 'max:100', 'min:1'],
                'sortBy'    =>  ['in:'.implode(",", $this->sort)], 
                'to'        =>  'date_format:Y-m-d',
                'from'      =>  'date_format:Y-m-d',
            ]);
            if($validator->fails()){
                return $this->sendError(
                    $validator->errors(),
                    Response::HTTP_BAD_REQUEST
                ); 
            }

            $payload = $this->getPayload($request);

           try {
                $url = $this->getUrl('everything');
                $data = $this->client->request('GET', $url, ['headers'=>$this->AuthHeaders(), 'query'=>$payload]);
            } catch (\Exception $e) {
                return $this->sendError($e->getMessage());
            }
            if($data->getStatusCode() == 200){
                
                $data = json_decode($data->getBody()->__toString());
                $data = ['totalResults' => $data->totalResults, 'news' => $data->articles];
            } else{
                
                $data = json_encode($data->getBody());
                return $this->sendError($data->message);
            }
            
            return $this->sendSuccess($data, '');
        } catch(\Exception $e) {
            return response()->json($e->getMessage());
        }
    }
}
