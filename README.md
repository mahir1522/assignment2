# API Documentation

## URL to access: http://localhost:3000

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
