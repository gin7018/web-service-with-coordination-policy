# web-service-with-coordination-policy
a web service that provides operations through api endpoints using a coordination policy

## usage

- start the app by running `node app.js`

## api endpoints

#### authentication
- `PUT /auth/register`
  <br>body: 
```
{
    "username": "",
    "password": ""
}
```

- `GET /auth/login`
  <br>body:
```
{
    "username": "",
    "password": ""
}
```
_note: the endpoints above return a session token which you must use <br>
in the `Authorization` header field for the subsequent requests._

#### messaging
- `POST /messages/send`
  <br>body:
```
{
    "username": "",
    "receiver": "<receiver username>",
    "text": "<message you want to send>"
}
```

- `POST /messages/receive`
  <br>body:
```
{
    "username": "<username of user that wants to receive messages>",
}
```

#### status codes
- 200 - request was correctly processed
- 4xx - error occurred; most likely auth token misconfiguration 