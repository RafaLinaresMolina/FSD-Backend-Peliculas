CREATE DATABASE films;
USE films;
/* BASIC TABLES */
CREATE TABLE User (
	id INT(10) AUTO_INCREMENT,
	name VARCHAR(255),
	last_name VARCHAR(255),
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	status TINYINT(1) DEFAULT 1,
	rol_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);
CREATE TABLE Film (
	id INT(10) AUTO_INCREMENT,
	title VARCHAR(255),
	original_title VARCHAR(255) NOT NULL,
	img_path VARCHAR(255) NOT NULL,
	release_date TIMESTAMP,
	synopsis TEXT NOT NULL,
	status TINYINT(1) DEFAULT 1,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	stock INT DEFAULT 1,
	PRIMARY KEY(id)
);
CREATE TABLE Price (
	id INT(10) AUTO_INCREMENT,
	days INT(2) NOT NULL,
	euro_perDay DECIMAL(3, 2) NOT NULL,
	status TINYINT(1) DEFAULT 1,
	PRIMARY KEY(id)
);
CREATE TABLE Actor (
	id INT(10) AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	status TINYINT(1) DEFAULT 1,
	PRIMARY KEY(id)
);
CREATE TABLE Genre (
	id INT(10) AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	status TINYINT(1) DEFAULT 1,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	last_modified TIMESTAMP,
	PRIMARY KEY(id)
);
/* RELATIONAL TABLES */
CREATE TABLE UserRentFilm (
	id_user INT(10),
	id_film INT(10),
	quantity int(3),
	date_init TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	date_end TIMESTAMP NOT NULL,
	status TINYINT(1) DEFAULT 1,
	PRIMARY KEY (id_user, date_init, date_end)
);
CREATE TABLE ActorAppearFilm (
	id_film INT(10),
	id_actor INT(10),
	PRIMARY KEY (id_film, id_actor)
);
CREATE TABLE FilmIsGenre (
	id_film INT(10),
	id_genre INT(10),
	PRIMARY KEY (id_film, id_genre)
);
/* CONSTRAINTS */
ALTER TABLE UserRentFilm
ADD CONSTRAINT FK_User_Rent_Film FOREIGN KEY (id_user) REFERENCES user (id);
ALTER TABLE UserRentFilm
ADD CONSTRAINT FK_Film_Rent_User FOREIGN KEY (id_film) REFERENCES film (id);
ALTER TABLE ActorAppearFilm
ADD CONSTRAINT FK_Actor_Appear_Film FOREIGN KEY (id_film) REFERENCES film (id);
ALTER TABLE ActorAppearFilm
ADD CONSTRAINT FK_Film_Has_Actor FOREIGN KEY (id_actor) REFERENCES actor (id);
ALTER TABLE FilmIsGenre
ADD CONSTRAINT FK_Film_Is_Genre FOREIGN KEY (id_film) REFERENCES film (id);
ALTER TABLE FilmIsGenre
ADD CONSTRAINT FK_Genre_From_Film FOREIGN KEY (id_genre) REFERENCES genre (id);

/* DUMMY DATA */

/*    Fantasy    */
INSERT INTO film (title, original_title, img_path, release_date, synopsis, stock) 
VALUES ("El señor de los anillos: La comunidad del Anillo", "Lord Of The Rings: Fellowship of the ring", "./../lotr1.jpg", '2001-12-19 12:12:12', 
        "Frodo Bolsón es un hobbit al que su tío Bilbo hace portador del poderoso Anillo Único, capaz de otorgar un poder ilimitado al que la posea, 
        con la finalidad de destruirlo. Sin embargo, fuerzas malignas muy poderosas quieren arrebatárselo.", 3);



INSERT INTO film (title, original_title, img_path, release_date, synopsis, stock) 
VALUES ("El señor de los anillos: las dos torres", "Lord Of The Rings: The Two Towers", "./../lotr2.jpg", '2002-12-18 12:12:12', 
        "Frodo Bolsón es un hobbit al que su tío Bilbo hace portador del poderoso Anillo Único, capaz de otorgar un poder ilimitado al que la posea, 
        con la finalidad de destruirlo. Sin embargo, fuerzas malignas muy poderosas quieren arrebatárselo.", 3);
        
        
INSERT INTO film (title, original_title, img_path, release_date, synopsis, stock) 
VALUES ("El señor de los anillos: El retorno del Rey", "Lord Of The Rings: The return of the King", "./../lotr3.jpg", '2003-12-17 12:12:12', 
        "Frodo Bolsón es un hobbit al que su tío Bilbo hace portador del poderoso Anillo Único, capaz de otorgar un poder ilimitado al que la posea, 
        con la finalidad de destruirlo. Sin embargo, fuerzas malignas muy poderosas quieren arrebatárselo.", 3);


/*    CY-FY    */
INSERT INTO film (title, original_title, img_path, release_date, synopsis, stock) 
VALUES ("The Matrix", "The Matrix", "./../matrix1.jpg", '1999-08-23 12:12:12', 
        "A computer hacker learns from mysterious rebels about the true nature of his reality 
        and his role in the war against its controllers. ", 3);



INSERT INTO film (title, original_title, img_path, release_date, synopsis, stock) 
VALUES ("The Matrix Reloaded", "The Matrix Reloaded" , "./../matrix2.jpg", '2003-05-15 12:12:12', 
        "Neo and his allies race against time before the machines discover the city of Zion and destroy it. While seeking the truth about the Matrix, 
        Neo must save Trinity from a dark fate within his dreams.", 3);
        
        
INSERT INTO film (title, original_title, img_path, release_date, synopsis, stock) 
VALUES ("The Matrix Revolutions", "The Matrix Revolutions", "./../matrix3.jpg", '2003-10-27 12:12:12', 
        " The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another 
        front while also opposing the rogue Agent Smith.", 3);


/* ACTORS  */
INSERT INTO actor (name, last_name) VALUES ("Hugo", "Wallace Weaving");
INSERT INTO actor (name, last_name) VALUES ("Sir Ian", "Murray McKellen");
INSERT INTO actor (name, last_name) VALUES ("Elijah", "Jordan Wood");
INSERT INTO actor (name, last_name) VALUES ("Sean", "Michael Astin");
INSERT INTO actor (name, last_name) VALUES ("Viggo", "Peter Mortensen");
INSERT INTO actor (name, last_name) VALUES ("Keanu", "Charles Reeves");
INSERT INTO actor (name, last_name) VALUES ("Laurence", "John Fishburne III");
INSERT INTO actor (name, last_name) VALUES ("Carrie-Anne", "Moss");

/* GENRE  */
INSERT INTO genre (name) VALUES ("acción");
INSERT INTO genre (name) VALUES ("fantasia");
INSERT INTO genre (name) VALUES ("ciencia-ficción");


INSERT INTO genre (name) VALUES ("aventuras");
INSERT INTO genre (name) VALUES ("basado en novela");
INSERT INTO genre (name) VALUES ("cine épico");

/* ACTORS IN FILMS  */

INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (1, 1);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (1, 2);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (1, 3);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (1, 4);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (1, 5);

INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (2, 1);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (2, 2);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (2, 3);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (2, 4);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (2, 5);

INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (3, 1);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (3, 2);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (3, 3);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (3, 4);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (3, 5);

INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (4, 1);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (4, 6);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (4, 7);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (4, 8);

INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (5, 1);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (5, 6);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (5, 7);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (5, 8);

INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (6, 1);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (6, 6);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (6, 7);
INSERT INTO ActorAppearFilm (id_film, id_actor) VALUES (6, 8);

/* GENRE IN FILMS  */

INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (4, 1);
INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (4, 2);
INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (4, 3);

INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (5, 1);
INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (5, 2);
INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (5, 3);

INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (6, 1);
INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (6, 2);
INSERT INTO FilmIsGenre (id_film, id_genre) VALUES (6, 3);

/* PRICE */

INSERT INTO price (days, euro_perDay) VALUES (2, 2.5);
INSERT INTO price (days, euro_perDay) VALUES (6, 2);
INSERT INTO price (days, euro_perDay) VALUES (15, 1.9);