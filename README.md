# Back4Films

This is a project to introduce the use of nodejs, express, sequelize and mysql.

### A bit of background
This is an example of a backend for a blockbuster type of app.

From the POV of the user, you can signup, confirm your account, login, watch the list of actors, films, genres. Also have a profile path for edit the user profile and check the orders.

From the POV of an administrator, you cah update status on orders, create films, actors, genre, make the relations between them and watch the users of the app. Also can deactivate users or throw them out of the sesion.

### Software needed
- nodejs lts (at the time, version 12.19.0)
- mysql or mariadb installed and running
- mysql workbench or software for execute queries on mysql/mariadb (optional)

### Get the repo
- git clone https://github.com/RafaLinaresMolina/FSD-Backend-Peliculas.git

### Install dependencies
- ```npm i```
- ```npm -g sequelize-cli sequelize-auto```

### Initialize the DataBase
- Execute the script ```./sql-scripts/db.sql```
- Execute the script ```./sql-scripts/data.sql```

### Add the configuration 
First initialize the config of sequelize
- ```sequelize init```

Then modify the ```./config/config.json``` to add your mysql configuration

- Add the .env file with the next variables:
  - EXPRESS-PORT: Your port for express to listen
  - SECRET_AUTH_JWT: The secret for your token
  - SECRET_EMAIL_JWT: The secret for the confirmation email token
  - MINIMUM_LEVEL_LOG: From 0 to 4, to indicate which log types you want to show
  - API_URL: Your domain or localhost + port
  - EMAIL_HOST= Where is your mail service
  - EMAIL_PORT= the port for the email service
  - EMAIL_USER= The user for the email
  - EMAIL_PASS= The password for the email

### How to run it.
- ```npm run start```

## The endpoints

We have this prefixes:
  - /users: for admins to manage the users
    - GET / -> Get all the users
    - GET /:id -> Get the desired user
    - POST / -> Create a new user
    - PUT /:id -> Edit the user
    - DELETE /:id -> Deactivate the user, avoiding it to login
  - /auth: For signup, confirm account and login
    - POST /signup -> Create a new user, need to confirm
    - POST /login -> Generate a session token
    - POST /confirm/:token -> Confirm the account made with signup
  - /profile: For logged users to manage the data
    - GET /user -> Get the user logged
    - GET /order -> Get the orders from the logged user
    - PUT / -> Edit the user logged
    - DELETE / -> Deactivate the account
  - /films: Everyone can acces to the GET methods
    - GET / -> Get all the films (reduced object)
    - GET /:id -> Get the desired film (reduced object)
    - GET /film/fulldata -> Get all the films (With all the relation objects)
    - GET /title/:name -> Get all the movies (with all the relation objects) with filtering by title
    - GET /genre/name/:name -> Get all the movies (with all the relation objects) with filtering by genre name
    - GET /genre/:id -> Get all the movies (with all the relation objects) with filtering by genre id
    - GET /actor/name/:name -> Get all the movies (with all the relation objects) with filtering by actor name
    - GET /actor/:id -> Get all the movies (with all the relation objects) with filtering by actor id
    - POST / -> Create a new film [Logged, Admin]
    - PUT /:id -> Edit the desired film [Logged, Admin]
    - DELETE /:id -> Deactivate the film [Logged, Admin]
    - PUT /reactivate/:id -> Reactivate the film [Logged, Admin]

  - /actors Everyone can acces to the GET methods
    - GET / -> Get all the actors
    - GET /:id -> Get the desire actos
    - GET /name/:name -> Find actor by name
    - POST / -> Create an actor [Logged, Admin]
    - PUT /:id -> Edit the desired actor [Logged, Admin]
    - DELETE /:id -> Deactivate the desired actor [Logged, Admin]
    - PUT /reactivate/:id -> Reactivate the desired actor [Logged, Admin]
    - GET /actorInFilms/:id -> Get the films in wich a given actor id appear
    - GET /filmActors/:id -> Get all the actors of a given film id
    - POST /actorsfromfilm/addactors -> create the relation object of Film and Actor [Logged, Admin]
    - DELETE /actorsfromfilm/removeactors/:FilmId -> Remove all the relations of between a film and the actors [Logged, Admin]

  - /genres: Everyone can acces to the GET methods
    - GET / -> Get all the genres
    - GET /:id -> Get the desired Genre
    - GET /name/:name -> Get the Genre by name
    - POST / -> Create a new Genre [Logged, Admin]
    - PUT /:id -> Edit the given Genre [Logged, Admin]
    - DELETE /:id -> Deactivate the genre [Logged, Admin]
    - PUT /reactivate/:id -> reactivate the genre [Logged, Admin]
    - POST /genrefilm/ -> Create the relation between the genre and a film[Logged, Admin]
    - DELETE /genrefilm/delete/:FilmId -> Delete all the relations between a film and the genres [Logged, Admin]

  - /prices: Everyone can acces to the GET methods
    - GET / -> Get all the prices types
    - POST / -> Create a new price [Logged, Admin]
    - PUT /:id -> Edit a given price [Logged, Admin]
    - DELETE /:id -> Delete a given price [Logged, Admin]

  - /orders: Only Admins have acces
    - GET / -> Get All the orders (with the relations) [Logged, Admin]
    - GET /:id -> Get the desired Order (With the relation) [Logged, Admin]
    - GET /user/:id -> Get the Orders of a user guiven (With the relations) [Logged, Admin]
    - POST / -> Create a new order [Logged]
    - PUT /update/:id/status/:status -> Change the status of an order [Logged, Admin]

### Things i will add

- A bloody swagger file
- Unit-Testing
- Refactor