# Laravel + React News-App

## Setting Up Backend

- 1. `cd backend`
- 2. `composer install`
- 3. `cp .env.example .env`
- 4. `php artisan key:generate`
- 5. `generate your api key's from` [News Api](https://newsapi.org/)
- 6. `php artisan migrate:fresh`
- 7. `php artisan serve`



## Setting Up Frontend

- 1. `cd frontend`
- 2. `npm install`
- 3. `npm start`


# 
## Available Endpoints:

- `[POST] 'api/register'`
``` json
{
    "status": "success",
    "message": "---",
    "code": 200
    "data": {
        "id": "0g712lxy5oqdp6n8",
        "email": "####",
        "_token": "#####",
        "country": "us",
        "language": "en",
        "category": "business"
    }
}
```
#
- `[POST] 'api/login'`
``` json
{
    "status": "success",
    "message": "---",
    "code": 200
    "data": {
        "id": "0g712lxy5oqdp6n8",
        "email": "####",
        "_token": "#####",
        "country": "us",
        "language": "en",
        "category": "business"
    }
}
```

#
- `[PUT/PATCH] 'api/profile'`
``` json
{
    "status": "success",
    "message": "---",
    "code": 200
    "data": {
        "id": "0g712lxy5oqdp6n8",
        "email": "####",
        "_token": "#####",
        "country": "us",
        "language": "en",
        "category": "business"
    }
}
```

#
- `api/news/sources`    
``` JSON
{
    "status": "success",
    "message": "OK",
    "data": [
        {
            "id": "bloomberg",
            "name": "Bloomberg",
            "description": "Bloomberg delivers business and markets news, data, ####",
            "url": "http://www.bloomberg.com",
            "category": "business",
            "language": "en",
            "country": "us"
        },
        #####
    ]
}
```


#
- `api/news/preferences`
``` json  
{
    "status": "success",
    "message": "OK",
    "code": 200,
    "data": {
        "countries": [
            {
                "key": "ae",
                "value": "United Arab Emirates"
            }, 
            #####
        ],
        "languages": [
            {
                "key": "ar",
                "value": "Arabic"
            },
           #####
        ],
        "categories": [
            {
                "key": "business",
                "value": "Business"
            },
            ####
        ]
    }
}

```

#
- `api/news/topHeadlines`
```JSON
{
    "status": "success",
    "message": "OK",
    "code": 200,
    "data": {
        "totalResults": 25,
        "news": [
            {
                "source": {
                    "id": ##,
                    "name": "Fox Business"
                },
                "author": "Landon Mion",
                "title": "Foot Locker closing 400 shopping mall locations - Fox Business",
                "description": "Foot Locker said it will close more than....",
                "url": "https://www.foxbusiness.com/####",
                "urlToImage": "https://a57.foxnews.com/#####",
                "publishedAt": "2023-03-21T08:39:17Z",
                "content": "Foot Locker announced Monday ##### "
            },
            ######
        ]
    },
}
```

#

- `api/news/everything`   

``` JSON
{
    "status": "success",
    "message": "OK",
    "data": {
        "totalResults": 4480,
        "news": [
            {
                "source": {
                    "id": "bild",
                    "name": "Bild"
                },
                "author": "Doreen Beilke",
                "title": "Einbrecher plünderten Sammlung  - Tausende #####",
                "description": "Leipzig – Sein erstes Auto war ein Jeep, ####",
                "url": "https://www.bild.de/regional/###",
                "urlToImage": "https://images.bild.de/#####",
                "publishedAt": "2023-03-20T20:19:06Z",
                "content": "Leipzig Sein erstes Auto ######"
            },
            ####
        ]
    },
}

```