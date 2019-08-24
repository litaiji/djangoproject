-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: lingshi_end
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.16.04.1

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receive` varchar(30) NOT NULL,
  `address` varchar(300) NOT NULL,
  `telephone` varchar(13) DEFAULT NULL,
  `fixed_phone` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `isdefault` tinyint(1) DEFAULT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'韩','海淀','15941265505',NULL,'123@qq.com',NULL,1),(2,'逹','朝阳','12345678903',NULL,'123@qq.com',NULL,2),(3,'赵晓华','北京市海淀区东升镇宝盛北里千峰教育','15941265505','','123@qq.com',1,1),(4,'leverfood','北京市海淀区东升镇宝盛北里千峰教育','15841265505','','1234@qq.com',0,3);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add address',7,'add_address'),(26,'Can change address',7,'change_address'),(27,'Can delete address',7,'delete_address'),(28,'Can view address',7,'view_address'),(29,'Can add goods_ category',8,'add_goods_category'),(30,'Can change goods_ category',8,'change_goods_category'),(31,'Can delete goods_ category',8,'delete_goods_category'),(32,'Can view goods_ category',8,'view_goods_category'),(33,'Can add goods_ info',9,'add_goods_info'),(34,'Can change goods_ info',9,'change_goods_info'),(35,'Can delete goods_ info',9,'delete_goods_info'),(36,'Can view goods_ info',9,'view_goods_info'),(37,'Can add goods_ pic',10,'add_goods_pic'),(38,'Can change goods_ pic',10,'change_goods_pic'),(39,'Can delete goods_ pic',10,'delete_goods_pic'),(40,'Can view goods_ pic',10,'view_goods_pic'),(41,'Can add home_ classification',11,'add_home_classification'),(42,'Can change home_ classification',11,'change_home_classification'),(43,'Can delete home_ classification',11,'delete_home_classification'),(44,'Can view home_ classification',11,'view_home_classification'),(45,'Can add home_ promotion',12,'add_home_promotion'),(46,'Can change home_ promotion',12,'change_home_promotion'),(47,'Can delete home_ promotion',12,'delete_home_promotion'),(48,'Can view home_ promotion',12,'view_home_promotion'),(49,'Can add order',13,'add_order'),(50,'Can change order',13,'change_order'),(51,'Can delete order',13,'delete_order'),(52,'Can view order',13,'view_order'),(53,'Can add order_ commodity',14,'add_order_commodity'),(54,'Can change order_ commodity',14,'change_order_commodity'),(55,'Can delete order_ commodity',14,'delete_order_commodity'),(56,'Can view order_ commodity',14,'view_order_commodity'),(57,'Can add review',15,'add_review'),(58,'Can change review',15,'change_review'),(59,'Can delete review',15,'delete_review'),(60,'Can view review',15,'view_review'),(61,'Can add review_ picture',16,'add_review_picture'),(62,'Can change review_ picture',16,'change_review_picture'),(63,'Can delete review_ picture',16,'delete_review_picture'),(64,'Can view review_ picture',16,'view_review_picture'),(65,'Can add user',17,'add_user'),(66,'Can change user',17,'change_user'),(67,'Can delete user',17,'delete_user'),(68,'Can view user',17,'view_user'),(69,'Can add user_ category',18,'add_user_category'),(70,'Can change user_ category',18,'change_user_category'),(71,'Can delete user_ category',18,'delete_user_category'),(72,'Can view user_ category',18,'view_user_category'),(73,'Can add user_ collection',19,'add_user_collection'),(74,'Can change user_ collection',19,'change_user_collection'),(75,'Can delete user_ collection',19,'delete_user_collection'),(76,'Can view user_ collection',19,'view_user_collection'),(77,'Can add user_ info',20,'add_user_info'),(78,'Can change user_ info',20,'change_user_info'),(79,'Can delete user_ info',20,'delete_user_info'),(80,'Can view user_ info',20,'view_user_info');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'App','address'),(8,'App','goods_category'),(9,'App','goods_info'),(10,'App','goods_pic'),(11,'App','home_classification'),(12,'App','home_promotion'),(13,'App','order'),(14,'App','order_commodity'),(15,'App','review'),(16,'App','review_picture'),(17,'App','user'),(18,'App','user_category'),(19,'App','user_collection'),(20,'App','user_info'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'App','0001_initial','2019-08-20 21:30:17.003355'),(2,'contenttypes','0001_initial','2019-08-20 21:30:17.143089'),(3,'auth','0001_initial','2019-08-20 21:30:17.299206'),(4,'admin','0001_initial','2019-08-20 21:30:18.016681'),(5,'admin','0002_logentry_remove_auto_add','2019-08-20 21:30:18.131647'),(6,'admin','0003_logentry_add_action_flag_choices','2019-08-20 21:30:18.145465'),(7,'contenttypes','0002_remove_content_type_name','2019-08-20 21:30:18.214376'),(8,'auth','0002_alter_permission_name_max_length','2019-08-20 21:30:18.279478'),(9,'auth','0003_alter_user_email_max_length','2019-08-20 21:30:18.304995'),(10,'auth','0004_alter_user_username_opts','2019-08-20 21:30:18.313041'),(11,'auth','0005_alter_user_last_login_null','2019-08-20 21:30:18.344432'),(12,'auth','0006_require_contenttypes_0002','2019-08-20 21:30:18.348925'),(13,'auth','0007_alter_validators_add_error_messages','2019-08-20 21:30:18.359658'),(14,'auth','0008_alter_user_username_max_length','2019-08-20 21:30:18.385719'),(15,'auth','0009_alter_user_last_name_max_length','2019-08-20 21:30:18.439688'),(16,'auth','0010_alter_group_name_max_length','2019-08-20 21:30:18.506892'),(17,'auth','0011_update_proxy_permissions','2019-08-20 21:30:18.524232'),(18,'sessions','0001_initial','2019-08-20 21:30:18.542207');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('izv4byn7os1mljbg8oucnkovfpog0ab5','NzRhYWRkZDhhMDYxYjY1NjRhNzhiOTQ4MWExYzlmOTIzMzA3ZWY2Yjp7InVzZXJuYW1lIjoiMTU5NDEyNjU1MDUifQ==','2019-09-06 11:09:56.515990');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_category`
--

DROP TABLE IF EXISTS `goods_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_category` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `gname` varchar(20) NOT NULL,
  `category` varchar(20) NOT NULL,
  `parentid` varchar(10) NOT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_category`
--

LOCK TABLES `goods_category` WRITE;
/*!40000 ALTER TABLE `goods_category` DISABLE KEYS */;
INSERT INTO `goods_category` VALUES (1,'Null','所有宝贝','0'),(2,'Null','坚果炒货','0'),(3,'Null','饼干糕点','0'),(4,'Null','糖果巧克力','0'),(5,'Null','蜜饯果干','0'),(6,'Null','肉类制品','0'),(7,'Null','海味零食','0'),(8,'Null','膨化食品','0'),(9,'Null','饮料/罐头/牛奶','0'),(10,'Null','豆菌笋类','0'),(11,'Null','速食/方便面','0'),(12,'Null','特产零食','0'),(13,'Null','进口零食','0'),(23,'Null','按销量排位搜索','1'),(24,'Null','按新品排位搜索','1'),(25,'Null','按价格排位搜索','1'),(26,'Null','瓜子','2'),(27,'Null','花生','2'),(28,'Null','栗子','2'),(29,'Null','饼干','3'),(30,'Null','蛋糕','3'),(31,'Null','面包','3'),(32,'Null','软糖','4'),(33,'Null','硬糖','4'),(34,'Null','巧克力','4'),(35,'Null','梅类','5'),(36,'Null','枣类','5'),(37,'Null','水果干','5'),(38,'Null','鸡肉制品','6'),(39,'Null','鸭肉制品','6'),(40,'Null','牛肉制品','6'),(41,'Null','鱼类','7'),(42,'Null','海苔类','7'),(43,'Null','鱿鱼类','7'),(44,'Null','锅巴','8'),(45,'Null','虾片','8'),(46,'Null','薯片','8'),(47,'Null','咖啡','9'),(48,'Null','饮料','9'),(49,'Null','牛奶','9'),(50,'Null','罐头','9'),(51,'Null','豆干/豆制品\r\n','10'),(52,'Null','竹笋/菌/菇','10'),(53,'Null','肠/肠仔\r\n\r\n\r\n','11'),(54,'Null','蛋类制品','11'),(55,'Null','方便面','11'),(56,'Null','速食品','11'),(57,'Null','广东','12'),(58,'Null','湖南','12'),(59,'Null','三亚','12'),(60,'Null','福建','12'),(61,'Null','四川','12'),(62,'Null','日本','13'),(63,'Null','韩国','13'),(64,'Null','马来西亚','13'),(65,'Null','泰国','13'),(66,'Null','新加坡','13');
/*!40000 ALTER TABLE `goods_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_info`
--

DROP TABLE IF EXISTS `goods_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_info` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `classid` varchar(20) NOT NULL,
  `gname` varchar(100) NOT NULL,
  `gnomber` varchar(100) NOT NULL,
  `gnet` varchar(30) DEFAULT NULL,
  `gcases` varchar(30) DEFAULT NULL,
  `gintegral` varchar(20) NOT NULL,
  `gbrand` varchar(20) DEFAULT NULL,
  `gplace` varchar(30) DEFAULT NULL,
  `goutpic` varchar(100) DEFAULT NULL,
  `goldprice` varchar(20) DEFAULT NULL,
  `gnewprice` varchar(20) DEFAULT NULL,
  `ispromotion` tinyint(1) DEFAULT NULL,
  `ishot` tinyint(1) DEFAULT NULL,
  `sales` varchar(30) NOT NULL,
  `num` varchar(30) NOT NULL,
  `time` varchar(30) NOT NULL,
  `life` varchar(30) NOT NULL,
  `intro` varchar(30) DEFAULT NULL,
  `storage` varchar(100) DEFAULT NULL,
  `categoryid` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_info`
--

LOCK TABLES `goods_info` WRITE;
/*!40000 ALTER TABLE `goods_info` DISABLE KEYS */;
INSERT INTO `goods_info` VALUES (1,'1','百年树芒果干','04010167','500','20','46','百年树','福建','/static/images/btn_chongzhi.png','56','46',0,0,'100','10000','2019-2-24','12','fgcbcb','冷藏','1'),(2,'1','的公司风格','04010168','500','20','46','百年树','福建','/static/images/btn_chongzhi.png','56','46',0,0,'100','10000','2019-2-24','12','fgcbcb','冷藏','1'),(3,'1','sdgssbx','04010169','500','20','46','百年树','福建','/static/images/btn_chongzhi.png','56','46',0,0,'100','10000','2019-2-24','12','fgcbcb','冷藏','1');
/*!40000 ALTER TABLE `goods_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_pic`
--

DROP TABLE IF EXISTS `goods_pic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `gid` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_pic`
--

LOCK TABLES `goods_pic` WRITE;
/*!40000 ALTER TABLE `goods_pic` DISABLE KEYS */;
/*!40000 ALTER TABLE `goods_pic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_classification`
--

DROP TABLE IF EXISTS `home_classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_classification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `home_picture` varchar(50) NOT NULL,
  `parentid` int(11) NOT NULL,
  `index` int(11) NOT NULL,
  `kindid` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_classification`
--

LOCK TABLES `home_classification` WRITE;
/*!40000 ALTER TABLE `home_classification` DISABLE KEYS */;
/*!40000 ALTER TABLE `home_classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_promotion`
--

DROP TABLE IF EXISTS `home_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_promotion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picture` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `index` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_promotion`
--

LOCK TABLES `home_promotion` WRITE;
/*!40000 ALTER TABLE `home_promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `home_promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderkind` varchar(60) NOT NULL,
  `pay` varchar(20) NOT NULL,
  `num` int(11) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `freight` int(11) NOT NULL,
  `usertype` int(11) NOT NULL,
  `createtime` datetime(6) NOT NULL,
  `uid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'1','支付宝',NULL,50,20,2,'2019-08-16 12:51:47.157000',1,1),(2,'1','微信',NULL,50,20,1,'2019-08-19 00:57:35.495000',2,2),(3,'1','支付宝',NULL,50,20,1,'2019-08-30 12:51:47.157000',1,1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_commodity`
--

DROP TABLE IF EXISTS `order_commodity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_commodity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ordernumber` varchar(30) NOT NULL,
  `goodsnumber` int(11) NOT NULL,
  `goodsprice` int(11) NOT NULL,
  `discuss` varchar(300) NOT NULL,
  `oid` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_commodity`
--

LOCK TABLES `order_commodity` WRITE;
/*!40000 ALTER TABLE `order_commodity` DISABLE KEYS */;
INSERT INTO `order_commodity` VALUES (1,'201908160001',1,50,'好评',1,1),(2,'201908160002',3,46,'好评',3,1),(3,'201908190003',2,54,'好评',2,2),(4,'201908160004',3,50,'好评',3,1);
/*!40000 ALTER TABLE `order_commodity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(300) DEFAULT NULL,
  `createtime` datetime(6) NOT NULL,
  `ordernumber` varchar(30) NOT NULL,
  `comment_level` int(11) NOT NULL,
  `logistics_lever` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_picture`
--

DROP TABLE IF EXISTS `review_picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review_picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picture` varchar(50) NOT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_picture`
--

LOCK TABLES `review_picture` WRITE;
/*!40000 ALTER TABLE `review_picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) DEFAULT NULL,
  `telephone` varchar(13) DEFAULT NULL,
  `password_hash` varchar(128) NOT NULL,
  `isactivation` tinyint(1) DEFAULT NULL,
  `usertype` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telephone` (`telephone`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'15941265505','43d920c6f61879c0b4607c7cdf7b5bd22bf7d9a6',1,2),(2,'2567317859@qq.com',NULL,'43d920c6f61879c0b4607c7cdf7b5bd22bf7d9a6',1,2),(3,NULL,'13699418718','43d920c6f61879c0b4607c7cdf7b5bd22bf7d9a6',1,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_category`
--

DROP TABLE IF EXISTS `user_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classname` varchar(30) NOT NULL,
  `parentid` int(11) NOT NULL,
  `isdel` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_category`
--

LOCK TABLES `user_category` WRITE;
/*!40000 ALTER TABLE `user_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_collection`
--

DROP TABLE IF EXISTS `user_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kind` varchar(20) NOT NULL,
  `goods_status` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_collection`
--

LOCK TABLES `user_collection` WRITE;
/*!40000 ALTER TABLE `user_collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(13) NOT NULL,
  `realname` varchar(30) NOT NULL,
  `sextype` int(11) NOT NULL,
  `birthday` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` varchar(300) NOT NULL,
  `qq` varchar(13) DEFAULT NULL,
  `home_phone` varchar(20) DEFAULT NULL,
  `office_phone` varchar(20) DEFAULT NULL,
  `msn` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-24 10:12:37
