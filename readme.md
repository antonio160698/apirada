

# Nyx - api

## Getting Started
------------
### Installing dependencies
    npm install

### Dependencies
    "amqplib": "^0.5.1",
    "bcrypt": "^1.0.2",
    "body-parser": "1.17.2",
    "cors": "^2.8.4",
    "express": "^4.15.3",
    "express-loggly": "0.0.5",
    "express-passport-logout": "^0.1.0",
    "express-session": "^1.15.4",
    "express-winston": "^2.4.0",
    "jsend": "^1.0.2",
    "jsonwebtoken": "^7.4.1",
    "mongoose": "^4.11.1",
    "passport": "^0.3.2",
    "passport-jwt": "^2.2.1",
    "rand-token": "^0.3.0",
    "winston-loggly-bulk": "^2.0.0"

## Run
    npm run-script dev

## Endpoints
------------

### Routes
    GET /routes
    
### Auth
    POST /auth/loginByID
    POST /auth/loginByFingerPrint
    POST /auth/renew
    GET  /auth/me

### Uploads
    POST /upload/checkouts

### Dashboard

#### Professors
    GET    /professor
    GET    /professor/:_id
    POST   /professor
    PUT    /professor/:_id
    DELETE /professor/:_id
#### Room
    GET    /room
    GET    /room/:_id
    POST   /room
    PUT    /room/:_id
    DELETE /room/:_id
#### Assigment
    GET    /assigment
    GET    /assigment/:_id
    POST   /assigment
    PUT    /assigment/:_id
    DELETE /assigment/:_id
#### Prefectos
    GET    /prefectos
    GET    /prefectos/:_id
    POST   /prefectos
    PUT    /prefectos/:_id
    DELETE /prefectos/:_id
    
    
    

