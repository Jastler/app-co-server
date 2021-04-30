# App-Co Server

The server is built with Exprees.js and the SQlite database. Server is running on heroku.

#### Setup

```shell
git clone https://github.com/Jastler/app-co-server.git
cd app-co-server
npm install
```
The localtunnel server is now running and waiting for client requests on port 8000.

## Local link
If you run locally 

```shell
http://localhost:8000
```

## Heroku link

```shell
https://app-co-server-taraschirkov.herokuapp.com/
```

### Routes

##### `/api/users`
GET all characters as a single JSON object

[`/api/users`](https://app-co-server-taraschirkov.herokuapp.com/api/users);

##### `/api/info/:id`
GET additional information for one user

[`/api/info/:id`](https://app-co-server-taraschirkov.herokuapp.com/api/info/40);


### Dependencies
* Node v12.16.3 and higher
* NPM v6.14.4 and higher

## Troubleshooting

Any advice for common problems or issues.
For any contributing or problem-solving you could find me [here](https://t.me/chirkovtaras)
