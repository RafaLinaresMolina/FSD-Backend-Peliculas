-- MySQL dump 10.17  Distrib 10.3.22-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: films
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB-1ubuntu1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `Actor`
--

LOCK TABLES `Actor` WRITE;
/*!40000 ALTER TABLE `Actor` DISABLE KEYS */;
INSERT INTO `Actor` VALUES (1,'Hugo','Wallace Weaving',1),(2,'Sir Ian','Murray McKellen',1),(3,'Elijah','Jordan Wood',1),(4,'Sean','Michael Astin',1),(5,'Viggo','Peter Mortensen',1),(6,'Keanu','Charles Reeves',1),(7,'Laurence','John Fishburne III',1),(8,'Carrie-Anne','Moss',1);
/*!40000 ALTER TABLE `Actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ActorAppearFilm`
--

LOCK TABLES `ActorAppearFilm` WRITE;
/*!40000 ALTER TABLE `ActorAppearFilm` DISABLE KEYS */;
INSERT INTO `ActorAppearFilm` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(2,1),(2,2),(2,3),(2,4),(2,5),(3,1),(3,2),(3,3),(3,4),(3,5),(4,1),(4,6),(4,7),(4,8),(5,1),(5,6),(5,7),(5,8),(6,1),(6,6),(6,7),(6,8);
/*!40000 ALTER TABLE `ActorAppearFilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Film`
--

LOCK TABLES `Film` WRITE;
/*!40000 ALTER TABLE `Film` DISABLE KEYS */;
INSERT INTO `Film` VALUES (1,'El señor de los anillos: La comunidad del Anillo','Lord Of The Rings: Fellowship of the ring','./../lotr1.jpg','2020-10-10 15:17:39','Frodo Bolsón es un hobbit al que su tío Bilbo hace portador del poderoso Anillo Único, capaz de otorgar un poder ilimitado al que la posea, con la finalidad de destruirlo. Sin embargo, fuerzas malignas muy poderosas quieren arrebatárselo.',1,'2020-10-05 16:29:53',0),(2,'El señor de los anillos: las dos torres','Lord Of The Rings: The Two Towers','./../lotr2.jpg','2002-12-18 11:12:12','Gollum guía a Frodo y Sam a Mordor mientras Aragorn y sus compañeros defienden a Rohan del bestial ejército de Saruman.',1,'2020-10-05 16:30:06',3),(3,'El señor de los anillos: El retorno del Rey','Lord Of The Rings: The Return of the King','./../lotr3.jpg','2020-10-10 13:54:40','Frodo, Sam y Gollum se acercan al monte del Destino, donde destruirán el anillo o perecerán en el intento. Mientras, Aragorn y sus compañeros se enfrentan a las monstruosas tropas de Sauron.',1,'2020-10-05 16:30:09',3),(4,'The Matrix','The Matrix','./../matrix1.jpg','2020-10-10 15:17:39','A computer hacker learns from mysterious rebels about the true nature of his reality \n        and his role in the war against its controllers. ',1,'2020-10-05 16:41:54',0),(5,'The Matrix Reloaded','The Matrix Reloaded','./../matrix2.jpg','2003-05-15 10:12:12','Neo and his allies race against time before the machines discover the city of Zion and destroy it. While seeking the truth about the Matrix, \n        Neo must save Trinity from a dark fate within his dreams.',1,'2020-10-05 16:41:57',3),(6,'The Matrix Revolutions','The Matrix Revolutions','./../matrix3.jpg','2003-10-27 11:12:12',' The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another \n        front while also opposing the rogue Agent Smith.',1,'2020-10-05 16:42:01',3);
/*!40000 ALTER TABLE `Film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `FilmIsGenre`
--

LOCK TABLES `FilmIsGenre` WRITE;
/*!40000 ALTER TABLE `FilmIsGenre` DISABLE KEYS */;
INSERT INTO `FilmIsGenre` VALUES (1,2),(1,4),(1,5),(1,6),(2,2),(2,4),(2,5),(2,6),(3,2),(3,4),(3,5),(3,6),(4,1),(4,2),(4,3),(5,1),(5,2),(5,3),(6,1),(6,2),(6,3);
/*!40000 ALTER TABLE `FilmIsGenre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Genre`
--

LOCK TABLES `Genre` WRITE;
/*!40000 ALTER TABLE `Genre` DISABLE KEYS */;
INSERT INTO `Genre` VALUES (1,'acción',1,'2020-10-05 17:04:50','0000-00-00 00:00:00'),(2,'fantasia',1,'2020-10-05 17:04:50','0000-00-00 00:00:00'),(3,'ciencia-ficción',1,'2020-10-05 17:04:50','0000-00-00 00:00:00'),(4,'aventuras',1,'2020-10-05 17:04:50','0000-00-00 00:00:00'),(5,'basado en novela',1,'2020-10-05 17:04:50','0000-00-00 00:00:00'),(6,'cine épico',1,'2020-10-05 17:04:50','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `Genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (22,'pending',2,'2020-10-10 15:17:07','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(23,'pending',2,'2020-10-10 15:17:29','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(24,'pending',2,'2020-10-10 15:17:39','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `OrderFilm`
--

LOCK TABLES `OrderFilm` WRITE;
/*!40000 ALTER TABLE `OrderFilm` DISABLE KEYS */;
INSERT INTO `OrderFilm` VALUES (1,22,1),(1,23,1),(1,24,1),(4,22,1),(4,23,1),(4,24,1);
/*!40000 ALTER TABLE `OrderFilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Price`
--

LOCK TABLES `Price` WRITE;
/*!40000 ALTER TABLE `Price` DISABLE KEYS */;
INSERT INTO `Price` VALUES (1,2,2.50,1),(2,6,2.00,1),(3,15,1.90,1);
/*!40000 ALTER TABLE `Price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'John','Doe','jd_jd@mail.com','$2a$09$Wk6vX.Ii7INkgHsRPYd4kerNAVPj701O4dr9NGbZOY7DPO8iKeFR.',1,1,'2020-10-05 17:18:14','2020-10-05 18:31:32','',1),(2,'Rafa','Lianres','rl_rl@mail.com','$2a$09$2olFJE51YvhiuBjKKBRiJuCXep8Wr6EgCU.9OU9lwrrme77P7opzC',1,0,'2020-10-05 17:18:14','2020-10-11 14:38:37','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjAyNDI3MTE3LCJleHAiOjE2MDUwMTkxMTd9.Sli0fiuV29o4VSL6QUnlSm2lbq9NKw_vl7j0QOasrK8',1),(8,'newUser',NULL,'admin@mail.com','$2a$09$nOoX7JZuPLq2XupD7Twa6uM6fuCIa9WUDS3ge8FQjGGU1qqN227qC',1,1,'2020-10-11 14:05:13','2020-10-11 14:05:13','',0),(10,'newUser',NULL,'random@mail.com','$2a$09$Qdb2MToYzWN7kd1iRieeouRUSPN1n0IeMcrpVZw/zsrHxjHnT5SIe',1,1,'2020-10-11 14:09:38','2020-10-11 14:09:38','',0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-11 17:02:42
