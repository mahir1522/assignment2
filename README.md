# API Documentation

## URL to access: http://localhost:3000 and https://assignment2-omega-nine.vercel.app/

(to use localhost:3000 url, you have to run the project by writing node index.js, https url, already hosted on cloud using vercel and supabase )

### Endpoints

For Greet: ```POST``` with ```/api/greet```

For timesOfDay: ```GET``` with ```/api/timesOfDay```

For languages: ```GET``` with ```/api/languages``` 


# Request body with POST with endpoint with ```/api/greet```

```json
{
    "timeOfDay": "Afternoon",
    "language": "French",
    "tone": "Formal"
}
```

## Response Body if we don't have any data then

```json
{
    "error": "No data avaible"
}
```

## when we have data

```json
{
    "greetingMessage": "Bonjour!"
}
```

# To GET time of day use endpoint ```/api/timesOfDay```

```json
{
    "timeOfDay": [
        "Morning",
        "Afternoon",
        "Evening"
    ]
}
```

# To GET all the Languaegs use endpoint ```/api/languages```

```json
{
    "Languages": [
        "English",
        "French",
        "Spanish"
    ]
}
```

## You can find all the code in this link over here: https://github.com/mahir1522/assignment2



## I also have client created in C#, dotnet make sure to you run the client to test the cloud api, you can send post request their, by providing the `timeOfDay`, `language`, and `tone`. If a matching greeing message is found in the database, you will receive the greeting message. Otherwise, you will get a `no data found` message.