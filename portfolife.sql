-- MySQL dump 10.13  Distrib 5.6.50, for Linux (x86_64)
--
-- Host: localhost    Database: heroku_6e1e556467b9527
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `pseudo_UNIQUE` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'jerkoder','$2a$10$T86zxjSxme8.5YdDXvSY9efIeiyiOto8XQ/SVguA2zhwNKPSJmwoK');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_prefix` varchar(150) DEFAULT NULL,
  `context` varchar(150) DEFAULT NULL,
  `context_url` varchar(255) DEFAULT NULL,
  `title` varchar(100) CHARACTER SET latin1 NOT NULL,
  `description` longtext CHARACTER SET latin1 NOT NULL,
  `url_github` varchar(155) CHARACTER SET latin1 DEFAULT NULL,
  `url_test` varchar(155) CHARACTER SET latin1 DEFAULT NULL,
  `image` varchar(55) CHARACTER SET latin1 NOT NULL,
  `nb_images` tinyint(4) DEFAULT NULL,
  `date` date NOT NULL,
  `priority` tinyint(4) DEFAULT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `background` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`title`),
  UNIQUE KEY `url_UNIQUE` (`url_github`),
  UNIQUE KEY `url_test_UNIQUE` (`url_test`),
  UNIQUE KEY `priority_UNIQUE` (`priority`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (5,'howtobefat','Wild Code School','https://www.wildcodeschool.com/fr-FR','HowToBeFat','### Description\nLe but de cette application est de permettre aux personnes qui n\'arrivent pas à grossir d\'obtenir des conseils coaching, des recettes bien caloriques et des bières pour accompagner leurs repas !\nLe tout dans une ambiance fun et gourmande !   \n\nVenez tester !!! \n\n### Contexte\nDeuxième projet fictif réalisé à la [Wild Code School](https://www.wildcodeschool.com/fr-FR)\nProjet en __full React__ conçu par une équipe de 4 developpeurs en apprentissage et pendant une durée de 4 semaines.\n\nCelui-ci à été mené entièrement à distance du fait du Covid19, en suivant le concept __Scrum__ et la __méthodologie agile__.\nAu départ du projet, nous n\'avions pas encore appris à utiliser React, c\'est donc en partant de zéro que nous nous sommes lancés dans la réalisation de cette application.\n\n### Fonctionnalités\n- Une recette aléatoire vous est proposé chaque jour, accompagnée de sa bière et de son conseil coaching\n- Faites une recherche personnalisée de recettes, sélectionnez vos ingrédients, régimes spéciaux, définissez un nombre de calorie minimal et/ou un temps de préparation à ne pas dépasser\n- Recherchez votre bière selon un nombre de degré d\'alcool minimum\n- Définissez-vous un objectif de poids à atteindre grâce à notre calculateur de poids\n\n### Caractéristiques techniques\n- L\'application a été pensé responsive, en mode __mobile first__ comme il est vivement conseillé de le faire.\n- Afin de fournir les informations nécessaires, nous avons fait appel à 2 API, une pour l\'affichage des recettes de cuisine, et l\'autre pour les bières.\n- Utilisation de prop-types, des hooks, et de la syntaxe ECMAScript 6 de javascript.\n\n### Limitations\nL\'api de cuisine est limitée en nombre de requêtes, il est donc possible que notre mascotte soit déboussolé, si cela devait vous arriver, attendez quelques instants, et rafraichissez la page.','https://github.com/jerkodeur/howToBeFat','https://how-to-be-fat.netlify.app/','howtobefat.png',7,'2020-05-01',3,'Profitez du confinement ! Découvrez tout nos conseils grosseurs...','#fff'),(6,'drake','Wild Code School','https://www.wildcodeschool.com/fr-FR','DrakeRporter','\n### Le premier projet réalisé en équipe à la Wild Code School\n\nLe thème du projet était de construire un site __HTML/CSS__ ayant au minimum une galerie photo.  \nLe choix du théme était libre, la durée du projet d\'une semaine.  \nMes joyeux camarades et moi, avons facilement décidé d\'un thème... Un bien bizarre personnage ci-nommé R.Drake Porter...  \nCes goûts sont pour le moins \"étranges\" ; mais tout ceci n\'est en fin de compte qu\'une mascarde et cache un coté bien plus sombre de notre personnage !  \n\nLa page d\'accueil est en fait un leurre qui cache la véritable nature de celui qui, au final, se révèlera être Dark Reporter, parti silloner le monde afin de proposer tout un tas de produits bien peu recommandables et illicites..\n\n### Un petit indice pour entrer du coté obscur du site...  \n    \n>Trouver et cliquer sur le copyright ...\n>Sur la page intermédiaire, n\'importe quel mot de passe est accepté mais il va falloir appuyer sur un bouton pour rentrer!','https://github.com/jerkodeur/DrakeRporter','https://jerkodeur.github.io/DrakeRporter/','darkrporter.png',4,'2020-03-01',6,'Ne vous fiez pas aux apparences !','#636468'),(7,'whack','Wild Code School','https://www.wildcodeschool.com/fr-FR','Whack-a-virus','### Premier __hackaton__ de ma vie de Dev. \n Projet réalisé à la [wild Code School](https://www.wildcodeschool.com/fr-FR).  \nUn groupe de 8 devs en formation, __24h de code__ et un projet finalement assez abouti !  \nUn virus ravage notre planète depuis des années maintenant !   \nIl est tant de lutter et de combattre afin d\'enrayer le mal qu\'il engendre ... ','https://github.com/jerkodeur/whack-a-virus','https://condescending-hypatia-22b592.netlify.app/','whackavirus.jpeg',3,'2020-04-01',5,'Premier Hackaton de ma vie de dev !','lightgray'),(9,'ck2','Wild Code School','https://www.wildcodeschool.com/fr-FR','Checkpoint 2','### Description\nRendu de mon 2ème checkpoint afin d\'évaluer les compétences apprises en __React__ à la [wildCodeSchool](https://www.wildcodeschool.com/fr-FR).  \n### Fiche technique\n#### Les instructions suivantes devaient être respectées:  \n- __Consommer une api__ sur le thème des jeux vidéos,\n- Afficher une liste des jeux, avec différentes informations\n- Créer un bouton pour supprimer un fichier de la liste contenue dans le state.\n- Filtrer les jeux vidéos par rating ( optionnel )\n### Technos utilisées:\n- React hooks, routes, prop-types\n- ECMAScript6\n- CSS Grid\n### Particularités:\n- Le site est __responsive__','https://github.com/jerkodeur/CheckPoint2-WCS-React','https://loving-booth-82aa55.netlify.app/','checkpoint2.png',0,'2020-04-01',7,'Checkpoint 2 réalisé lors de ma formation',NULL),(11,'mymeds','Wild Code School','https://www.wildcodeschool.com/fr-FR','myMedsMedication','### Hackaton de 48h organisé par doctolib \n\nDans le contexte du covid 19 la digitalisation est plus recherchée que jamais, et le domaine de la santé n\'y échappe pas.\nPlusieurs choix de thèmes étaient possibles pour le déroulement de ce hackaton.  \nNotre équipe composée de 4 développeurs en formation avons décidés de nous lancer dans \nle développement d\'une application qui permet de mettre en contact le patient et et le médecin\nafin de permettre un suivi des prescriptions.\n\n### Fonctionnalités:\n#### Pour les médecins:\n* Possibilité de prescrire des ordonnances en ligne\n* Suivre si les patients prennent bien leurs médicaments\n#### Pour les patients\n* Avoir un aperçu des médicaments à prendre au jour le jour\n* Informer le praticien de la prise de ses médicaments\n\n### Objectifs de l\'application\n* Réduire le gachis de médicaments grâce à un suivi détaillé.\n* Le médecin à la possibilité de rappeler à ses patients de prendre leurs médicaments en cas d\'oubli.\n* Eviter de se déplacer chez le praticien lorsque cela n\'est pas nécessaire\n* Le patient peut en un coup d\'oeil voir tous les médicaments à prendre dans la journée','https://github.com/jerkodeur/doctoprane-front','https://mymedsmedication.netlify.app/','mmm.png',2,'2020-06-01',4,'Hackaton organisé par Doctolib !','rgb(216, 241, 231)'),(31,'tiny','Wild Code School','https://www.wildcodeschool.com/fr-FR','tinyhappy','### Projet Réel à la Wild Code School\nNotre client, graphiste chez Doctolib, nous a chargé de développer un prototype d\'application mobile, un projet auquel il pensait\ndepuis longtemps. Le but de cette application est de pouvoir capturer des moments de vie comme on peut en vivre lorsque l\'on a\ndes enfants, et de pouvoir les partager avec sa famille, ses amis, ou ses enfants lorsqu\'ils seront plus grand. \n\n### Fonctionnalités\n* Ajouter des amis, membres de sa famille\n* Création de moments (citations, faits notables)\n* Possibilité d\'assigner des participants aux moments sauvegardés\n* Mise en favori de ses meilleurs moments\n* Création d\'une liste de contacts\n* Envoyer une sélection de moments par mail afin de les partager avec sa famille, ses amis.\n\n### Particularités\n* Application déployée en PWA\n* Authentification assurée par le biais de Json Web Token\n* Vos données sont sécurisées, vous ne partagez que ce que vous souhaitez avec les personnes de votre choix\n* Prochainement disponible sur le store','','https://tinyhappy.netlify.app/','tinyhappy.png',5,'2020-07-01',1,'Partagez vos moments en toute simplicité grâce à cette aplication 100% mobile','#fff'),(81,'hello','Bluesquare.io','https://bluesquare.io/','Hello','### Développement d\'une fonctionnalité de foire aux questions\nSeconde mission réalisée lors de mon stage à [Bluesquare.io](https://bluesquare.io/), il m\'a été confié la mission de développer une fonctionnalité qui va permettre aux clients de l\'agence de trouver des réponses à leurs questions avant qu\'ils ne demandent assistance aux développeurs de Bluesquare.  \n  \n### Fonctionnalités\n- Créer des articles destinés aux clients de l\'agence à travers diverses catégories\n- Possibilité de filtrer les articles avec l\'aide d\'une barre de recherche\n- Gérer les catégories et les afficher en fonction d\'un ordre de priorité\n- Créer les tables nécessaires dans la base de données avec l\'aide de __Laravel__\n- Assurer la sécurité et l\'affichage des données coté serveur de l\'application\n\n### Technos utilisées\n- Front-end => ( HTML , Tailwind.css , Vue.js )\n- Back-end => ( Laravel , PHP)\n- Autres => ( Inertia.js )\n\n### Contexte\nGrâce à des tutoriels en ligne, ainsi que diverses documentations, j\'ai réussi à mener ma mission à bien, bien que n\'ayant encore jamais pratiqué la plupart des différentes technologies du projets\n  \n',NULL,NULL,'hello.png',5,'2020-11-01',2,'Création d\'un centre d\'aide destinés aux clients de l\'agence','#f4f5f7');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_techno`
--

DROP TABLE IF EXISTS `project_techno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_techno` (
  `project_id` int(11) NOT NULL,
  `techno_id` int(11) NOT NULL,
  KEY `fk_project_techno_1_idx` (`project_id`),
  KEY `fk_project_techno_2_idx` (`techno_id`),
  CONSTRAINT `fk_project_techno_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_project_techno_2` FOREIGN KEY (`techno_id`) REFERENCES `techno` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_techno`
--

LOCK TABLES `project_techno` WRITE;
/*!40000 ALTER TABLE `project_techno` DISABLE KEYS */;
INSERT INTO `project_techno` VALUES (5,1),(5,2),(5,3),(5,6),(6,1),(6,2),(7,1),(7,2),(7,3),(7,6),(9,7),(9,6),(9,3),(9,2),(9,1),(11,1),(11,2),(11,3),(11,4),(11,5),(11,6),(31,1),(31,2),(31,3),(31,4),(31,5),(31,6),(81,1),(81,61),(81,31),(81,21),(81,11),(81,3);
/*!40000 ALTER TABLE `project_techno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `techno`
--

DROP TABLE IF EXISTS `techno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `techno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `image_name` varchar(55) NOT NULL,
  `priority` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `image_UNIQUE` (`image_name`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `techno`
--

LOCK TABLES `techno` WRITE;
/*!40000 ALTER TABLE `techno` DISABLE KEYS */;
INSERT INTO `techno` VALUES (1,'HTML5','html.png','3'),(2,'CSS3','css.png','3'),(3,'JavaScript','js.png','2'),(4,'NodeJs','node.png','1'),(5,'Mysql','mysql.png','2'),(6,'React','react.png','1'),(7,'Grid','grid.png','3'),(11,'VueJS','vue.png','1'),(21,'Laravel','laravel.svg','1'),(31,'PHP','php.svg','2'),(41,'Bootstrap','bootstrap.svg','3'),(51,'MongoDB','mongoDB.svg','3'),(61,'TailwindCSS','tailwindCss.svg','3');
/*!40000 ALTER TABLE `techno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'heroku_6e1e556467b9527'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-24  4:42:46
