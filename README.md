# web-service-with-coordination-policy
a web service that provides operations through api endpoints using a coordination policy


## usage
- cd into `/backend` start the backend server by running `node app.js`
- cd into `/client-app` and start using the application to perform operations

These are the operations supported by this web service
```
Usage: app [options] [command]

Options:
-h, --help                                       display help for command

Commands:
register <username> <password>
login <username> <password>
send <your_username> <receiver_username> <text>
receive <your_username>
help [command]                                   display help for command
```
