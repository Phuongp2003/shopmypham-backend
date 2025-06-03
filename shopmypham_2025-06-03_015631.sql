-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: aapanelserver.mysql.database.azure.com    Database: shopmypham
-- ------------------------------------------------------
-- Server version	8.0.40-azure

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_cosmeticoptiontocosmeticvariant`
--

DROP TABLE IF EXISTS `_cosmeticoptiontocosmeticvariant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_cosmeticoptiontocosmeticvariant` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`my_row_id`),
  UNIQUE KEY `_CosmeticOptionToCosmeticVariant_AB_unique` (`A`,`B`),
  KEY `_CosmeticOptionToCosmeticVariant_B_index` (`B`),
  CONSTRAINT `_CosmeticOptionToCosmeticVariant_A_fkey` FOREIGN KEY (`A`) REFERENCES `cosmeticoption` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_CosmeticOptionToCosmeticVariant_B_fkey` FOREIGN KEY (`B`) REFERENCES `cosmeticvariant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_cosmeticoptiontocosmeticvariant`
--

/*!40000 ALTER TABLE `_cosmeticoptiontocosmeticvariant` DISABLE KEYS */;
INSERT INTO `_cosmeticoptiontocosmeticvariant` (`my_row_id`, `A`, `B`) VALUES (49,'option-1','104291b9-74fd-409c-86dd-02ec963d2b06'),(82,'option-1','250dd404-1a0f-4751-af16-ea446cf2154b'),(61,'option-1','53afd874-ffc9-4ae0-9cfc-bb2f4ba99980'),(63,'option-1','786cdb30-ce27-42ac-bfff-1b6cc591f86a'),(35,'option-1','8c149ff1-ecb6-4cd1-9caa-a152be54db7f'),(32,'option-1','b362358d-b842-42a3-bef7-4844030c4de1'),(50,'option-10','104291b9-74fd-409c-86dd-02ec963d2b06'),(83,'option-10','149efd1c-a9ff-4db5-8fdb-c7c5e7023782'),(57,'option-10','1b0f6925-9428-4814-96e8-793c3a673421'),(52,'option-10','2371a178-d296-4128-ada6-f81f15e03f6f'),(54,'option-11','5311a6fb-a384-4c83-b00f-cb24baedf98c'),(36,'option-11','8c149ff1-ecb6-4cd1-9caa-a152be54db7f'),(80,'option-11','dd2893e9-5640-4fde-9b51-9a839d2745c8'),(79,'option-12','11c5efcc-64ec-488e-beb6-abb876a3a17e'),(59,'option-12','1cf694f2-481d-497f-94e1-60a8986469f9'),(53,'option-12','2371a178-d296-4128-ada6-f81f15e03f6f'),(81,'option-12','30643a38-490a-4c29-ae9c-b4f6f5579e64'),(70,'option-12','407cc3e0-1cd9-4e77-96e2-a0734c375820'),(58,'option-12','42b95f42-e0e4-44de-8d69-3c70ce1afa3b'),(34,'option-12','59e5155c-f197-406f-8c66-21ca19d35b4d'),(78,'option-13','1a12f5c1-a6ec-4321-a79d-e879fa69e74d'),(30,'option-13','3ac3e07f-a589-4d69-a46c-448151c197e3'),(48,'option-14','6fe07316-d45b-4622-af31-6b4d44ee2296'),(75,'option-14','fff205cf-1ab4-4bf1-84df-d70384884598'),(44,'option-15','55b9da9f-4680-4365-94c7-b23fca16c365'),(67,'option-15','eda35c86-7441-42f6-9b18-e267750706c4'),(37,'option-18','8c149ff1-ecb6-4cd1-9caa-a152be54db7f'),(51,'option-19','104291b9-74fd-409c-86dd-02ec963d2b06'),(42,'option-19','c263dfca-5490-4fc7-9950-9de353bf834c'),(64,'option-2','786cdb30-ce27-42ac-bfff-1b6cc591f86a'),(62,'option-2','aaa26223-4205-4b1c-8399-0818d065bec9'),(31,'option-2','b37cd93d-935b-47d0-8dce-74900124be6c'),(43,'option-20','90f72d23-0013-4772-a52b-d7850d706fd1'),(47,'option-3','3d70c3da-851f-4ff3-af58-c428887c42cf'),(68,'option-3','65cc70c9-8f76-4b02-b93f-b739baffc8f3'),(73,'option-4','d2080fa6-a953-4479-8808-b5cee1175645'),(45,'option-6','499563ea-5c82-49f5-9ee4-3d33067480a1'),(46,'option-7','499563ea-5c82-49f5-9ee4-3d33067480a1'),(66,'option-7','e37d1555-aa7d-4ea4-a2b7-0014d8e0ff1d'),(71,'option-8','407cc3e0-1cd9-4e77-96e2-a0734c375820'),(69,'option-8','65cc70c9-8f76-4b02-b93f-b739baffc8f3'),(65,'option-8','951781e2-fcbb-4ffa-b025-72209021d315'),(33,'option-8','b362358d-b842-42a3-bef7-4844030c4de1'),(60,'option-9','1cf694f2-481d-497f-94e1-60a8986469f9'),(84,'option-9','f44614e0-6a26-4812-81b8-de2716c90731');
/*!40000 ALTER TABLE `_cosmeticoptiontocosmeticvariant` ENABLE KEYS */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipientName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressLine` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Address_userId_fkey` (`userId`),
  CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES ('1963dbf7-cf72-4f2e-8417-88d855a52c08','99f86c0a-f550-4bb1-a23b-548e63517cbe','Vũ Văn I','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:21.844','2025-06-02 11:29:21.844'),('1fec7a38-0373-4927-b5de-07cdab16c622','3c2bb293-860e-4e2a-af4d-45ea1c498008','Trần Thị F','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:21.426','2025-06-02 11:29:21.426'),('3238f31d-e467-4875-bb1f-95e0912fe3b1','2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','Nguyễn Văn D','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:21.150','2025-06-02 11:29:21.150'),('3a7eae38-7a9d-40e2-9867-8bbcfc68804e','395c19be-b9e4-4877-9204-73ee3425fe17','Nguyễn Văn B','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:20.878','2025-06-02 11:29:20.878'),('4752fd42-3d5b-4450-9d4f-e4c936f7a046','4ce8d640-a5cd-462a-bc95-0df8345c2ad0','Nguyễn Văn E','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:21.291','2025-06-02 11:29:21.291'),('545674b6-3025-4602-9d80-b157c717d0f2','6782526c-3eef-4e48-ab65-10b11f8e7c8d','Phạm Thị H','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:21.704','2025-06-02 11:29:21.704'),('6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','2e677649-fd64-4a9d-b892-9f9c136498e5','Lê Văn G','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:21.564','2025-06-02 11:29:21.564'),('cabdc023-4eb5-4cda-8849-92e7fddcf5f0','4b34abcc-12a5-419e-9559-b3a69c5821af','Nguyễn Văn C','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:21.014','2025-06-02 11:29:21.014'),('daa5de11-e546-4f84-9ac4-fe9420ccce3b','58819aa0-5ff7-421e-82bf-f18cde892d22','Đặng Thị K','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:21.979','2025-06-02 11:29:21.979'),('de70af33-bb17-41cb-bfc9-53ac4d92a209','c164d1c2-6174-4141-b379-8eab79696831','Nguyễn Văn A','0123456789','123 Đường ABC, Quận 1, TP.HCM','Quận 1','Hồ Chí Minh',1,'2025-06-02 11:29:20.673','2025-06-02 11:29:20.673');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Cart_userId_key` (`userId`),
  CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES ('14e04f9d-ce1b-4244-a54a-2cace43562c8','2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','2025-06-02 11:29:16.185','2025-06-02 11:29:16.185'),('19e3efc9-2417-4177-9aca-719105c3e36f','c164d1c2-6174-4141-b379-8eab79696831','2025-06-02 11:29:14.377','2025-06-02 11:29:14.377'),('368dc2db-8838-44e4-b6c8-e9ab879463da','4b34abcc-12a5-419e-9559-b3a69c5821af','2025-06-02 11:29:15.710','2025-06-02 11:29:15.710'),('60b8f12d-8310-4676-bc39-aaab9fc92e90','395c19be-b9e4-4877-9204-73ee3425fe17','2025-06-02 11:29:15.095','2025-06-02 11:29:15.095'),('62f47071-3510-4168-8187-1b6ef4175d06','99f86c0a-f550-4bb1-a23b-548e63517cbe','2025-06-02 11:29:19.158','2025-06-02 11:29:19.158'),('7c97f305-df24-43ae-bdde-50aacc1a1a28','6782526c-3eef-4e48-ab65-10b11f8e7c8d','2025-06-02 11:29:18.396','2025-06-02 11:29:18.396'),('7d7ce222-d2a4-4dc9-9b7b-d0453271507b','4ce8d640-a5cd-462a-bc95-0df8345c2ad0','2025-06-02 11:29:16.806','2025-06-02 11:29:16.806'),('9907cdee-a21a-4061-9705-34dcfba64256','3c2bb293-860e-4e2a-af4d-45ea1c498008','2025-06-02 11:29:17.290','2025-06-02 11:29:17.290'),('a715ae70-63cf-4554-bce5-7a08ab9cd5aa','58819aa0-5ff7-421e-82bf-f18cde892d22','2025-06-02 11:29:19.917','2025-06-02 11:29:19.917'),('f2d5ff49-1641-41d4-92b0-5a079812e43a','2e677649-fd64-4a9d-b892-9f9c136498e5','2025-06-02 11:29:17.777','2025-06-02 11:29:17.777');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

--
-- Table structure for table `cartdetail`
--

DROP TABLE IF EXISTS `cartdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartdetail` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cartId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CartDetail_cartId_fkey` (`cartId`),
  KEY `CartDetail_variantId_fkey` (`variantId`),
  CONSTRAINT `CartDetail_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `CartDetail_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `cosmeticvariant` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartdetail`
--

/*!40000 ALTER TABLE `cartdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartdetail` ENABLE KEYS */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Comment_authorId_fkey` (`authorId`),
  KEY `Comment_postId_fkey` (`postId`),
  CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

--
-- Table structure for table `cosmetic`
--

DROP TABLE IF EXISTS `cosmetic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosmetic` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `type` enum('SKINCARE','MAKEUP','HAIRCARE','FRAGRANCE','BODYCARE','NAILCARE','OTHER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `distributorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usageInstructions` text COLLATE utf8mb4_unicode_ci,
  `averageRating` double DEFAULT '0',
  `totalReviews` int NOT NULL DEFAULT '0',
  `shippingPolicyId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Cosmetic_distributorId_fkey` (`distributorId`),
  KEY `Cosmetic_shippingPolicyId_fkey` (`shippingPolicyId`),
  CONSTRAINT `Cosmetic_distributorId_fkey` FOREIGN KEY (`distributorId`) REFERENCES `cosmeticdistributor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Cosmetic_shippingPolicyId_fkey` FOREIGN KEY (`shippingPolicyId`) REFERENCES `shippingpolicy` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmetic`
--

/*!40000 ALTER TABLE `cosmetic` DISABLE KEYS */;
INSERT INTO `cosmetic` VALUES ('16237da4-634c-49aa-8a75-a65c7ba55b73','Serum vitamin C sáng da','Giúp da sáng khỏe và đều màu.',300000,80,'SKINCARE','https://localserver.phuongy.works/images/1748877797407_download.jpg','distributor-1','<p>Thoa 2-3 giọt lên mặt sau bước toner</p>',4.5,4,'shipping-policy-1','2025-06-02 11:29:11.311','2025-06-02 15:23:29.878'),('18ca63fe-f389-493d-b771-67e4df3b2352','Gel tẩy tế bào chết','Loại bỏ lớp da chết nhẹ nhàng, giúp da mịn màng.',140000,90,'SKINCARE','https://localserver.phuongy.works/images/1748877360529_download.jpg','distributor-1','<p>Sử dụng 2-3 lần/tuần sau khi rửa mặt</p>',4.5,4,'shipping-policy-1','2025-06-02 11:29:08.590','2025-06-02 15:19:27.628'),('1a9703ed-d4cb-434c-b9af-cb23c5e21710','Toner hoa cúc','Làm dịu da và cân bằng pH.',165000,50,'SKINCARE','https://localserver.phuongy.works/images/1748877040328_kiehls-toner-calendula-herbal-extract-toner-alcohol-free-500ml-000-3700194711719-front.png','distributor-1','<p>Dùng sau bước rửa mặt</p>',4.75,4,'shipping-policy-1','2025-06-02 11:29:07.911','2025-06-02 15:13:27.796'),('537fd879-4a51-4be7-97eb-0433800a529b','Mascara chống lem','Giúp mi dài và cong suốt ngày dài.',220000,110,'MAKEUP','https://localserver.phuongy.works/images/1748878410757_download.jpg','distributor-1','<p>Chải đều từ chân mi đến ngọn mi</p>',4.75,4,'shipping-policy-2','2025-06-02 11:29:09.270','2025-06-02 15:33:33.287'),('5a74fbad-fd59-4d09-9299-2ddf96337cad','Kem dưỡng ẩm ban đêm','Dưỡng ẩm sâu suốt đêm.',250000,60,'SKINCARE','https://localserver.phuongy.works/images/1748877710651_content_1697006336.jpg','distributor-1','<p>Sử dụng vào buổi tối trước khi ngủ</p>',4.75,4,'shipping-policy-1','2025-06-02 11:29:06.557','2025-06-02 15:22:04.618'),('692c05e0-b6e4-4441-bc60-779ff29fabf5','Phấn phủ kiềm dầu','Giúp da khô ráo, không bóng nhờn suốt ngày.',150000,120,'MAKEUP','https://localserver.phuongy.works/images/1748877713904_download.jpg','distributor-1','<p>Dùng cọ hoặc bông phấn tán đều lên da</p>',4.75,4,'shipping-policy-2','2025-06-02 11:29:11.997','2025-06-02 15:22:10.011'),('6ba69ae0-2e4f-41b7-95d3-da4644d3c8a5','Kem lót nền mịn','Giúp lớp trang điểm bám lâu và mịn màng.',200000,75,'MAKEUP','https://localserver.phuongy.works/images/1748876788528_kemlot1.jpg','distributor-1','<p>Thoa một lớp mỏng trước khi trang điểm</p>',4.25,4,'shipping-policy-2','2025-06-02 11:29:13.397','2025-06-02 15:08:45.221'),('709d1ab1-dad6-4369-8253-e7cbf272586e','Xịt khoáng dưỡng ẩm','Cấp nước tức thì cho da, làm dịu và tươi mát.',110000,100,'SKINCARE','https://localserver.phuongy.works/images/1748876588903_xitkhoang1.jpg','distributor-1','<p>Xịt đều lên mặt khi cần dưỡng ẩm</p>',4.25,4,'shipping-policy-1','2025-06-02 11:29:13.732','2025-06-02 15:16:57.102'),('816d5d88-288b-4cd8-a223-fafb3593dbfc','Son môi lì lâu trôi','Màu sắc đậm, bền màu suốt ngày dài.',180000,90,'MAKEUP','https://localserver.phuongy.works/images/1748869213937_lipstick.jpg','distributor-1','<p>Thoa lên môi, có thể thoa nhiều lớp để màu đậm hơn</p>',4.25,4,'shipping-policy-2','2025-06-02 11:29:14.090','2025-06-02 15:13:59.721'),('8cff7ac7-717a-4dc2-a217-b9d29fdaec56','Kem mắt giảm quầng thâm','Giảm bọng mắt và quầng thâm hiệu quả.',280000,55,'SKINCARE','https://localserver.phuongy.works/images/1748877756910_download.jpg','distributor-1','<p>Thoa nhẹ vùng mắt mỗi sáng và tối</p>',4.75,4,'shipping-policy-1','2025-06-02 11:29:11.652','2025-06-02 15:22:51.519'),('8d74bdbc-7d8d-457d-be36-90a2a4e50e6e','Tẩy trang dạng nước','Loại bỏ lớp trang điểm hiệu quả, không gây khô da.',190000,70,'SKINCARE','https://localserver.phuongy.works/images/1748878295827_download.jpg','distributor-1','<p>Massage nhẹ nhàng lên mặt khô rồi rửa sạch</p>',4.25,4,'shipping-policy-1','2025-06-02 11:29:09.605','2025-06-02 15:33:14.307'),('8f7f55b1-8ed3-40f6-b2a1-b60f262c1d4f','Kem chống nắng Loreal','Chống nắng phổ rộng, không gây bí da.',180000,90,'SKINCARE','https://localserver.phuongy.works/images/1748877766569_download.jpg','distributor-1','<p>Thoa 15 phút trước khi ra nắng</p>',5,4,'shipping-policy-1','2025-06-02 11:29:06.895','2025-06-02 15:24:08.337'),('988686a7-afcf-46ee-8edc-bdd545726ec4','Gel tẩy tế bào chết dịu nhẹ','Loại bỏ tế bào chết, làm sáng da tự nhiên.',140000,70,'SKINCARE','https://localserver.phuongy.works/images/1748877444572_download.jpg','distributor-1','<p>Massage nhẹ nhàng 2-3 lần/tuần rồi rửa sạch</p>',4.5,4,'shipping-policy-1','2025-06-02 11:29:12.682','2025-06-02 15:17:31.376'),('a7b2eac9-7070-4bc6-be8b-e85774c3d8a4','Kem nền dạng lỏng','Che phủ hoàn hảo, nhẹ mặt và lâu trôi.',280000,65,'MAKEUP','https://localserver.phuongy.works/images/1748878265369_z5720277368815_2409c00c21a98456ce1ee9629d8143b4-11082024014939.png','distributor-1','<p>Thoa đều lên mặt bằng cọ hoặc bông mút</p>',4.5,4,'shipping-policy-2','2025-06-02 11:29:09.943','2025-06-02 15:31:07.724'),('a87fcb99-483c-49a2-baaa-8e862f77be17','Sáp vuốt tóc nam','Kiểm soát kiểu tóc, giữ nếp lâu dài.',160000,120,'MAKEUP','https://localserver.phuongy.works/images/1748877837687_download.jpg','distributor-1','<p>Lấy một lượng nhỏ, vuốt đều lên tóc</p>',4,4,'shipping-policy-2','2025-06-02 11:29:10.965','2025-06-02 15:24:04.045'),('b5ede169-6ca8-423f-bc84-a645d9766828','Kẻ mắt nước chống thấm','Viền mắt sắc nét, bền lâu cả ngày.',210000,85,'MAKEUP','https://localserver.phuongy.works/images/1748878030997_download.jpg','distributor-1','<p>Vẽ viền mắt theo ý muốn, để khô tự nhiên</p>',4.25,4,'shipping-policy-2','2025-06-02 11:29:10.630','2025-06-02 15:27:17.687'),('b9c170e2-6ef7-44f3-a049-087141dbf5d8','Sữa rửa mặt dịu nhẹ','Làm sạch sâu, phù hợp da nhạy cảm.',120000,100,'SKINCARE','https://localserver.phuongy.works/images/1748877678977_download.jpg','distributor-1','<p>Làm ướt mặt → lấy sữa rửa mặt → massage → rửa sạch</p>',4.25,4,'shipping-policy-1','2025-06-02 11:29:06.024','2025-06-02 15:21:29.166'),('c58dcd30-29fd-4d9a-a54b-76e37bf72e43','Mascara làm dài mi','Tạo độ dài và cong mi tự nhiên.',130000,90,'MAKEUP','https://localserver.phuongy.works/images/1748877475716_download.jpg','distributor-1','<p>Chuốt từ gốc đến ngọn mi</p>',5,4,'shipping-policy-2','2025-06-02 11:29:12.340','2025-06-02 15:18:06.247'),('d54e23e9-cee0-4781-ad07-824cc4067943','Phấn nước trang điểm','Lớp nền mỏng nhẹ, che phủ tốt.',320000,70,'MAKEUP','https://localserver.phuongy.works/images/1748876757037_cushion.jpg','distributor-1','<p>Dùng bông phấn tán đều lên mặt</p>',4.5,4,'shipping-policy-2','2025-06-02 11:29:07.574','2025-06-02 15:09:52.566'),('d969d11c-f220-4991-817e-afe9421ccc1a','Phấn má hồng dạng kem','Tạo má hồng tự nhiên, dễ tán.',180000,75,'MAKEUP','https://localserver.phuongy.works/images/1748878426075_download.jpg','distributor-1','<p>Chấm nhẹ lên má rồi tán đều</p>',4.5,4,'shipping-policy-2','2025-06-02 11:29:08.929','2025-06-02 15:33:47.994'),('da3101c4-1abd-49d7-af5b-10666cc3bcfd','Tẩy trang dạng dầu ','Làm sạch lớp trang điểm và bụi bẩn hiệu quả.',220000,85,'SKINCARE','https://localserver.phuongy.works/images/1748877003970_tt1.jpg','distributor-1','<p>Massage nhẹ nhàng lên mặt rồi rửa sạch</p>',0,0,'shipping-policy-1','2025-06-02 11:29:13.059','2025-06-02 15:12:23.276'),('db3a6dca-f248-4ef9-adb4-14c57ace6762','Tinh chất dưỡng trắng da','Giúp làm sáng và đều màu da.',300000,80,'SKINCARE','https://localserver.phuongy.works/images/1748877252425_download.jpg','distributor-1','<p>Thoa đều lên mặt và cổ vào buổi tối</p>',0,0,'shipping-policy-1','2025-06-02 11:29:08.253','2025-06-02 15:15:34.958'),('e0322849-7a45-475e-88b4-5851b6b31283','Xịt khoáng dưỡng da','Cấp ẩm tức thì, làm dịu da mệt mỏi.',150000,90,'SKINCARE','https://localserver.phuongy.works/images/1748878215989_images.jpg','distributor-1','<p>Xịt đều lên mặt khi cảm thấy khô hoặc sau trang điểm</p>',0,0,'shipping-policy-1','2025-06-02 11:29:10.287','2025-06-02 15:30:22.148'),('ffd4d3b2-8a39-41bc-88e5-4618dea07f34','Son dưỡng môi hồng tự nhiên','Cấp ẩm và làm hồng môi tự nhiên.',95000,200,'MAKEUP','https://localserver.phuongy.works/images/1748877867813_download.jpg','distributor-1','<p>Thoa lên môi bất cứ khi nào cảm thấy khô</p>',0,0,'shipping-policy-1','2025-06-02 11:29:07.232','2025-06-02 15:25:12.078');
/*!40000 ALTER TABLE `cosmetic` ENABLE KEYS */;

--
-- Table structure for table `cosmeticbadge`
--

DROP TABLE IF EXISTS `cosmeticbadge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosmeticbadge` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `badgeType` enum('MADE_IN','QUALITY','SHIPPING','RETURN_POLICY','WARRANTY','CERTIFICATION') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `orderIndex` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `cosmeticId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CosmeticBadge_cosmeticId_idx` (`cosmeticId`),
  CONSTRAINT `CosmeticBadge_cosmeticId_fkey` FOREIGN KEY (`cosmeticId`) REFERENCES `cosmetic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmeticbadge`
--

/*!40000 ALTER TABLE `cosmeticbadge` DISABLE KEYS */;
/*!40000 ALTER TABLE `cosmeticbadge` ENABLE KEYS */;

--
-- Table structure for table `cosmeticbenefit`
--

DROP TABLE IF EXISTS `cosmeticbenefit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosmeticbenefit` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cosmeticId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `benefitKey` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `benefitValue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderIndex` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CosmeticBenefit_cosmeticId_idx` (`cosmeticId`),
  CONSTRAINT `CosmeticBenefit_cosmeticId_fkey` FOREIGN KEY (`cosmeticId`) REFERENCES `cosmetic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmeticbenefit`
--

/*!40000 ALTER TABLE `cosmeticbenefit` DISABLE KEYS */;
/*!40000 ALTER TABLE `cosmeticbenefit` ENABLE KEYS */;

--
-- Table structure for table `cosmeticdistributor`
--

DROP TABLE IF EXISTS `cosmeticdistributor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosmeticdistributor` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmeticdistributor`
--

/*!40000 ALTER TABLE `cosmeticdistributor` DISABLE KEYS */;
INSERT INTO `cosmeticdistributor` VALUES ('distributor-1','Nhà phân phối mẫu','123 Đường ABC, Quận 1, TP.HCM','0123456789','distributor@example.com','2025-06-02 11:29:05.150','2025-06-02 11:29:05.150');
/*!40000 ALTER TABLE `cosmeticdistributor` ENABLE KEYS */;

--
-- Table structure for table `cosmeticoption`
--

DROP TABLE IF EXISTS `cosmeticoption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosmeticoption` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `optionKey` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `optionValue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmeticoption`
--

/*!40000 ALTER TABLE `cosmeticoption` DISABLE KEYS */;
INSERT INTO `cosmeticoption` VALUES ('option-1','Loại da','Da dầu','2025-06-02 11:29:01.551','2025-06-02 11:29:01.551'),('option-10','Dạng sản phẩm','Xịt','2025-06-02 11:29:03.209','2025-06-02 11:29:03.209'),('option-11','Loại da','Da nhạy cảm','2025-06-02 11:29:03.377','2025-06-02 11:29:03.377'),('option-12','Loại da','Da thường','2025-06-02 11:29:03.547','2025-06-02 11:29:03.547'),('option-13','Mùi hương','Bạc hà','2025-06-02 11:29:03.724','2025-06-02 11:29:03.724'),('option-14','Mùi hương','Cam','2025-06-02 11:29:03.892','2025-06-02 11:29:03.892'),('option-15','Chỉ số chống nắng','SPF 15','2025-06-02 11:29:04.062','2025-06-02 11:29:04.062'),('option-16','Chỉ số chống nắng','SPF 100','2025-06-02 11:29:04.231','2025-06-02 11:29:04.231'),('option-17','Dạng sản phẩm','Hũ','2025-06-02 11:29:04.398','2025-06-02 11:29:04.398'),('option-18','Dạng sản phẩm','Lọ','2025-06-02 11:29:04.570','2025-06-02 11:29:04.570'),('option-19','Thành phần','Vitamin C','2025-06-02 11:29:04.740','2025-06-02 11:29:04.740'),('option-2','Loại da','Da khô','2025-06-02 11:29:01.827','2025-06-02 11:29:01.827'),('option-20','Thành phần','Niacinamide','2025-06-02 11:29:04.908','2025-06-02 11:29:04.908'),('option-3','Loại da','Da hỗn hợp','2025-06-02 11:29:01.998','2025-06-02 11:29:01.998'),('option-4','Mùi hương','Trà xanh','2025-06-02 11:29:02.193','2025-06-02 11:29:02.193'),('option-5','Mùi hương','Hoa hồng','2025-06-02 11:29:02.361','2025-06-02 11:29:02.361'),('option-6','Mùi hương','Dâu tây','2025-06-02 11:29:02.529','2025-06-02 11:29:02.529'),('option-7','Chỉ số chống nắng','SPF 30','2025-06-02 11:29:02.703','2025-06-02 11:29:02.703'),('option-8','Chỉ số chống nắng','SPF 50+','2025-06-02 11:29:02.875','2025-06-02 11:29:02.875'),('option-9','Dạng sản phẩm','Tuýp','2025-06-02 11:29:03.042','2025-06-02 11:29:03.042');
/*!40000 ALTER TABLE `cosmeticoption` ENABLE KEYS */;

--
-- Table structure for table `cosmeticreview`
--

DROP TABLE IF EXISTS `cosmeticreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosmeticreview` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cosmeticId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CosmeticReview_cosmeticId_userId_orderId_key` (`cosmeticId`,`userId`,`orderId`),
  KEY `CosmeticReview_cosmeticId_idx` (`cosmeticId`),
  KEY `CosmeticReview_userId_idx` (`userId`),
  KEY `CosmeticReview_orderId_idx` (`orderId`),
  CONSTRAINT `CosmeticReview_cosmeticId_fkey` FOREIGN KEY (`cosmeticId`) REFERENCES `cosmetic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CosmeticReview_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CosmeticReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmeticreview`
--

/*!40000 ALTER TABLE `cosmeticreview` DISABLE KEYS */;
INSERT INTO `cosmeticreview` VALUES ('00a4c1a8-6c72-4cf7-9d1d-90efb35d50ef','537fd879-4a51-4be7-97eb-0433800a529b','3c2bb293-860e-4e2a-af4d-45ea1c498008','ec338100-8e29-4871-bb40-ae3703da0f5b',5,'dolorum utique clementia','Quisquam veritatis decens altus supellex callide. Damno vae vulticulus suscipit error vaco.','2025-06-02 11:29:39.174','2025-06-02 11:29:39.174'),('06396a62-a24a-44f1-ade7-7620eb9a42c2','a87fcb99-483c-49a2-baaa-8e862f77be17','3c2bb293-860e-4e2a-af4d-45ea1c498008','3f3d49d2-3c6c-4dca-aa27-b4c549eabe67',4,'spes spero sophismata','Sublime tendo consequuntur cultura usque cibo textilis illum. Eveniet contigo tenuis tactus voveo sublime.','2025-06-02 11:29:55.138','2025-06-02 11:29:55.138'),('068151ec-6155-4b54-8ad2-2c9f9e7a1290','a87fcb99-483c-49a2-baaa-8e862f77be17','6782526c-3eef-4e48-ab65-10b11f8e7c8d','599fe46a-5c00-4a0a-a9fb-4b73e444d9d9',4,'tibi animus asperiores','Recusandae vulgo tondeo stipes calcar accedo denuncio urbs. Artificiose consequatur pecus adicio vomito suspendo cito.','2025-06-02 11:29:56.031','2025-06-02 11:29:56.031'),('08c03847-27fb-41f0-ae33-fbb922d4d982','8cff7ac7-717a-4dc2-a217-b9d29fdaec56','3c2bb293-860e-4e2a-af4d-45ea1c498008','7625ac66-942b-4cf5-bdce-9921f53abee4',5,'tergum provident angulus','Architecto adficio bardus vestrum claudeo adhaero tabesco confero collum. Temptatio volubilis molestias deficio creptio tamdiu sit.','2025-06-02 11:29:47.869','2025-06-02 11:29:47.869'),('0bd811c7-a7ae-4115-bcb4-b33f293192c7','692c05e0-b6e4-4441-bc60-779ff29fabf5','6782526c-3eef-4e48-ab65-10b11f8e7c8d','968a622b-c3df-4032-8098-5358eb4e5fa4',5,'tamquam conatus quibusdam','Tergeo suadeo statim explicabo. Color avarus veritatis inflammatio tonsor conculco congregatio custodia spiculum alo.','2025-06-02 11:29:42.822','2025-06-02 11:29:42.822'),('174e80ee-42c5-4a65-a677-941f640f6221','816d5d88-288b-4cd8-a223-fafb3593dbfc','6782526c-3eef-4e48-ab65-10b11f8e7c8d','b5eba1fd-1bc2-4eeb-bf2e-0fb416b4c68b',5,'cum stips coaegresco','Consequuntur soluta ultio aliqua maxime attero. Spero stabilis coepi vomito totidem.','2025-06-02 11:29:47.188','2025-06-02 11:29:47.188'),('177299ab-f0b6-42eb-a4e2-2645a836f995','537fd879-4a51-4be7-97eb-0433800a529b','6782526c-3eef-4e48-ab65-10b11f8e7c8d','843c9178-2809-4c2e-87b1-ed94431e1a8c',4,'conitor incidunt culpo','Vitiosus comburo bellicus fugit aegrotatio velociter votum architecto careo iure. Tempore deorsum defleo conicio quam paens carpo.','2025-06-02 11:29:40.070','2025-06-02 11:29:40.070'),('1894a815-e570-42bc-9784-c2d7f4494162','5a74fbad-fd59-4d09-9299-2ddf96337cad','3c2bb293-860e-4e2a-af4d-45ea1c498008','3c257b1a-b4ba-4489-b145-921040fd9b9f',5,'molestias claustrum repudiandae','Studio tricesimus crur qui provident conventus. Comparo soluta terminatio cogito.','2025-06-02 11:29:40.759','2025-06-02 11:29:40.759'),('1c0adc06-3811-46e6-9423-7cd8fa0fe6ec','6ba69ae0-2e4f-41b7-95d3-da4644d3c8a5','99f86c0a-f550-4bb1-a23b-548e63517cbe','6756c7b6-50ad-434b-91e5-9b34b02d492f',4,'comis texo iusto','Artificiose tabella ademptio excepturi atrocitas defero ascit. Paens advenio non cras.','2025-06-02 11:29:44.470','2025-06-02 11:29:44.470'),('1ccf2ce0-fdcf-4e92-9c9a-e8ed1cf120d6','b9c170e2-6ef7-44f3-a049-087141dbf5d8','99f86c0a-f550-4bb1-a23b-548e63517cbe','6e5445bc-2c57-4323-ad11-55639842d605',4,'vado collum arbustum','Ipsum spoliatio amiculum calculus terra ipsum bis thema usitas audio. Valetudo tollo credo avarus ulciscor stella sub cometes.','2025-06-02 11:29:59.667','2025-06-02 11:29:59.667'),('1df7f0b2-61ca-4023-8ab5-85d769ac02b2','d54e23e9-cee0-4781-ad07-824cc4067943','3c2bb293-860e-4e2a-af4d-45ea1c498008','1d70d34d-c2d6-4144-aab8-df8f10e42d53',4,'tempus pectus eveniet','Agnitio varius unde tero solitudo utrimque. Dens dolorem tonsor pecto appono demum.','2025-06-02 11:30:01.073','2025-06-02 11:30:01.073'),('1fc42575-f577-4850-9bd0-04de2974ef5e','692c05e0-b6e4-4441-bc60-779ff29fabf5','99f86c0a-f550-4bb1-a23b-548e63517cbe','6e5445bc-2c57-4323-ad11-55639842d605',5,'suggero cubo tardus','Deinde ventito volup contra amissio vestigium turbo. Vesco ocer conservo.','2025-06-02 11:29:43.062','2025-06-02 11:29:43.062'),('22b8b752-905d-408d-98b8-b6a75209c1da','816d5d88-288b-4cd8-a223-fafb3593dbfc','2e677649-fd64-4a9d-b892-9f9c136498e5','1fd11485-1157-4821-8ddc-c9a504e64231',4,'validus tracto crapula','Deinde velut thorax ad sequi aut tamquam teneo totus viridis. Umbra degero peccatus atavus.','2025-06-02 11:29:46.749','2025-06-02 11:29:46.749'),('22f33f4a-ddb1-4237-9477-ea334bb5f2f2','8f7f55b1-8ed3-40f6-b2a1-b60f262c1d4f','2e677649-fd64-4a9d-b892-9f9c136498e5','f5893d06-275e-4ab3-ba60-ba43b0ef5f57',5,'apostolus valde umerus','Mollitia cohibeo vehemens causa doloremque sodalitas. Tum sursum caput vestigium cenaculum aspernatur adversus summa iste amplitudo.','2025-06-02 11:29:51.259','2025-06-02 11:29:51.259'),('234084f8-7f72-4595-9cc8-af2c39e6e1c9','18ca63fe-f389-493d-b771-67e4df3b2352','99f86c0a-f550-4bb1-a23b-548e63517cbe','1d582585-c0d2-4f04-932a-528c6b4f7e7f',5,'cohaero thymbra dolores','Absens utor esse velit dolorum subvenio timidus omnis. Ea theatrum commemoro coma aggredior.','2025-06-02 11:29:37.558','2025-06-02 11:29:37.558'),('244453e6-c018-4eb4-8f77-0af02afbf7a4','16237da4-634c-49aa-8a75-a65c7ba55b73','3c2bb293-860e-4e2a-af4d-45ea1c498008','467e302e-2b3e-484a-a2c4-b83d791d54e6',4,'amo adeptio cibo','Conduco carbo deputo sulum vergo dolores desipio. Cognatus cibus alii sumo.','2025-06-02 11:29:34.984','2025-06-02 11:29:34.984'),('25a834a3-d69f-407f-a89e-ca416371e875','c58dcd30-29fd-4d9a-a54b-76e37bf72e43','3c2bb293-860e-4e2a-af4d-45ea1c498008','c3cbb808-92aa-42ec-8ce6-8b75923068eb',5,'audentia veritas fugiat','Apostolus cupiditas uxor. Tunc temeritas crudelis.','2025-06-02 11:29:59.910','2025-06-02 11:29:59.910'),('25b287e6-c28e-41a3-a30d-e139fe0ec9da','a7b2eac9-7070-4bc6-be8b-e85774c3d8a4','2e677649-fd64-4a9d-b892-9f9c136498e5','5b7da0e2-71de-4546-b5ea-4a51982d965e',5,'admoneo decipio arcus','Coerceo curtus comes excepturi tumultus cruentus quos celebrer. Quia barba curia vaco sui decet super cupiditas.','2025-06-02 11:29:54.012','2025-06-02 11:29:54.012'),('30205a74-7a28-4e69-afd6-c6ad0a82e5e1','692c05e0-b6e4-4441-bc60-779ff29fabf5','2e677649-fd64-4a9d-b892-9f9c136498e5','2fbea7dc-d5e7-4e01-8185-2a96cb543786',4,'defaeco demum comprehendo','Capillus sit stella candidus conspergo convoco atque cupio audio conor. Arceo blandior fuga apto suffragium cubitum perferendis caelestis adnuo.','2025-06-02 11:29:42.371','2025-06-02 11:29:42.371'),('325fb9a9-629f-49bc-999f-d9a296e49bc7','d969d11c-f220-4991-817e-afe9421ccc1a','6782526c-3eef-4e48-ab65-10b11f8e7c8d','1a3323ea-6d75-4cbf-b80b-507eecb3bb26',5,'collum dolorem dolores','Ter cura soluta attero culpa. Iure deludo aer odio infit.','2025-06-02 11:30:03.330','2025-06-02 11:30:03.330'),('37fc98ac-e364-4894-a3f4-3aa5634cbd2d','537fd879-4a51-4be7-97eb-0433800a529b','2e677649-fd64-4a9d-b892-9f9c136498e5','96684e7b-6cfa-43f8-a81f-97c8a247fb7d',5,'vilis calamitas cibo','Stipes ducimus crapula ante. Considero amplexus concido paens decor aut depono ocer crastinus cariosus.','2025-06-02 11:29:39.620','2025-06-02 11:29:39.620'),('3bb580d1-a9d7-4430-89a6-e74c70974636','b5ede169-6ca8-423f-bc84-a645d9766828','6782526c-3eef-4e48-ab65-10b11f8e7c8d','28538253-19c5-42be-960b-227fd18e3919',4,'praesentium sit coniecto','Bellum autem peior depulso vobis calculus. Calamitas tamquam atavus cui patria succurro arcesso tubineus stultus.','2025-06-02 11:29:57.813','2025-06-02 11:29:57.813'),('3c32c198-ebbd-472f-ad6f-aea00a118847','16237da4-634c-49aa-8a75-a65c7ba55b73','99f86c0a-f550-4bb1-a23b-548e63517cbe','40c379f6-e6d3-4d50-981c-fd2a02d7836b',5,'capitulus libero qui','Adduco ea alienus solitudo tamisium comprehendo amplus denique acerbitas. Apostolus universe auctus pauper caste pecco apparatus acquiro quidem.','2025-06-02 11:29:36.190','2025-06-02 11:29:36.190'),('3fdbbe62-dc1b-48de-8957-129efd394b20','988686a7-afcf-46ee-8edc-bdd545726ec4','6782526c-3eef-4e48-ab65-10b11f8e7c8d','5b3ba8ce-bc83-4d1a-a6fb-88825f306329',5,'aggredior terreo ventus','Depopulo cum vel amicitia coniuratio ratione tempora tricesimus ambitus aspicio. Deorsum coaegresco armarium curtus tabesco.','2025-06-02 11:29:53.278','2025-06-02 11:29:53.278'),('40756bae-64e4-4dd3-8f6c-0afa25cf078b','8f7f55b1-8ed3-40f6-b2a1-b60f262c1d4f','6782526c-3eef-4e48-ab65-10b11f8e7c8d','b4c01f2b-3de8-48ac-9d5a-4827d89c641e',5,'beneficium delinquo comptus','Testimonium traho velit adsuesco. Amplitudo aperiam ago tonsor victus iste curtus tam bos vigor.','2025-06-02 11:29:51.705','2025-06-02 11:29:51.705'),('451d1eaa-b653-45d9-8ce9-956d2310ff43','1a9703ed-d4cb-434c-b9af-cb23c5e21710','2e677649-fd64-4a9d-b892-9f9c136498e5','1fd11485-1157-4821-8ddc-c9a504e64231',5,'comminor cumque deprecator','Tantillus cohors conculco vesco candidus accendo. Suppono audax damno amiculum atqui voluptas stultus uter colligo una.','2025-06-02 11:29:38.253','2025-06-02 11:29:38.253'),('4708e141-3b9c-426b-b1e5-bbfc3038a084','8d74bdbc-7d8d-457d-be36-90a2a4e50e6e','2e677649-fd64-4a9d-b892-9f9c136498e5','9c86302b-c3bc-4eab-ae55-73a2a472169e',5,'soluta utique denuo','Agnosco cruciamentum aliquam. Cum synagoga allatus quis comitatus venustas arcus spiritus teres.','2025-06-02 11:29:49.685','2025-06-02 11:29:49.685'),('4d3cd00a-7019-4f53-9b82-89b049b4dea6','692c05e0-b6e4-4441-bc60-779ff29fabf5','3c2bb293-860e-4e2a-af4d-45ea1c498008','be2a89bc-5b69-4200-aff2-2862f4280ec9',5,'ut libero verumtamen','Sordeo texo canonicus sulum decumbo adflicto ex. Vergo trado atque.','2025-06-02 11:29:42.128','2025-06-02 11:29:42.128'),('547d0f4e-1931-434c-a6f1-98561f8e8dc1','b9c170e2-6ef7-44f3-a049-087141dbf5d8','6782526c-3eef-4e48-ab65-10b11f8e7c8d','4b38d297-be89-44b1-91ef-9d3b1e2c7b05',4,'alias animadverto victus','Aeneus adimpleo reiciendis unus somnus quaerat. Ea aeger considero tersus comptus.','2025-06-02 11:29:59.421','2025-06-02 11:29:59.421'),('554d479f-868b-4cb3-bfbc-1a00a0d5f829','709d1ab1-dad6-4369-8253-e7cbf272586e','2e677649-fd64-4a9d-b892-9f9c136498e5','37e5d2ca-b3af-4d23-aa1c-bd765b620f0b',5,'temeritas corrigo auctus','Textus tutamen amicitia inflammatio sortitus quibusdam admitto tametsi. Traho ocer aliquid deludo candidus.','2025-06-02 11:29:45.381','2025-06-02 11:29:45.381'),('55a50cec-7f7d-41ce-b767-d5fab7823d8a','8cff7ac7-717a-4dc2-a217-b9d29fdaec56','6782526c-3eef-4e48-ab65-10b11f8e7c8d','d43ce328-e6a5-46de-87b8-526668b1643b',5,'trucido sequi delicate','Necessitatibus defungo confido aperio vaco accommodo tametsi spoliatio patior. Calco adipiscor laudantium tum usus curvo voluptatum.','2025-06-02 11:29:48.756','2025-06-02 11:29:48.756'),('57d50cac-5769-4769-ba32-418ffb1cdc8b','a87fcb99-483c-49a2-baaa-8e862f77be17','2e677649-fd64-4a9d-b892-9f9c136498e5','bd9b5711-40fa-42e8-8560-89080b5cb40c',4,'caries curiositas suasoria','Ventosus nemo tergo voluntarius accusator. Voro alias coruscus.','2025-06-02 11:29:55.585','2025-06-02 11:29:55.585'),('5bf101a0-d3ff-44ce-8894-e3f06474e6ac','8d74bdbc-7d8d-457d-be36-90a2a4e50e6e','99f86c0a-f550-4bb1-a23b-548e63517cbe','1d582585-c0d2-4f04-932a-528c6b4f7e7f',4,'tibi clarus allatus','Volo basium a calco iure suscipit campana maxime alii arbitro. Eligendi coepi allatus laudantium valens territo dens.','2025-06-02 11:29:50.369','2025-06-02 11:29:50.369'),('63f05f00-1b03-432a-833d-06c7eca5bbc1','a7b2eac9-7070-4bc6-be8b-e85774c3d8a4','6782526c-3eef-4e48-ab65-10b11f8e7c8d','f6f94f98-b498-43e5-aa97-851602df03e1',4,'commemoro sperno creo','Umquam atrox cunabula cometes amplexus cinis nostrum tabella. Suppellex utrum stabilis taceo teneo certus speculum totam.','2025-06-02 11:29:54.454','2025-06-02 11:29:54.454'),('671422fd-04af-4f47-bd22-92eeb8bb310e','8f7f55b1-8ed3-40f6-b2a1-b60f262c1d4f','3c2bb293-860e-4e2a-af4d-45ea1c498008','f79daba9-c357-43fe-8719-1bc571e0054b',5,'deprecator admoneo suffragium','Vitiosus amplexus verto vicinus. Alter quaerat adipiscor uberrime thymum supplanto tabula.','2025-06-02 11:29:50.814','2025-06-02 11:29:50.814'),('67cf67a8-e64e-4432-afa7-bea7ee57c7ec','c58dcd30-29fd-4d9a-a54b-76e37bf72e43','2e677649-fd64-4a9d-b892-9f9c136498e5','4a0d6854-81b2-45b5-819f-4955d15a3d33',5,'perspiciatis amplexus argumentum','Compello thalassinus cupio cubo vinculum cruentus. Aliqua admitto expedita maxime.','2025-06-02 11:30:00.157','2025-06-02 11:30:00.157'),('692d5937-fe7c-4846-b170-01418f70ea2f','8cff7ac7-717a-4dc2-a217-b9d29fdaec56','99f86c0a-f550-4bb1-a23b-548e63517cbe','5afbe83b-a5e5-4634-a4bb-e2972e87d96f',4,'tardus adulatio tabernus','Texo depromo ademptio depopulo cupio. Suscipio depereo pecus cattus curis suspendo artificiose aegre audacia bardus.','2025-06-02 11:29:48.998','2025-06-02 11:29:48.998'),('69fc2558-f962-4678-99ba-034f8c70c485','b5ede169-6ca8-423f-bc84-a645d9766828','3c2bb293-860e-4e2a-af4d-45ea1c498008','6e08eea4-c874-43a9-a9b2-51c2cd114c99',4,'tergum tribuo causa','Bestia aurum summopere neque centum vitium stillicidium tumultus certus patria. Umbra contego quaerat pax.','2025-06-02 11:29:56.920','2025-06-02 11:29:56.920'),('6aa92445-9135-41bd-8e41-dfecb51bcacf','5a74fbad-fd59-4d09-9299-2ddf96337cad','6782526c-3eef-4e48-ab65-10b11f8e7c8d','d9887555-c021-497c-b742-2aff6320b9a3',5,'aggero cultellus totam','Delectatio praesentium compello deprecator aegre talio. Deporto vitae thermae.','2025-06-02 11:29:41.237','2025-06-02 11:29:41.237'),('7469692d-0a19-42b3-9758-d7a125fae03e','816d5d88-288b-4cd8-a223-fafb3593dbfc','99f86c0a-f550-4bb1-a23b-548e63517cbe','1d582585-c0d2-4f04-932a-528c6b4f7e7f',4,'undique ipsa ocer','Torqueo victus cariosus. Speciosus correptius ambitus.','2025-06-02 11:29:47.425','2025-06-02 11:29:47.425'),('78ad6a21-4b18-4061-9ee1-5d1a266ebc1b','6ba69ae0-2e4f-41b7-95d3-da4644d3c8a5','3c2bb293-860e-4e2a-af4d-45ea1c498008','e9a7c2d1-d47f-4cf2-ad3b-437042ab60ce',4,'dolorum vitae assentator','Canis color demonstro virga theca valeo. Accusantium vomica sonitus.','2025-06-02 11:29:43.300','2025-06-02 11:29:43.300'),('7a5d3115-9819-4250-b0e3-54224250961c','16237da4-634c-49aa-8a75-a65c7ba55b73','6782526c-3eef-4e48-ab65-10b11f8e7c8d','6a7bdb15-09c0-4f90-ad3f-68ce4bba7bba',5,'viduo vehemens atrocitas','Tergo adversus vere undique delectatio. Tenus consequatur in auctus teres cupiditas.','2025-06-02 11:29:35.744','2025-06-02 11:29:35.744'),('7dec632a-b292-45b0-860c-92a6f058aff8','c58dcd30-29fd-4d9a-a54b-76e37bf72e43','99f86c0a-f550-4bb1-a23b-548e63517cbe','2669a756-0734-4793-b21c-95f366563c04',5,'delicate universe non','Arbor verumtamen volva iure vindico trans est sonitus conscendo. Colo tantum celer iure angulus calco amitto atque uter usus.','2025-06-02 11:30:00.838','2025-06-02 11:30:00.838'),('8049a63d-54f8-4c59-ae1f-650eb5a9b158','709d1ab1-dad6-4369-8253-e7cbf272586e','3c2bb293-860e-4e2a-af4d-45ea1c498008','cea01e5f-8440-4274-b6ca-aa8dded77312',4,'defessus cupiditate sol','Acies degero nesciunt vivo crur cuppedia cum verto. Audentia deporto dapifer valeo velit colo tantum tepidus.','2025-06-02 11:29:44.938','2025-06-02 11:29:44.938'),('812a6d09-785d-48c7-b01e-b5ae108d0b3d','d54e23e9-cee0-4781-ad07-824cc4067943','99f86c0a-f550-4bb1-a23b-548e63517cbe','5afbe83b-a5e5-4634-a4bb-e2972e87d96f',5,'tersus amita supellex','Adversus appositus tandem solum ulciscor tego amiculum sollicito animi. Sapiente aperte aggredior impedit possimus pecco eum.','2025-06-02 11:30:02.203','2025-06-02 11:30:02.203'),('8272e127-e77b-44f1-b447-dbec9f1c195b','5a74fbad-fd59-4d09-9299-2ddf96337cad','2e677649-fd64-4a9d-b892-9f9c136498e5','b191b77d-4075-4519-840a-6f89ecdb066b',4,'amita decretum nobis','Alius amet earum neque infit civitas deserunt cedo tres claudeo. Capio tenax sumo vulgo derelinquo perspiciatis acidus.','2025-06-02 11:29:40.999','2025-06-02 11:29:40.999'),('8334f718-6c96-4cc9-acbd-beea7a4302df','a7b2eac9-7070-4bc6-be8b-e85774c3d8a4','3c2bb293-860e-4e2a-af4d-45ea1c498008','780027d0-9c90-4f6f-803b-bff98f95d945',5,'rerum centum casso','Curtus avarus texo temeritas. Verbera neque stillicidium thema tantillus.','2025-06-02 11:29:53.766','2025-06-02 11:29:53.766'),('83a4c29a-8a5e-4e6e-aa71-cd41c22a5dfd','a7b2eac9-7070-4bc6-be8b-e85774c3d8a4','99f86c0a-f550-4bb1-a23b-548e63517cbe','655705f8-f522-4554-880a-52850ae9a323',4,'vere vinitor non','Tabula audax celebrer abutor maxime validus comburo solium auctus aurum. Adfectus cervus coruscus videlicet.','2025-06-02 11:29:54.898','2025-06-02 11:29:54.898'),('870e4783-9922-4251-bd6b-d30e24735f4d','6ba69ae0-2e4f-41b7-95d3-da4644d3c8a5','2e677649-fd64-4a9d-b892-9f9c136498e5','2fbea7dc-d5e7-4e01-8185-2a96cb543786',5,'amplexus caritas alveus','Super dignissimos abbas vesco cum apparatus. Aestas pariatur balbus truculenter confido concedo.','2025-06-02 11:29:43.540','2025-06-02 11:29:43.540'),('888a54f5-863c-494c-8227-1212643c07af','18ca63fe-f389-493d-b771-67e4df3b2352','2e677649-fd64-4a9d-b892-9f9c136498e5','8e147498-10db-47ad-bff3-8bff5b0daf97',5,'saepe cupiditate balbus','Cumque crur comis cauda cito vis molestias provident caelestis. Textus cauda trans.','2025-06-02 11:29:37.076','2025-06-02 11:29:37.076'),('88fc4253-2643-46db-a2ec-2a1f950c3229','8cff7ac7-717a-4dc2-a217-b9d29fdaec56','2e677649-fd64-4a9d-b892-9f9c136498e5','8fc073a2-95dc-4bf5-8a30-c45231df0de8',5,'universe adduco ambulo','Creptio conicio aranea. Audio solium tabgo.','2025-06-02 11:29:48.309','2025-06-02 11:29:48.309'),('92df8bb6-e4fd-49fe-8abc-7ba2fdc36610','16237da4-634c-49aa-8a75-a65c7ba55b73','2e677649-fd64-4a9d-b892-9f9c136498e5','2fbea7dc-d5e7-4e01-8185-2a96cb543786',4,'cunae conqueror venio','Veritatis tam solus ancilla decipio. Versus tondeo aqua.','2025-06-02 11:29:35.293','2025-06-02 11:29:35.293'),('9a1b1d5a-95e5-4e41-947b-62c6d6a648ef','a87fcb99-483c-49a2-baaa-8e862f77be17','99f86c0a-f550-4bb1-a23b-548e63517cbe','45a74516-8641-4748-b708-d9e0ed5418ff',4,'carpo voluptatem collum','Color unde tricesimus vito solum uter tolero. Consequuntur id tepesco cunae sursum verbum.','2025-06-02 11:29:56.473','2025-06-02 11:29:56.473'),('9ba7136f-e3b9-49ce-ba1f-9d63169cb2ad','709d1ab1-dad6-4369-8253-e7cbf272586e','6782526c-3eef-4e48-ab65-10b11f8e7c8d','8d457dbc-5c66-4a41-91ad-13323c71b76e',4,'thermae cui tametsi','Aperio alo conor similique venio cur adficio vomito textilis minus. Qui suffragium sit vorago usitas decimus voro cattus brevis fuga.','2025-06-02 11:29:45.621','2025-06-02 11:29:45.621'),('a3a29154-c780-4876-88ad-4ce3b1b3e328','18ca63fe-f389-493d-b771-67e4df3b2352','6782526c-3eef-4e48-ab65-10b11f8e7c8d','8d457dbc-5c66-4a41-91ad-13323c71b76e',4,'vitiosus absum censura','Thermae quia pauci charisma. Suscipio studio cruciamentum denego communis vociferor.','2025-06-02 11:29:37.319','2025-06-02 11:29:37.319'),('adb29f4e-a831-433b-a6cf-d187ad26d2ea','b5ede169-6ca8-423f-bc84-a645d9766828','99f86c0a-f550-4bb1-a23b-548e63517cbe','6a9211c2-79a4-4c59-934c-80b5287b25eb',5,'debilito defungo laborum','Altus vomito dedico subito vociferor tempus tyrannus terga. Thesis vomica cupiditate clamo valens vulnus aequus derelinquo ago.','2025-06-02 11:29:58.261','2025-06-02 11:29:58.261'),('aeb283b0-78cc-4e66-8a31-e5d038fbd3c8','b9c170e2-6ef7-44f3-a049-087141dbf5d8','3c2bb293-860e-4e2a-af4d-45ea1c498008','264902ce-fb0b-426c-bcb3-547f6bca6add',5,'decerno credo thymum','Tenuis ater astrum apostolus quod triumphus. Utique carbo valde animadverto angulus arma curtus cubo.','2025-06-02 11:29:58.734','2025-06-02 11:29:58.734'),('afb42d51-6a2e-4984-a2f7-f8edac621da3','988686a7-afcf-46ee-8edc-bdd545726ec4','2e677649-fd64-4a9d-b892-9f9c136498e5','867af521-9010-43de-b043-45999a23209f',5,'utique alioqui animus','Bardus cruentus aufero dens vinco. Aeternus vulnero quaerat sublime cubicularis animi solvo.','2025-06-02 11:29:53.035','2025-06-02 11:29:53.035'),('ba348bc8-5a4e-4f38-bea9-8cbc7c6c4776','d54e23e9-cee0-4781-ad07-824cc4067943','2e677649-fd64-4a9d-b892-9f9c136498e5','e3dc88fa-2a03-4477-97c2-dda9728eb0eb',4,'decor officia trans','Degusto solutio accusamus balbus aetas balbus cerno temperantia cimentarius versus. Amaritudo usus defero adfectus atavus.','2025-06-02 11:30:01.519','2025-06-02 11:30:01.519'),('c3dcbe72-36ad-436c-9506-bdce6c4b0ccf','537fd879-4a51-4be7-97eb-0433800a529b','99f86c0a-f550-4bb1-a23b-548e63517cbe','a2492858-9035-4fad-81d5-17bc7bae1386',5,'ducimus aureus congregatio','Voluptatem sunt conqueror tenetur. Vomito velociter quidem comes maiores solutio.','2025-06-02 11:29:40.306','2025-06-02 11:29:40.306'),('c64f94cc-43ad-4698-a027-ca7bffd995ae','8d74bdbc-7d8d-457d-be36-90a2a4e50e6e','3c2bb293-860e-4e2a-af4d-45ea1c498008','1d70d34d-c2d6-4144-aab8-df8f10e42d53',4,'somniculosus corrigo causa','Crux quas cedo coaegresco. Thermae atrox truculenter charisma delinquo adopto alius ventito sumo.','2025-06-02 11:29:49.236','2025-06-02 11:29:49.236'),('c8c7d34b-8b55-4584-9c62-763f205596d5','d969d11c-f220-4991-817e-afe9421ccc1a','3c2bb293-860e-4e2a-af4d-45ea1c498008','5c6cbbf3-5436-44b2-9903-bedade2184de',4,'textus synagoga conculco','Speciosus neque stultus praesentium. Articulus adulescens similique termes sopor iusto.','2025-06-02 11:30:02.654','2025-06-02 11:30:02.654'),('cb0b31c1-204f-4614-8561-e2eaa1564d64','1a9703ed-d4cb-434c-b9af-cb23c5e21710','3c2bb293-860e-4e2a-af4d-45ea1c498008','42d5f810-9b47-49c1-a7e9-2b18ebdf7e4f',4,'depono canto quibusdam','Absorbeo tamdiu benevolentia demum adamo amicitia talis celo testimonium alter. Somniculosus aliquid caries doloremque tantillus depromo.','2025-06-02 11:29:38.003','2025-06-02 11:29:38.003'),('ccce504c-99cd-4bd9-9aa3-91862b5768f1','b9c170e2-6ef7-44f3-a049-087141dbf5d8','2e677649-fd64-4a9d-b892-9f9c136498e5','5b7da0e2-71de-4546-b5ea-4a51982d965e',4,'venio aedificium vehemens','Soluta cum surculus labore vesco uterque. Sono aurum ratione coaegresco adduco error volup tamen.','2025-06-02 11:29:58.975','2025-06-02 11:29:58.975'),('ccce9a8a-0d16-42e3-9d7c-6a545e2d9684','988686a7-afcf-46ee-8edc-bdd545726ec4','99f86c0a-f550-4bb1-a23b-548e63517cbe','8ec10683-f786-4dfc-b66c-32d088708374',4,'alioqui angelus stabilis','Quas arbustum decet supplanto tum uter. Calculus acies arceo capitulus somniculosus cerno uterque considero consequuntur capitulus.','2025-06-02 11:29:53.527','2025-06-02 11:29:53.527'),('ce381c74-8402-4ef6-aa93-ecbb233d27cc','d969d11c-f220-4991-817e-afe9421ccc1a','2e677649-fd64-4a9d-b892-9f9c136498e5','da9afa0a-1ede-4ed9-9dba-8e7b144ee394',5,'succedo arx sit','Cena asper teres aqua surgo tactus. Vilicus omnis cilicium vergo audeo tandem advoco.','2025-06-02 11:30:03.091','2025-06-02 11:30:03.091'),('cec31652-6f82-4c0f-8ac2-5a92bdf5b2a7','709d1ab1-dad6-4369-8253-e7cbf272586e','99f86c0a-f550-4bb1-a23b-548e63517cbe','c83fc93f-eff6-44c3-bedd-6fdb8931810d',4,'demoror cetera nostrum','Vestigium inflammatio pecco solus delego studio. Verbera commodo turpis vespillo cribro.','2025-06-02 11:29:46.060','2025-06-02 11:29:46.060'),('d79f3d11-ed57-4877-bc28-9aa1526e6c1d','1a9703ed-d4cb-434c-b9af-cb23c5e21710','99f86c0a-f550-4bb1-a23b-548e63517cbe','5afbe83b-a5e5-4634-a4bb-e2972e87d96f',5,'circumvenio pauper clementia','Ultio perspiciatis claustrum. Deorsum recusandae nihil victus conitor demonstro deserunt arca.','2025-06-02 11:29:38.735','2025-06-02 11:29:38.735'),('d808d2d7-f66f-4446-96e3-993bb99129c0','8f7f55b1-8ed3-40f6-b2a1-b60f262c1d4f','99f86c0a-f550-4bb1-a23b-548e63517cbe','8f43859e-12d8-4ca3-9e06-dc59b962ac38',5,'qui defendo consuasor','Minima adnuo ventito verto ultra volva. Super copiose ustilo delectus torqueo valens angelus vestigium certe.','2025-06-02 11:29:52.153','2025-06-02 11:29:52.153'),('d987785b-f091-4009-b976-f15d085facb2','c58dcd30-29fd-4d9a-a54b-76e37bf72e43','6782526c-3eef-4e48-ab65-10b11f8e7c8d','6d21d295-30cf-4304-98c8-bcde1220600a',5,'thalassinus vehemens ulciscor','Praesentium undique vetus. Subseco curso solutio celo fugit.','2025-06-02 11:30:00.392','2025-06-02 11:30:00.392'),('da4a9e2d-040a-4e0f-a4d6-5eed1788cb3a','1a9703ed-d4cb-434c-b9af-cb23c5e21710','6782526c-3eef-4e48-ab65-10b11f8e7c8d','d9887555-c021-497c-b742-2aff6320b9a3',5,'versus ceno bellum','Atrox stipes blandior aliquam commemoro centum denique tres quae varius. Una atqui laborum angulus.','2025-06-02 11:29:38.494','2025-06-02 11:29:38.494'),('de04b94a-e025-406d-8e51-20ba39f6ce6e','d54e23e9-cee0-4781-ad07-824cc4067943','6782526c-3eef-4e48-ab65-10b11f8e7c8d','1ba32c3e-e7e7-4c27-9285-b8529cf3a2e4',5,'crapula blandior capitulus','Cras deputo peccatus capto defero. Valetudo ascit absorbeo saepe verecundia.','2025-06-02 11:30:01.966','2025-06-02 11:30:01.966'),('e103fc06-9657-4072-b11a-56bf32136d5b','816d5d88-288b-4cd8-a223-fafb3593dbfc','3c2bb293-860e-4e2a-af4d-45ea1c498008','d38c24d4-9f17-49bf-a74f-f41d207f772e',4,'impedit spoliatio consequatur','Aggredior abbas aedificium dolorum. Stillicidium aperte demo.','2025-06-02 11:29:46.508','2025-06-02 11:29:46.508'),('e9af07f9-c645-4593-8d80-41ce1ad4a445','18ca63fe-f389-493d-b771-67e4df3b2352','3c2bb293-860e-4e2a-af4d-45ea1c498008','3520887d-733a-4640-85fd-69c103141e75',4,'dapifer depulso optio','Id sortitus delectatio aequitas. Crux sublime acervus cur vinco.','2025-06-02 11:29:36.634','2025-06-02 11:29:36.634'),('efe72d0d-6fc2-4815-a417-dbe8ab87ed35','5a74fbad-fd59-4d09-9299-2ddf96337cad','99f86c0a-f550-4bb1-a23b-548e63517cbe','191520bc-36f1-4468-b6c3-54e5ce87fd41',5,'verus desolo accedo','Alter et numquam veniam. Itaque vilicus cena acervus voro thymbra delectatio.','2025-06-02 11:29:41.683','2025-06-02 11:29:41.683'),('f002028c-e588-4157-b85f-fc854868250d','988686a7-afcf-46ee-8edc-bdd545726ec4','3c2bb293-860e-4e2a-af4d-45ea1c498008','360b75a0-a32d-4fc9-ad3a-34de4ec6aa6e',4,'vos tepidus triumphus','Autus vespillo venustas curso aequus animadverto tenuis cito caput. Tergo utrimque aduro esse.','2025-06-02 11:29:52.592','2025-06-02 11:29:52.592'),('f8d14b31-95de-4bda-bbab-27a197043fc5','6ba69ae0-2e4f-41b7-95d3-da4644d3c8a5','6782526c-3eef-4e48-ab65-10b11f8e7c8d','654ab7e9-cdbe-476c-9b8f-7e3d3c64bcec',4,'bardus non audio','Amiculum venio tribuo tutamen auctus caritas aegrotatio amaritudo adiuvo. Calculus usitas sunt argentum atavus.','2025-06-02 11:29:44.019','2025-06-02 11:29:44.019'),('f96f7950-b815-4f80-8af4-def0218d21ac','8d74bdbc-7d8d-457d-be36-90a2a4e50e6e','6782526c-3eef-4e48-ab65-10b11f8e7c8d','31c5cf76-728e-402a-b09c-273efd0b5af5',4,'constans ultio aperiam','Labore totus comparo aer accusator conicio civitas amiculum. Recusandae crux fuga.','2025-06-02 11:29:50.127','2025-06-02 11:29:50.127'),('f9a7a95f-70a3-4f6b-87ef-bb789fc85030','d969d11c-f220-4991-817e-afe9421ccc1a','99f86c0a-f550-4bb1-a23b-548e63517cbe','d5b451f2-0d8f-4a5a-ba48-b33cc626b8a0',4,'tantillus animi absque','Deduco tamdiu usus vicinus cado pecus adiuvo coruscus tamisium. Suus dens eaque contego carcer corrupti.','2025-06-02 11:30:03.768','2025-06-02 11:30:03.768'),('fae1a1ca-b39b-4a05-a80c-71069daacfd1','b5ede169-6ca8-423f-bc84-a645d9766828','2e677649-fd64-4a9d-b892-9f9c136498e5','53da1df9-6fac-4c66-8c96-efb94962ce13',4,'cogo convoco repudiandae','Auxilium pel repudiandae aperio cognomen tredecim solium auxilium cubo arbor. Demitto blandior deleniti aequus arcus umerus nisi amicitia corona.','2025-06-02 11:29:57.364','2025-06-02 11:29:57.364');
/*!40000 ALTER TABLE `cosmeticreview` ENABLE KEYS */;

--
-- Table structure for table `cosmeticspec`
--

DROP TABLE IF EXISTS `cosmeticspec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosmeticspec` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cosmeticId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specKey` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specValue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CosmeticSpec_cosmeticId_fkey` (`cosmeticId`),
  CONSTRAINT `CosmeticSpec_cosmeticId_fkey` FOREIGN KEY (`cosmeticId`) REFERENCES `cosmetic` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmeticspec`
--

/*!40000 ALTER TABLE `cosmeticspec` DISABLE KEYS */;
/*!40000 ALTER TABLE `cosmeticspec` ENABLE KEYS */;

--
-- Table structure for table `cosmeticvariant`
--

DROP TABLE IF EXISTS `cosmeticvariant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosmeticvariant` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cosmeticId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CosmeticVariant_name_key` (`name`),
  UNIQUE KEY `CosmeticVariant_sku_key` (`sku`),
  KEY `CosmeticVariant_cosmeticId_fkey` (`cosmeticId`),
  CONSTRAINT `CosmeticVariant_cosmeticId_fkey` FOREIGN KEY (`cosmeticId`) REFERENCES `cosmetic` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosmeticvariant`
--

/*!40000 ALTER TABLE `cosmeticvariant` DISABLE KEYS */;
INSERT INTO `cosmeticvariant` VALUES ('104291b9-74fd-409c-86dd-02ec963d2b06','Chai 100ml-Special','709d1ab1-dad6-4369-8253-e7cbf272586e','Special',120333,110,'https://localserver.phuongy.works/images/1748877354838_images.jpg','2025-06-02 15:16:58.362','2025-06-02 15:16:58.362'),('11c5efcc-64ec-488e-beb6-abb876a3a17e','Chai 35ml','a7b2eac9-7070-4bc6-be8b-e85774c3d8a4','KNDL-30',280000,30,'https://picsum.photos/seed/liquid-foundation1/400/400','2025-06-02 15:31:08.424','2025-06-02 15:31:08.424'),('149efd1c-a9ff-4db5-8fdb-c7c5e7023782','Ống 8ml','537fd879-4a51-4be7-97eb-0433800a529b','MSR-8',220000,60,'https://picsum.photos/seed/mascara1/400/400','2025-06-02 15:33:33.890','2025-06-02 15:33:33.890'),('1a12f5c1-a6ec-4321-a79d-e879fa69e74d','Chai 120ml','e0322849-7a45-475e-88b4-5851b6b31283','XKD-120',150000,45,'https://localserver.phuongy.works/images/1748878220018_images.jpg','2025-06-02 15:30:23.749','2025-06-02 15:30:23.749'),('1b0f6925-9428-4814-96e8-793c3a673421','Ống 7ml','c58dcd30-29fd-4d9a-a54b-76e37bf72e43','MASCARA-8',130000,45,'https://localserver.phuongy.works/images/1748877484511_download.jpg','2025-06-02 15:18:06.958','2025-06-02 15:18:06.958'),('1cf694f2-481d-497f-94e1-60a8986469f9','Túi refill','18ca63fe-f389-493d-b771-67e4df3b2352','DD-24',170000,70,'https://localserver.phuongy.works/images/1748877409674_images.jpg','2025-06-02 15:19:29.499','2025-06-02 15:19:29.499'),('2371a178-d296-4128-ada6-f81f15e03f6f','Chai 100ml-Normal','709d1ab1-dad6-4369-8253-e7cbf272586e','Normal',122000,1109,'https://localserver.phuongy.works/images/1748877408735_images.jpg','2025-06-02 15:16:59.185','2025-06-02 16:40:00.534'),('24d5d4fa-0580-4bd1-ba23-678c26aed099','Chai mới','db3a6dca-f248-4ef9-adb4-14c57ace6762','IKU_09',350000,10,'https://localserver.phuongy.works/images/1748877299416_images.jpg','2025-06-02 15:15:36.727','2025-06-02 15:15:36.727'),('250dd404-1a0f-4751-af16-ea446cf2154b','Chai 400ml xanh đậm','8d74bdbc-7d8d-457d-be36-90a2a4e50e6e','QDF-85',230000,15,'https://localserver.phuongy.works/images/1748878391693_download.jpg','2025-06-02 15:33:14.982','2025-06-02 15:33:14.982'),('30643a38-490a-4c29-ae9c-b4f6f5579e64','Chai 500ml xanh nhạt','8d74bdbc-7d8d-457d-be36-90a2a4e50e6e','TDS-33',190000,20,'https://localserver.phuongy.works/images/1748878344360_download.jpg','2025-06-02 15:33:14.797','2025-06-02 15:33:14.797'),('3ac3e07f-a589-4d69-a46c-448151c197e3','Tuýp 30ml','6ba69ae0-2e4f-41b7-95d3-da4644d3c8a5','PRIMER-30',200000,35,'https://localserver.phuongy.works/images/1748876816974_kemlot2.webp','2025-06-02 15:08:45.825','2025-06-02 15:08:45.825'),('3d70c3da-851f-4ff3-af58-c428887c42cf','Chai 30ml','db3a6dca-f248-4ef9-adb4-14c57ace6762','TSW-30',300000,40,'https://localserver.phuongy.works/images/1748877267994_download.jpg','2025-06-02 15:15:35.627','2025-06-02 15:15:35.627'),('407cc3e0-1cd9-4e77-96e2-a0734c375820','Tuýp 50ml vạch xanh','8f7f55b1-8ed3-40f6-b2a1-b60f262c1d4f','LPO-97',190000,15,'https://localserver.phuongy.works/images/1748877842329_images.jpg','2025-06-02 15:24:09.380','2025-06-02 15:24:09.380'),('42b95f42-e0e4-44de-8d69-3c70ce1afa3b','Hũ 100g','18ca63fe-f389-493d-b771-67e4df3b2352','GTB-100',140000,50,'https://picsum.photos/seed/exfoliating-gel1/400/400','2025-06-02 15:19:28.576','2025-06-02 15:19:28.576'),('499563ea-5c82-49f5-9ee4-3d33067480a1','kem 4g','816d5d88-288b-4cd8-a223-fafb3593dbfc','kem4',560000,139,'https://localserver.phuongy.works/images/1748877228090_images.jpg','2025-06-02 15:14:01.155','2025-06-02 15:22:55.447'),('5311a6fb-a384-4c83-b00f-cb24baedf98c','Tuýp 120ml','988686a7-afcf-46ee-8edc-bdd545726ec4','GEL-EXF100',140000,35,'https://localserver.phuongy.works/images/1748877449251_download.jpg','2025-06-02 15:17:32.238','2025-06-02 15:17:32.238'),('53afd874-ffc9-4ae0-9cfc-bb2f4ba99980','Tuýp 150ml','b9c170e2-6ef7-44f3-a049-087141dbf5d8','SRM-150',120000,27,'https://picsum.photos/seed/cleanser1/400/400','2025-06-02 15:21:30.759','2025-06-02 15:21:30.759'),('55b9da9f-4680-4365-94c7-b23fca16c365','Thỏi 4g','816d5d88-288b-4cd8-a223-fafb3593dbfc','LIPSTICK-M4',180000,40,'https://localserver.phuongy.works/images/1748869292405_son1.webp','2025-06-02 15:14:00.757','2025-06-02 15:24:15.163'),('59e5155c-f197-406f-8c66-21ca19d35b4d','Chai 125ml','da3101c4-1abd-49d7-af5b-10666cc3bcfd','OIL-CLEANS150',220000,40,'https://localserver.phuongy.works/images/1748877074387_shopping.webp','2025-06-02 15:12:24.188','2025-06-02 15:12:24.188'),('65cc70c9-8f76-4b02-b93f-b739baffc8f3','Tuýp 50ml vạch đỏ','8f7f55b1-8ed3-40f6-b2a1-b60f262c1d4f','KCN-50',180000,45,'https://localserver.phuongy.works/images/1748877845727_download.jpg','2025-06-02 15:24:09.037','2025-06-02 15:24:09.037'),('6fe07316-d45b-4622-af31-6b4d44ee2296','Chai 100ml','709d1ab1-dad6-4369-8253-e7cbf272586e','MIST-100',110000,49,'https://localserver.phuongy.works/images/1748876595163_xitkhoang2.webp','2025-06-02 15:16:57.946','2025-06-02 16:40:00.742'),('786cdb30-ce27-42ac-bfff-1b6cc591f86a','Hộp 14g','692c05e0-b6e4-4441-bc60-779ff29fabf5','POWDER-10',150000,60,'https://localserver.phuongy.works/images/1748877718274_images.jpg','2025-06-02 15:22:10.364','2025-06-02 15:22:10.364'),('8c149ff1-ecb6-4cd1-9caa-a152be54db7f','Chai 500ml','da3101c4-1abd-49d7-af5b-10666cc3bcfd','OIL-CLEANS500',500000,89,'https://localserver.phuongy.works/images/1748877130643_images.jpg','2025-06-02 15:12:24.653','2025-06-02 16:40:00.849'),('90f72d23-0013-4772-a52b-d7850d706fd1','Phiên bản mùa đông','1a9703ed-d4cb-434c-b9af-cb23c5e21710','CHR_98',500000,0,'https://localserver.phuongy.works/images/1748877124724_download.jpg','2025-06-02 15:13:28.775','2025-06-02 15:13:28.775'),('951781e2-fcbb-4ffa-b025-72209021d315','Tuýp 20ml','8cff7ac7-717a-4dc2-a217-b9d29fdaec56','CREAM-EYE20',280000,30,'https://localserver.phuongy.works/images/1748877769504_images.jpg','2025-06-02 15:22:52.283','2025-06-02 15:22:52.283'),('aaa26223-4205-4b1c-8399-0818d065bec9','Hũ 50ml','5a74fbad-fd59-4d09-9299-2ddf96337cad','KDA-50',250000,30,'https://localserver.phuongy.works/images/1748877722961_download.jpg','2025-06-02 15:22:05.494','2025-06-02 15:22:05.494'),('b362358d-b842-42a3-bef7-4844030c4de1','Phiên bản đặc biệt 25g','d54e23e9-cee0-4781-ad07-824cc4067943','POU-34',400000,50,'https://localserver.phuongy.works/images/1748876976263_660eb9b5320aa946f820e611dfadc6f3.jpg','2025-06-02 15:09:55.016','2025-06-02 15:09:55.016'),('b37cd93d-935b-47d0-8dce-74900124be6c','Hộp 15g','d54e23e9-cee0-4781-ad07-824cc4067943','PNTD-15',320000,35,'https://localserver.phuongy.works/images/1748876983148_download.jpg','2025-06-02 15:09:54.555','2025-06-02 15:09:54.555'),('c263dfca-5490-4fc7-9950-9de353bf834c','Chai 250ml','1a9703ed-d4cb-434c-b9af-cb23c5e21710','THC-250',165000,25,'https://localserver.phuongy.works/images/1748877113894_download.jpg','2025-06-02 15:13:28.419','2025-06-02 15:13:28.419'),('d2080fa6-a953-4479-8808-b5cee1175645','Thỏi 5g','ffd4d3b2-8a39-41bc-88e5-4618dea07f34','SDL-5',95000,100,'https://picsum.photos/seed/lipbalm1/400/400','2025-06-02 15:25:15.918','2025-06-02 15:25:15.918'),('dd2893e9-5640-4fde-9b51-9a839d2745c8','Chai 150ml hồng','8d74bdbc-7d8d-457d-be36-90a2a4e50e6e','TTD-150',190000,40,'https://localserver.phuongy.works/images/1748878305229_download.jpg','2025-06-02 15:33:14.624','2025-06-02 15:33:14.624'),('e37d1555-aa7d-4ea4-a2b7-0014d8e0ff1d','Chai 20ml','16237da4-634c-49aa-8a75-a65c7ba55b73','SERUM-C30',300000,40,'https://localserver.phuongy.works/images/1748877807063_download.jpg','2025-06-02 15:23:30.255','2025-06-02 15:23:30.255'),('eda35c86-7441-42f6-9b18-e267750706c4','Hũ 75g','a87fcb99-483c-49a2-baaa-8e862f77be17','SVT-75',160000,70,'https://localserver.phuongy.works/images/1748877841687_download.jpg','2025-06-02 15:24:04.402','2025-06-02 15:24:04.402'),('f44614e0-6a26-4812-81b8-de2716c90731','Hộp 10g','d969d11c-f220-4991-817e-afe9421ccc1a','PMH-10',180000,35,'https://picsum.photos/seed/cream-blush1/400/400','2025-06-02 15:33:48.318','2025-06-02 15:33:48.318'),('fff205cf-1ab4-4bf1-84df-d70384884598','Chai 5ml','b5ede169-6ca8-423f-bc84-a645d9766828','KEMT-5',210000,50,'https://localserver.phuongy.works/images/1748878035346_images.jpg','2025-06-02 15:27:18.433','2025-06-02 15:27:18.433');
/*!40000 ALTER TABLE `cosmeticvariant` ENABLE KEYS */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','PROCESSING','SHIPPED','DELIVERED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `addressId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Order_paymentId_key` (`paymentId`),
  KEY `Order_userId_fkey` (`userId`),
  KEY `Order_addressId_fkey` (`addressId`),
  CONSTRAINT `Order_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Order_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `payment` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES ('07878bf8-ae53-4677-b2b5-5ac6022e1fa0','4b34abcc-12a5-419e-9559-b3a69c5821af','PENDING','cabdc023-4eb5-4cda-8849-92e7fddcf5f0','Đơn hàng 4 cho user 4b34abcc-12a5-419e-9559-b3a69c5821af','4fd2dbba-a610-4bc8-89d5-dc6a9c58f1a6','2025-06-02 11:29:24.754','2025-06-02 11:29:24.854'),('0a73f5b7-8bf0-409c-b185-8ba7ca12dead','c164d1c2-6174-4141-b379-8eab79696831','PENDING','de70af33-bb17-41cb-bfc9-53ac4d92a209','Đơn hàng 2 cho user c164d1c2-6174-4141-b379-8eab79696831','9bfd5fb8-7ce0-44aa-8b72-4762a7069c61','2025-06-02 11:29:22.679','2025-06-02 11:29:22.808'),('16fa52d5-e26e-4444-9edb-e62d96798c12','4ce8d640-a5cd-462a-bc95-0df8345c2ad0','SHIPPED','4752fd42-3d5b-4450-9d4f-e4c936f7a046','Đơn hàng 2 cho user 4ce8d640-a5cd-462a-bc95-0df8345c2ad0','279be829-6c8c-4192-87b4-2093467348b1','2025-06-02 11:29:26.295','2025-06-02 11:29:26.393'),('191520bc-36f1-4468-b6c3-54e5ce87fd41','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Kem dưỡng ẩm ban đêm',NULL,'2025-06-02 11:29:41.444','2025-06-02 11:29:41.444'),('1a3323ea-6d75-4cbf-b80b-507eecb3bb26','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Đơn hàng 6 cho user 6782526c-3eef-4e48-ab65-10b11f8e7c8d','208712ed-11dc-4ec9-8705-d1f2a06cd102','2025-06-02 11:29:31.194','2025-06-02 11:29:31.294'),('1ba32c3e-e7e7-4c27-9285-b8529cf3a2e4','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Phấn nước trang điểm',NULL,'2025-06-02 11:30:01.726','2025-06-02 11:30:01.726'),('1d582585-c0d2-4f04-932a-528c6b4f7e7f','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Đơn hàng 6 cho user 99f86c0a-f550-4bb1-a23b-548e63517cbe','ec42afb1-71ee-42f2-be5f-37916db496fb','2025-06-02 11:29:32.667','2025-06-02 11:29:32.766'),('1d70d34d-c2d6-4144-aab8-df8f10e42d53','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Đơn hàng 2 cho user 3c2bb293-860e-4e2a-af4d-45ea1c498008','44082218-4e20-4b68-8dac-cafd80763f5c','2025-06-02 11:29:27.289','2025-06-02 11:29:27.388'),('1fd11485-1157-4821-8ddc-c9a504e64231','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Đơn hàng 4 cho user 2e677649-fd64-4a9d-b892-9f9c136498e5','1d59c7ae-30f3-4854-8de3-19f97442924f','2025-06-02 11:29:29.252','2025-06-02 11:29:29.351'),('20ce0314-b9be-43ea-a490-6b239851d820','58819aa0-5ff7-421e-82bf-f18cde892d22','DELIVERED','daa5de11-e546-4f84-9ac4-fe9420ccce3b','Đơn hàng 6 cho user 58819aa0-5ff7-421e-82bf-f18cde892d22','bf07b840-1f81-457c-aa82-640220e9e4ab','2025-06-02 11:29:34.120','2025-06-02 11:29:34.220'),('216e9a46-6044-4d28-ae47-c28a47b48237','c164d1c2-6174-4141-b379-8eab79696831','PENDING','de70af33-bb17-41cb-bfc9-53ac4d92a209',NULL,'ab421eba-00ea-4826-8edd-f7fc621f526e','2025-06-02 15:22:54.749','2025-06-02 15:22:55.132'),('24546024-a8c3-4776-88c1-78a67c2b6411','4ce8d640-a5cd-462a-bc95-0df8345c2ad0','CANCELLED','4752fd42-3d5b-4450-9d4f-e4c936f7a046','Đơn hàng 3 cho user 4ce8d640-a5cd-462a-bc95-0df8345c2ad0','5718116e-1fb2-4bb7-bffb-a24cfa2e1ea9','2025-06-02 11:29:26.523','2025-06-02 11:29:26.622'),('2482c8ae-2b42-49b6-b813-eefe8e5366fa','c164d1c2-6174-4141-b379-8eab79696831','PENDING','de70af33-bb17-41cb-bfc9-53ac4d92a209',NULL,'c1ac3085-594d-40b1-842f-88619c2cc139','2025-06-02 15:24:14.459','2025-06-02 15:27:09.123'),('264902ce-fb0b-426c-bcb3-547f6bca6add','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Sữa rửa mặt dịu nhẹ',NULL,'2025-06-02 11:29:58.466','2025-06-02 11:29:58.466'),('2669a756-0734-4793-b21c-95f366563c04','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Mascara làm dài mi',NULL,'2025-06-02 11:30:00.599','2025-06-02 11:30:00.599'),('28538253-19c5-42be-960b-227fd18e3919','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Kẻ mắt nước chống thấm',NULL,'2025-06-02 11:29:57.570','2025-06-02 11:29:57.570'),('28ff1adc-aa4b-43ce-b6f5-cd73ad83471e','c164d1c2-6174-4141-b379-8eab79696831','PENDING','de70af33-bb17-41cb-bfc9-53ac4d92a209',NULL,'12df33d6-34a7-462e-97d1-dd3311ef69ae','2025-06-02 15:16:10.177','2025-06-02 15:16:10.639'),('2ed6c960-e7f1-46e5-84f6-a341f69a2615','58819aa0-5ff7-421e-82bf-f18cde892d22','DELIVERED','daa5de11-e546-4f84-9ac4-fe9420ccce3b','Đơn hàng 2 cho user 58819aa0-5ff7-421e-82bf-f18cde892d22','17440c9c-da5e-4c57-bf21-cc47f2be4522','2025-06-02 11:29:33.205','2025-06-02 11:29:33.302'),('2f0fc1b0-52e3-43d2-9344-bb4cc345fe13','4b34abcc-12a5-419e-9559-b3a69c5821af','PENDING','cabdc023-4eb5-4cda-8849-92e7fddcf5f0','Đơn hàng 2 cho user 4b34abcc-12a5-419e-9559-b3a69c5821af','04790c1c-eae7-468b-9c11-8002669773d7','2025-06-02 11:29:24.282','2025-06-02 11:29:24.383'),('2fbea7dc-d5e7-4e01-8185-2a96cb543786','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Đơn hàng 2 cho user 2e677649-fd64-4a9d-b892-9f9c136498e5','627b7189-5db6-44e9-a210-022e0329120a','2025-06-02 11:29:28.792','2025-06-02 11:29:28.893'),('31c5cf76-728e-402a-b09c-273efd0b5af5','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Tẩy trang dạng nước',NULL,'2025-06-02 11:29:49.890','2025-06-02 11:29:49.890'),('328285c5-0ade-4ca4-922b-2eeba5e369f1','58819aa0-5ff7-421e-82bf-f18cde892d22','DELIVERED','daa5de11-e546-4f84-9ac4-fe9420ccce3b','Đơn hàng 1 cho user 58819aa0-5ff7-421e-82bf-f18cde892d22','e0d42ff4-121d-4a63-bd6c-cce91e4b0766','2025-06-02 11:29:32.968','2025-06-02 11:29:33.076'),('3520887d-733a-4640-85fd-69c103141e75','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Gel tẩy tế bào chết',NULL,'2025-06-02 11:29:36.394','2025-06-02 11:29:36.394'),('360b75a0-a32d-4fc9-ad3a-34de4ec6aa6e','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Gel tẩy tế bào chết dịu nhẹ',NULL,'2025-06-02 11:29:52.358','2025-06-02 11:29:52.358'),('37a6a371-faf3-4eef-ba53-cb272406f8ab','395c19be-b9e4-4877-9204-73ee3425fe17','SHIPPED','3a7eae38-7a9d-40e2-9867-8bbcfc68804e','Đơn hàng 3 cho user 395c19be-b9e4-4877-9204-73ee3425fe17','6e3d0b88-7ed9-429b-8da7-866a23f569ea','2025-06-02 11:29:23.740','2025-06-02 11:29:23.838'),('37e5d2ca-b3af-4d23-aa1c-bd765b620f0b','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Xịt khoáng dưỡng ẩm',NULL,'2025-06-02 11:29:45.146','2025-06-02 11:29:45.146'),('3c257b1a-b4ba-4489-b145-921040fd9b9f','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Kem dưỡng ẩm ban đêm',NULL,'2025-06-02 11:29:40.525','2025-06-02 11:29:40.525'),('3f3d49d2-3c6c-4dca-aa27-b4c549eabe67','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Đơn hàng 1 cho user 3c2bb293-860e-4e2a-af4d-45ea1c498008','184ac244-6de2-42b5-9f1a-9e5df611ec98','2025-06-02 11:29:27.058','2025-06-02 11:29:27.156'),('40c379f6-e6d3-4d50-981c-fd2a02d7836b','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Serum vitamin C sáng da',NULL,'2025-06-02 11:29:35.948','2025-06-02 11:29:35.948'),('4138f2a8-42c4-4bdb-9d65-a27e34aeb34e','58819aa0-5ff7-421e-82bf-f18cde892d22','DELIVERED','daa5de11-e546-4f84-9ac4-fe9420ccce3b','Đơn hàng 5 cho user 58819aa0-5ff7-421e-82bf-f18cde892d22','6137390c-6ccf-41df-bca0-eaed50ea1d01','2025-06-02 11:29:33.892','2025-06-02 11:29:33.990'),('42d5f810-9b47-49c1-a7e9-2b18ebdf7e4f','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Toner hoa cúc',NULL,'2025-06-02 11:29:37.762','2025-06-02 11:29:37.762'),('45a74516-8641-4748-b708-d9e0ed5418ff','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Sáp vuốt tóc nam',NULL,'2025-06-02 11:29:56.236','2025-06-02 11:29:56.236'),('467e302e-2b3e-484a-a2c4-b83d791d54e6','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Serum vitamin C sáng da',NULL,'2025-06-02 11:29:34.675','2025-06-02 11:29:34.675'),('47808890-8d85-41b6-8cc6-e14f930cf504','4b34abcc-12a5-419e-9559-b3a69c5821af','PENDING','cabdc023-4eb5-4cda-8849-92e7fddcf5f0','Đơn hàng 1 cho user 4b34abcc-12a5-419e-9559-b3a69c5821af','4d42ff86-4b41-4084-a46d-6972d3da26db','2025-06-02 11:29:24.053','2025-06-02 11:29:24.154'),('4a0d6854-81b2-45b5-819f-4955d15a3d33','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Đơn hàng 5 cho user 2e677649-fd64-4a9d-b892-9f9c136498e5','b74290b8-3bee-49c3-a826-a173093aab05','2025-06-02 11:29:29.488','2025-06-02 11:29:29.585'),('4b38d297-be89-44b1-91ef-9d3b1e2c7b05','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Sữa rửa mặt dịu nhẹ',NULL,'2025-06-02 11:29:59.181','2025-06-02 11:29:59.181'),('51e19a51-7029-41d2-ac1c-6e4682c6e5c5','58819aa0-5ff7-421e-82bf-f18cde892d22','DELIVERED','daa5de11-e546-4f84-9ac4-fe9420ccce3b','Đơn hàng 3 cho user 58819aa0-5ff7-421e-82bf-f18cde892d22','ac3846cd-720d-4271-805e-80ed2b967829','2025-06-02 11:29:33.433','2025-06-02 11:29:33.533'),('53da1df9-6fac-4c66-8c96-efb94962ce13','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Kẻ mắt nước chống thấm',NULL,'2025-06-02 11:29:57.127','2025-06-02 11:29:57.127'),('599fe46a-5c00-4a0a-a9fb-4b73e444d9d9','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Sáp vuốt tóc nam',NULL,'2025-06-02 11:29:55.793','2025-06-02 11:29:55.793'),('5afbe83b-a5e5-4634-a4bb-e2972e87d96f','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Đơn hàng 1 cho user 99f86c0a-f550-4bb1-a23b-548e63517cbe','2f27b0a1-989c-43da-bd05-3bf8d044137e','2025-06-02 11:29:31.503','2025-06-02 11:29:31.600'),('5b3ba8ce-bc83-4d1a-a6fb-88825f306329','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Đơn hàng 5 cho user 6782526c-3eef-4e48-ab65-10b11f8e7c8d','3ed11f32-f3d2-4de6-8dab-9d1f95c7ce06','2025-06-02 11:29:30.966','2025-06-02 11:29:31.063'),('5b7da0e2-71de-4546-b5ea-4a51982d965e','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Đơn hàng 1 cho user 2e677649-fd64-4a9d-b892-9f9c136498e5','8f90ac16-8bc3-49a9-a1f8-48800d16271e','2025-06-02 11:29:28.564','2025-06-02 11:29:28.661'),('5c6cbbf3-5436-44b2-9903-bedade2184de','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Phấn má hồng dạng kem',NULL,'2025-06-02 11:30:02.418','2025-06-02 11:30:02.418'),('5e5e9be6-4e33-462a-bd65-2a1605a1e151','2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','PROCESSING','3238f31d-e467-4875-bb1f-95e0912fe3b1','Đơn hàng 1 cho user 2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','8ae6a7a4-886a-4ca3-8418-d46c91fe818e','2025-06-02 11:29:25.061','2025-06-02 11:29:25.159'),('654ab7e9-cdbe-476c-9b8f-7e3d3c64bcec','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Kem lót nền mịn',NULL,'2025-06-02 11:29:43.782','2025-06-02 11:29:43.782'),('655705f8-f522-4554-880a-52850ae9a323','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Kem nền dạng lỏng',NULL,'2025-06-02 11:29:54.660','2025-06-02 11:29:54.660'),('66be3989-a008-47a6-b9eb-0a5b81375bd5','2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','SHIPPED','3238f31d-e467-4875-bb1f-95e0912fe3b1','Đơn hàng 2 cho user 2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','d4d2c96a-1b37-4535-a24f-ce9d0687c850','2025-06-02 11:29:25.292','2025-06-02 11:29:25.391'),('6756c7b6-50ad-434b-91e5-9b34b02d492f','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Kem lót nền mịn',NULL,'2025-06-02 11:29:44.228','2025-06-02 11:29:44.228'),('6a7bdb15-09c0-4f90-ad3f-68ce4bba7bba','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Serum vitamin C sáng da',NULL,'2025-06-02 11:29:35.500','2025-06-02 11:29:35.500'),('6a9211c2-79a4-4c59-934c-80b5287b25eb','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Kẻ mắt nước chống thấm',NULL,'2025-06-02 11:29:58.025','2025-06-02 11:29:58.025'),('6d21d295-30cf-4304-98c8-bcde1220600a','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Đơn hàng 3 cho user 6782526c-3eef-4e48-ab65-10b11f8e7c8d','2fedcc05-dbe9-4066-bcde-20515ed9ace2','2025-06-02 11:29:30.486','2025-06-02 11:29:30.587'),('6e08eea4-c874-43a9-a9b2-51c2cd114c99','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Kẻ mắt nước chống thấm',NULL,'2025-06-02 11:29:56.678','2025-06-02 11:29:56.678'),('6e5445bc-2c57-4323-ad11-55639842d605','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Đơn hàng 3 cho user 99f86c0a-f550-4bb1-a23b-548e63517cbe','f5211fcd-4312-4fec-afd7-de4e89b326f3','2025-06-02 11:29:31.979','2025-06-02 11:29:32.077'),('6fb29e70-5539-4c3b-a2c9-c8a46aa5b08f','c164d1c2-6174-4141-b379-8eab79696831','SHIPPED','de70af33-bb17-41cb-bfc9-53ac4d92a209','Đơn hàng 3 cho user c164d1c2-6174-4141-b379-8eab79696831','435dc1f9-5b16-4461-8000-4d5cc98afc51','2025-06-02 11:29:22.938','2025-06-02 11:29:23.068'),('74a2d9a5-0f4c-41e0-8c9d-13c05fbfd89e','395c19be-b9e4-4877-9204-73ee3425fe17','CANCELLED','3a7eae38-7a9d-40e2-9867-8bbcfc68804e','Đơn hàng 1 cho user 395c19be-b9e4-4877-9204-73ee3425fe17','bda5025e-ed7f-4546-9dd4-83c66dd364a3','2025-06-02 11:29:23.276','2025-06-02 11:29:23.375'),('7625ac66-942b-4cf5-bdce-9921f53abee4','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Kem mắt giảm quầng thâm',NULL,'2025-06-02 11:29:47.630','2025-06-02 11:29:47.630'),('780027d0-9c90-4f6f-803b-bff98f95d945','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Đơn hàng 4 cho user 3c2bb293-860e-4e2a-af4d-45ea1c498008','3cb9fc27-2f65-4803-9449-0e4966ffd8bf','2025-06-02 11:29:27.753','2025-06-02 11:29:27.863'),('7e61c97b-4647-4362-b4a0-9dc40ab436ed','2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','PROCESSING','3238f31d-e467-4875-bb1f-95e0912fe3b1','Đơn hàng 3 cho user 2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','557a2ee8-ef59-4149-8448-ae3d77e42eeb','2025-06-02 11:29:25.520','2025-06-02 11:29:25.622'),('843c9178-2809-4c2e-87b1-ed94431e1a8c','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Mascara chống lem',NULL,'2025-06-02 11:29:39.831','2025-06-02 11:29:39.831'),('867af521-9010-43de-b043-45999a23209f','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Gel tẩy tế bào chết dịu nhẹ',NULL,'2025-06-02 11:29:52.797','2025-06-02 11:29:52.797'),('8d457dbc-5c66-4a41-91ad-13323c71b76e','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Đơn hàng 4 cho user 6782526c-3eef-4e48-ab65-10b11f8e7c8d','35fbd998-8105-43a0-a445-6d1e3c6e7faa','2025-06-02 11:29:30.719','2025-06-02 11:29:30.828'),('8e147498-10db-47ad-bff3-8bff5b0daf97','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Gel tẩy tế bào chết',NULL,'2025-06-02 11:29:36.839','2025-06-02 11:29:36.839'),('8e67bba7-e5d7-4e36-927f-285b4a14ad92','2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','PENDING','3238f31d-e467-4875-bb1f-95e0912fe3b1','Đơn hàng 4 cho user 2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','c9908eae-1ea6-4e68-ba85-8970ef1dde63','2025-06-02 11:29:25.754','2025-06-02 11:29:25.853'),('8ec10683-f786-4dfc-b66c-32d088708374','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Đơn hàng 4 cho user 99f86c0a-f550-4bb1-a23b-548e63517cbe','90b27a8a-0076-419f-b288-b96b20852500','2025-06-02 11:29:32.207','2025-06-02 11:29:32.306'),('8f43859e-12d8-4ca3-9e06-dc59b962ac38','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Kem chống nắng SPF50',NULL,'2025-06-02 11:29:51.912','2025-06-02 11:29:51.912'),('8fc073a2-95dc-4bf5-8a30-c45231df0de8','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Kem mắt giảm quầng thâm',NULL,'2025-06-02 11:29:48.076','2025-06-02 11:29:48.076'),('90c188d6-c16f-4b92-bdc4-2c0feac6b614','c164d1c2-6174-4141-b379-8eab79696831','SHIPPED','de70af33-bb17-41cb-bfc9-53ac4d92a209','Đơn hàng 1 cho user c164d1c2-6174-4141-b379-8eab79696831','f9ec14bb-be48-46d1-a211-a13593bb0fa6','2025-06-02 11:29:22.213','2025-06-02 11:29:22.413'),('96684e7b-6cfa-43f8-a81f-97c8a247fb7d','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Mascara chống lem',NULL,'2025-06-02 11:29:39.385','2025-06-02 11:29:39.385'),('968a622b-c3df-4032-8098-5358eb4e5fa4','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Phấn phủ kiềm dầu',NULL,'2025-06-02 11:29:42.579','2025-06-02 11:29:42.579'),('97b5f5a0-4b92-4f8b-ae2f-bd0f053cc45f','4ce8d640-a5cd-462a-bc95-0df8345c2ad0','CANCELLED','4752fd42-3d5b-4450-9d4f-e4c936f7a046','Đơn hàng 4 cho user 4ce8d640-a5cd-462a-bc95-0df8345c2ad0','9036f24a-7d78-4149-843c-8c18c99753de','2025-06-02 11:29:26.753','2025-06-02 11:29:26.853'),('9c86302b-c3bc-4eab-ae55-73a2a472169e','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Tẩy trang dạng nước',NULL,'2025-06-02 11:29:49.440','2025-06-02 11:29:49.440'),('a2492858-9035-4fad-81d5-17bc7bae1386','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Đơn hàng 5 cho user 99f86c0a-f550-4bb1-a23b-548e63517cbe','ba51f111-7849-4b32-a7b8-f07317317f70','2025-06-02 11:29:32.438','2025-06-02 11:29:32.537'),('a57a5401-0169-418b-a688-9a69b6c23670','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Đơn hàng 2 cho user 6782526c-3eef-4e48-ab65-10b11f8e7c8d','37162a6e-1a3e-4af0-ad78-ed244fafb812','2025-06-02 11:29:30.249','2025-06-02 11:29:30.351'),('a5f4e8ad-710d-45b1-ba47-7c5591e6469c','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Đơn hàng 3 cho user 2e677649-fd64-4a9d-b892-9f9c136498e5','d5d9c33f-411e-4b12-baa5-93b3441fb585','2025-06-02 11:29:29.021','2025-06-02 11:29:29.119'),('a7089560-b161-4bac-a4a0-b3bb1312c1bc','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Đơn hàng 3 cho user 3c2bb293-860e-4e2a-af4d-45ea1c498008','13f37ef6-d8d5-45f5-878c-5077097d8a2e','2025-06-02 11:29:27.518','2025-06-02 11:29:27.615'),('b191b77d-4075-4519-840a-6f89ecdb066b','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Đơn hàng 6 cho user 2e677649-fd64-4a9d-b892-9f9c136498e5','24c9cd41-b581-4018-9819-a94b1bccaa4e','2025-06-02 11:29:29.716','2025-06-02 11:29:29.816'),('b4c01f2b-3de8-48ac-9d5a-4827d89c641e','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Kem chống nắng SPF50',NULL,'2025-06-02 11:29:51.463','2025-06-02 11:29:51.463'),('b5eba1fd-1bc2-4eeb-bf2e-0fb416b4c68b','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Son môi lì lâu trôi',NULL,'2025-06-02 11:29:46.953','2025-06-02 11:29:46.953'),('bd9b5711-40fa-42e8-8560-89080b5cb40c','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Sáp vuốt tóc nam',NULL,'2025-06-02 11:29:55.343','2025-06-02 11:29:55.343'),('be2a89bc-5b69-4200-aff2-2862f4280ec9','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Phấn phủ kiềm dầu',NULL,'2025-06-02 11:29:41.888','2025-06-02 11:29:41.888'),('bf594390-77da-4a10-be90-74b6b4ec7c2c','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Đơn hàng 2 cho user 99f86c0a-f550-4bb1-a23b-548e63517cbe','b0c62054-5ebf-4cfe-bc45-90765d94f1df','2025-06-02 11:29:31.732','2025-06-02 11:29:31.832'),('c3cbb808-92aa-42ec-8ce6-8b75923068eb','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Đơn hàng 6 cho user 3c2bb293-860e-4e2a-af4d-45ea1c498008','3694dd3a-8909-46dd-9dda-7003c9a1e442','2025-06-02 11:29:28.222','2025-06-02 11:29:28.322'),('c48d0ad1-4dce-412d-af3c-6786e0d71bc7','4b34abcc-12a5-419e-9559-b3a69c5821af','SHIPPED','cabdc023-4eb5-4cda-8849-92e7fddcf5f0','Đơn hàng 3 cho user 4b34abcc-12a5-419e-9559-b3a69c5821af','c0f13ede-7881-49c9-8102-a4ccaeac9198','2025-06-02 11:29:24.515','2025-06-02 11:29:24.623'),('c75eaab4-1c0b-4947-a086-aa7b4ada1e48','4ce8d640-a5cd-462a-bc95-0df8345c2ad0','SHIPPED','4752fd42-3d5b-4450-9d4f-e4c936f7a046','Đơn hàng 1 cho user 4ce8d640-a5cd-462a-bc95-0df8345c2ad0','d0f9f491-7c19-48cb-85dc-580d9db72d51','2025-06-02 11:29:26.057','2025-06-02 11:29:26.155'),('c83fc93f-eff6-44c3-bedd-6fdb8931810d','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Xịt khoáng dưỡng ẩm',NULL,'2025-06-02 11:29:45.824','2025-06-02 11:29:45.824'),('cca0a1e0-9dc8-4a12-bc2e-d19ca69215ad','c164d1c2-6174-4141-b379-8eab79696831','PENDING','de70af33-bb17-41cb-bfc9-53ac4d92a209',NULL,'dd433074-c62b-494f-b4ed-5891fff247e2','2025-06-02 16:39:59.887','2025-06-02 16:43:57.585'),('ccf40b77-05df-41fc-8826-273d951b200a','395c19be-b9e4-4877-9204-73ee3425fe17','DELIVERED','3a7eae38-7a9d-40e2-9867-8bbcfc68804e','Đơn hàng 2 cho user 395c19be-b9e4-4877-9204-73ee3425fe17','77414cd3-46cd-474b-b2b0-f5d9232608b2','2025-06-02 11:29:23.509','2025-06-02 11:29:23.608'),('cea01e5f-8440-4274-b6ca-aa8dded77312','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Xịt khoáng dưỡng ẩm',NULL,'2025-06-02 11:29:44.702','2025-06-02 11:29:44.702'),('d38c24d4-9f17-49bf-a74f-f41d207f772e','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Son môi lì lâu trôi',NULL,'2025-06-02 11:29:46.264','2025-06-02 11:29:46.264'),('d43ce328-e6a5-46de-87b8-526668b1643b','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Kem mắt giảm quầng thâm',NULL,'2025-06-02 11:29:48.517','2025-06-02 11:29:48.517'),('d5b451f2-0d8f-4a5a-ba48-b33cc626b8a0','99f86c0a-f550-4bb1-a23b-548e63517cbe','DELIVERED','1963dbf7-cf72-4f2e-8417-88d855a52c08','Auto order for review - Phấn má hồng dạng kem',NULL,'2025-06-02 11:30:03.533','2025-06-02 11:30:03.533'),('d9887555-c021-497c-b742-2aff6320b9a3','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Đơn hàng 1 cho user 6782526c-3eef-4e48-ab65-10b11f8e7c8d','7155b4a8-a859-4af5-a6cb-44a52cd0a8cc','2025-06-02 11:29:30.017','2025-06-02 11:29:30.115'),('da9afa0a-1ede-4ed9-9dba-8e7b144ee394','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Phấn má hồng dạng kem',NULL,'2025-06-02 11:30:02.856','2025-06-02 11:30:02.856'),('e3dc88fa-2a03-4477-97c2-dda9728eb0eb','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Phấn nước trang điểm',NULL,'2025-06-02 11:30:01.277','2025-06-02 11:30:01.277'),('e9a7c2d1-d47f-4cf2-ad3b-437042ab60ce','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Đơn hàng 5 cho user 3c2bb293-860e-4e2a-af4d-45ea1c498008','0b883886-d642-4f86-941c-1bc9b79e7be9','2025-06-02 11:29:27.993','2025-06-02 11:29:28.091'),('ec338100-8e29-4871-bb40-ae3703da0f5b','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Mascara chống lem',NULL,'2025-06-02 11:29:38.936','2025-06-02 11:29:38.936'),('f5893d06-275e-4ab3-ba60-ba43b0ef5f57','2e677649-fd64-4a9d-b892-9f9c136498e5','DELIVERED','6f59fe9d-d58e-4b4d-8664-d6b36406a4ee','Auto order for review - Kem chống nắng SPF50',NULL,'2025-06-02 11:29:51.021','2025-06-02 11:29:51.021'),('f6f94f98-b498-43e5-aa97-851602df03e1','6782526c-3eef-4e48-ab65-10b11f8e7c8d','DELIVERED','545674b6-3025-4602-9d80-b157c717d0f2','Auto order for review - Kem nền dạng lỏng',NULL,'2025-06-02 11:29:54.213','2025-06-02 11:29:54.213'),('f79daba9-c357-43fe-8719-1bc571e0054b','3c2bb293-860e-4e2a-af4d-45ea1c498008','DELIVERED','1fec7a38-0373-4927-b5de-07cdab16c622','Auto order for review - Kem chống nắng SPF50',NULL,'2025-06-02 11:29:50.575','2025-06-02 11:29:50.575'),('fc5048d1-c17d-4af8-b8c0-76a38b47aff7','58819aa0-5ff7-421e-82bf-f18cde892d22','DELIVERED','daa5de11-e546-4f84-9ac4-fe9420ccce3b','Đơn hàng 4 cho user 58819aa0-5ff7-421e-82bf-f18cde892d22','0935a5ea-90d5-4452-9417-3de7dbceb133','2025-06-02 11:29:33.665','2025-06-02 11:29:33.763');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variantId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `price` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderDetail_orderId_fkey` (`orderId`),
  KEY `OrderDetail_variantId_fkey` (`variantId`),
  CONSTRAINT `OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `OrderDetail_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `cosmeticvariant` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES ('aafb12a9-3ecd-46e7-8185-fe521f789d44','2482c8ae-2b42-49b6-b813-eefe8e5366fa','55b9da9f-4680-4365-94c7-b23fca16c365',5,180000,'2025-06-02 15:24:14.459','2025-06-02 15:24:14.459'),('bd15927b-966f-4681-bc4a-55bf55c1a4de','cca0a1e0-9dc8-4a12-bc2e-d19ca69215ad','6fe07316-d45b-4622-af31-6b4d44ee2296',1,110000,'2025-06-02 16:39:59.887','2025-06-02 16:39:59.887'),('dd98bc80-20c0-4a30-b668-3eed252f1805','cca0a1e0-9dc8-4a12-bc2e-d19ca69215ad','2371a178-d296-4128-ada6-f81f15e03f6f',1,122000,'2025-06-02 16:39:59.887','2025-06-02 16:39:59.887'),('e9a633c6-fe2f-4b86-a94b-c4168f17bb50','216e9a46-6044-4d28-ae47-c28a47b48237','499563ea-5c82-49f5-9ee4-3d33067480a1',6,560000,'2025-06-02 15:22:54.749','2025-06-02 15:22:54.749'),('fa35ef9c-f44f-4424-8215-2a2048306c1f','cca0a1e0-9dc8-4a12-bc2e-d19ca69215ad','8c149ff1-ecb6-4cd1-9caa-a152be54db7f',1,500000,'2025-06-02 16:39:59.887','2025-06-02 16:39:59.887');
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `status` enum('PENDING','COMPLETED','FAILED','CANCELLED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transactionId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES ('04790c1c-eae7-468b-9c11-8002669773d7',400000,'PENDING','CASH',NULL,'2025-06-02 11:29:24.383','2025-06-02 11:29:24.383'),('0935a5ea-90d5-4452-9417-3de7dbceb133',400000,'PENDING','CASH',NULL,'2025-06-02 11:29:33.763','2025-06-02 11:29:33.763'),('0b883886-d642-4f86-941c-1bc9b79e7be9',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:28.091','2025-06-02 11:29:28.091'),('12df33d6-34a7-462e-97d1-dd3311ef69ae',360000,'PENDING','MOMO',NULL,'2025-06-02 15:16:10.639','2025-06-02 15:16:10.639'),('13f37ef6-d8d5-45f5-878c-5077097d8a2e',100000,'PENDING','CASH',NULL,'2025-06-02 11:29:27.615','2025-06-02 11:29:27.615'),('17440c9c-da5e-4c57-bf21-cc47f2be4522',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:33.302','2025-06-02 11:29:33.302'),('184ac244-6de2-42b5-9f1a-9e5df611ec98',700000,'PENDING','CASH',NULL,'2025-06-02 11:29:27.156','2025-06-02 11:29:27.156'),('1d59c7ae-30f3-4854-8de3-19f97442924f',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:29.351','2025-06-02 11:29:29.351'),('208712ed-11dc-4ec9-8705-d1f2a06cd102',400000,'PENDING','CASH',NULL,'2025-06-02 11:29:31.294','2025-06-02 11:29:31.294'),('24c9cd41-b581-4018-9819-a94b1bccaa4e',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:29.816','2025-06-02 11:29:29.816'),('279be829-6c8c-4192-87b4-2093467348b1',800000,'PENDING','CASH',NULL,'2025-06-02 11:29:26.393','2025-06-02 11:29:26.393'),('2f27b0a1-989c-43da-bd05-3bf8d044137e',700000,'PENDING','CASH',NULL,'2025-06-02 11:29:31.600','2025-06-02 11:29:31.600'),('2fedcc05-dbe9-4066-bcde-20515ed9ace2',800000,'PENDING','CASH',NULL,'2025-06-02 11:29:30.587','2025-06-02 11:29:30.587'),('35fbd998-8105-43a0-a445-6d1e3c6e7faa',700000,'PENDING','CASH',NULL,'2025-06-02 11:29:30.828','2025-06-02 11:29:30.828'),('3694dd3a-8909-46dd-9dda-7003c9a1e442',100000,'PENDING','CASH',NULL,'2025-06-02 11:29:28.322','2025-06-02 11:29:28.322'),('37162a6e-1a3e-4af0-ad78-ed244fafb812',500000,'PENDING','CASH',NULL,'2025-06-02 11:29:30.351','2025-06-02 11:29:30.351'),('3cb9fc27-2f65-4803-9449-0e4966ffd8bf',200000,'PENDING','CASH',NULL,'2025-06-02 11:29:27.863','2025-06-02 11:29:27.863'),('3ed11f32-f3d2-4de6-8dab-9d1f95c7ce06',100000,'PENDING','CASH',NULL,'2025-06-02 11:29:31.063','2025-06-02 11:29:31.063'),('435dc1f9-5b16-4461-8000-4d5cc98afc51',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:23.068','2025-06-02 11:29:23.068'),('44082218-4e20-4b68-8dac-cafd80763f5c',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:27.388','2025-06-02 11:29:27.388'),('4d42ff86-4b41-4084-a46d-6972d3da26db',500000,'PENDING','CASH',NULL,'2025-06-02 11:29:24.154','2025-06-02 11:29:24.154'),('4fd2dbba-a610-4bc8-89d5-dc6a9c58f1a6',100000,'PENDING','CASH',NULL,'2025-06-02 11:29:24.854','2025-06-02 11:29:24.854'),('557a2ee8-ef59-4149-8448-ae3d77e42eeb',500000,'PENDING','CASH',NULL,'2025-06-02 11:29:25.622','2025-06-02 11:29:25.622'),('5718116e-1fb2-4bb7-bffb-a24cfa2e1ea9',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:26.622','2025-06-02 11:29:26.622'),('6137390c-6ccf-41df-bca0-eaed50ea1d01',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:33.990','2025-06-02 11:29:33.990'),('627b7189-5db6-44e9-a210-022e0329120a',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:28.893','2025-06-02 11:29:28.893'),('6e3d0b88-7ed9-429b-8da7-866a23f569ea',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:23.838','2025-06-02 11:29:23.838'),('7155b4a8-a859-4af5-a6cb-44a52cd0a8cc',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:30.115','2025-06-02 11:29:30.115'),('77414cd3-46cd-474b-b2b0-f5d9232608b2',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:23.608','2025-06-02 11:29:23.608'),('8ae6a7a4-886a-4ca3-8418-d46c91fe818e',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:25.159','2025-06-02 11:29:25.159'),('8f90ac16-8bc3-49a9-a1f8-48800d16271e',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:28.661','2025-06-02 11:29:28.661'),('9036f24a-7d78-4149-843c-8c18c99753de',400000,'PENDING','CASH',NULL,'2025-06-02 11:29:26.853','2025-06-02 11:29:26.853'),('90b27a8a-0076-419f-b288-b96b20852500',400000,'PENDING','CASH',NULL,'2025-06-02 11:29:32.306','2025-06-02 11:29:32.306'),('9bfd5fb8-7ce0-44aa-8b72-4762a7069c61',100000,'PENDING','CASH',NULL,'2025-06-02 11:29:22.808','2025-06-02 11:29:22.808'),('ab421eba-00ea-4826-8edd-f7fc621f526e',3360000,'PENDING','COD',NULL,'2025-06-02 15:22:55.132','2025-06-02 15:22:55.132'),('ac3846cd-720d-4271-805e-80ed2b967829',500000,'PENDING','CASH',NULL,'2025-06-02 11:29:33.533','2025-06-02 11:29:33.533'),('b0c62054-5ebf-4cfe-bc45-90765d94f1df',100000,'PENDING','CASH',NULL,'2025-06-02 11:29:31.832','2025-06-02 11:29:31.832'),('b74290b8-3bee-49c3-a826-a173093aab05',500000,'PENDING','CASH',NULL,'2025-06-02 11:29:29.585','2025-06-02 11:29:29.585'),('ba51f111-7849-4b32-a7b8-f07317317f70',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:32.537','2025-06-02 11:29:32.537'),('bda5025e-ed7f-4546-9dd4-83c66dd364a3',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:23.375','2025-06-02 11:29:23.375'),('bf07b840-1f81-457c-aa82-640220e9e4ab',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:34.220','2025-06-02 11:29:34.220'),('c0f13ede-7881-49c9-8102-a4ccaeac9198',500000,'PENDING','CASH',NULL,'2025-06-02 11:29:24.623','2025-06-02 11:29:24.623'),('c1ac3085-594d-40b1-842f-88619c2cc139',900000,'COMPLETED','MOMO','3304830627','2025-06-02 15:24:14.851','2025-06-02 15:27:08.755'),('c9908eae-1ea6-4e68-ba85-8970ef1dde63',700000,'PENDING','CASH',NULL,'2025-06-02 11:29:25.853','2025-06-02 11:29:25.853'),('d0f9f491-7c19-48cb-85dc-580d9db72d51',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:26.155','2025-06-02 11:29:26.155'),('d4d2c96a-1b37-4535-a24f-ce9d0687c850',800000,'PENDING','CASH',NULL,'2025-06-02 11:29:25.391','2025-06-02 11:29:25.391'),('d5d9c33f-411e-4b12-baa5-93b3441fb585',200000,'PENDING','CASH',NULL,'2025-06-02 11:29:29.119','2025-06-02 11:29:29.119'),('dd433074-c62b-494f-b4ed-5891fff247e2',732000,'COMPLETED','MOMO','3304830653','2025-06-02 16:40:00.242','2025-06-02 16:43:57.286'),('e0d42ff4-121d-4a63-bd6c-cce91e4b0766',300000,'PENDING','CASH',NULL,'2025-06-02 11:29:33.076','2025-06-02 11:29:33.076'),('ec42afb1-71ee-42f2-be5f-37916db496fb',500000,'PENDING','CASH',NULL,'2025-06-02 11:29:32.766','2025-06-02 11:29:32.766'),('f5211fcd-4312-4fec-afd7-de4e89b326f3',600000,'PENDING','CASH',NULL,'2025-06-02 11:29:32.077','2025-06-02 11:29:32.077'),('f9ec14bb-be48-46d1-a211-a13593bb0fa6',400000,'PENDING','CASH',NULL,'2025-06-02 11:29:22.413','2025-06-02 11:29:22.413');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Post_authorId_fkey` (`authorId`),
  CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES ('79ee4ccb-168d-49bc-ac2e-dd539e70372d','Bí quyết chăm sóc da mùa hè: 5 bước không thể thiếu','Hướng dẫn chi tiết các bước chăm sóc da mùa hè giúp da luôn khỏe mạnh, tươi sáng.','<h2>1. Làm sạch da đúng cách</h2><p>Vào mùa hè, da tiết nhiều dầu và mồ hôi hơn. Hãy sử dụng sữa rửa mặt dịu nhẹ, rửa mặt 2 lần/ngày để loại bỏ bụi bẩn và bã nhờn.</p><h2>2. Tẩy tế bào chết định kỳ</h2><p>Tẩy tế bào chết 1-2 lần/tuần giúp da thông thoáng, hấp thu dưỡng chất tốt hơn.</p><h2>3. Dưỡng ẩm nhẹ nhàng</h2><p>Chọn kem dư<img class=\"YQ4gaf\" style=\"object-position:0% 10%;\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJEfffCjChXH-dlU0mMF8WSj3YboEcvYnI1w&amp;s\" alt=\"Kem chống nắng chuyên dụng cho Golfer SEKKISEI Skincare UV Gel (91ml) - FENW\" width=\"259\" height=\"194\" id=\"dimg_88Q9aJ6dHLvE1e8P8qXSuA4_317\" data-csiid=\"88Q9aJ6dHLvE1e8P8qXSuA4_172\" data-atf=\"4\" data-ilt=\"1748878629974\" data-deferred=\"3\" data-iml=\"1748878629974\">ỡng dạng gel hoặc lotion mỏng nhẹ, <img class=\"YQ4gaf\" style=\"object-position:45% 45%;\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44W0SAM0G3H6mDiAqqukOq7mx0USdO9yolg&amp;s\" alt=\"KEM CHỐNG NẮNG GORGEOUS MÚI XÙ\" width=\"225\" height=\"225\" id=\"dimg_88Q9aJ6dHLvE1e8P8qXSuA4_315\" data-csiid=\"88Q9aJ6dHLvE1e8P8qXSuA4_107\" data-atf=\"4\" data-ilt=\"1748878582516\" data-deferred=\"3\" data-iml=\"1748878582516\">không gây bí da.<img class=\"YQ4gaf\" style=\"object-position:47% 38%;\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSD4jrbKs3T3aGUekARq4zlGFqtY1tI9qSlw&amp;s\" alt=\"Kem Chống Nắng Cica Perfect Sun Cream 60ml\" width=\"225\" height=\"225\" id=\"dimg_88Q9aJ6dHLvE1e8P8qXSuA4_203\" data-csiid=\"88Q9aJ6dHLvE1e8P8qXSuA4_105\" data-atf=\"4\" data-ilt=\"1748878582567\" data-deferred=\"3\" data-iml=\"1748878582567\"></p><h2>4. Chống nắng mỗi ngày</h2><p>Đừng quên thoa kem chống nắng SPF 30+ trước khi ra ngoài 20 phút.</p><h2>5. Bổ sung nước và vitamin</h2><p>Uống đủ nước, ăn nhiều rau xanh, trái cây để da luôn căng mịn.</p><p>&nbsp;</p>','https://localserver.phuongy.works/images/1748878616795_images.jpg','bi-quyet-cham-soc-da-mua-he-5-buoc-khong-the-thieu-cukwi',1,'c164d1c2-6174-4141-b379-8eab79696831','2025-06-02 11:29:00.641','2025-06-02 15:37:13.847'),('7ada0a4a-8e7f-436b-b982-73fcd5b43aec','Top 3 sản phẩm chống nắng hot nhất 2024','Review chi tiết 3 loại kem chống nắng được yêu thích nhất năm nay.','<h2>1. Sunblock Aqua SPF50+</h2><p>Kem chống nắng dạng gel, thấm nhanh, không nhờn rít. Phù hợp mọi loại da.</p><p>&nbsp;</p><h2>2. Daily UV Defense</h2><p>Bảo vệ da tối ưu, bổ sung vitamin E giúp dưỡng ẩm.</p><p><img class=\"YQ4gaf\" style=\"object-position:45% 60%;\" src=\"https://localserver.phuongy.works/images/1748878591050_image.jpeg\" alt=\"Kem chống nắng Defender UV Serum Invisible Fluid L\'Oréal SPF50+ và PA++++  giúp ngăn ngừa lão hóa, đốm nâu (50ml) - Nhà thuốc FPT Long Châu\" width=\"225\" height=\"225\" id=\"dimg_88Q9aJ6dHLvE1e8P8qXSuA4_21\" data-csiid=\"88Q9aJ6dHLvE1e8P8qXSuA4_68\" data-atf=\"4\" uploadprocessed=\"true\"><img class=\"YQ4gaf\" style=\"object-position:50% 44%;\" src=\"https://localserver.phuongy.works/images/1748878599780_image.jpeg\" alt=\"Kem chống nắng dưỡng da Urban Environment Triple Beauty Suncare Emulsion  SPF50+ | SHISEIDO\" width=\"225\" height=\"225\" id=\"dimg_88Q9aJ6dHLvE1e8P8qXSuA4_405\" data-csiid=\"88Q9aJ6dHLvE1e8P8qXSuA4_62\" data-atf=\"4\" uploadprocessed=\"true\"></p><h2>3. Mineral Sunscreen</h2><p>Thành phần khoáng chất tự nhiên, an toàn cho da nhạy cảm.</p><p><img class=\"YQ4gaf\" style=\"object-position:30% 35%;\" src=\"https://localserver.phuongy.works/images/1748878596734_image.jpeg\" alt=\"Kem Chống Nắng Innisfree Long Lasting Cho Da Dầu Màu Trắng Vạch Vàng –  myphamphutho.vn\" width=\"259\" height=\"194\" id=\"dimg_88Q9aJ6dHLvE1e8P8qXSuA4_167\" data-csiid=\"88Q9aJ6dHLvE1e8P8qXSuA4_72\" data-atf=\"4\" uploadprocessed=\"true\"></p>','https://localserver.phuongy.works/images/1748878583049_download.jpg','top-3-san-pham-chong-nang-hot-nhat-2024-zjnjp',1,'395c19be-b9e4-4877-9204-73ee3425fe17','2025-06-02 11:29:00.880','2025-06-02 15:36:42.130'),('94410595-93c5-44d1-a105-9cc4800fc022','Cách chọn mỹ phẩm phù hợp với từng loại da','Hướng dẫn nhận biết loại da và lựa chọn mỹ phẩm phù hợp.','<h2>1. Da dầu</h2><p>Chọn sản phẩm oil-free, kiềm dầu tốt, ưu tiên dạng gel.</p><h2>2. Da khô</h2><p>Ưu tiên kem dưỡng ẩm sâu, chứa hyaluronic acid hoặc ceramide.</p><h2>3. Da nhạy cảm</h2><p>Tránh sản phẩm chứa cồn, hương liệu. Ưu tiên thành phần tự nhiên.</p><figure class=\"image\"><img class=\"YQ4gaf\" style=\"aspect-ratio:225/225;object-position:57% 40%;\" src=\"https://localserver.phuongy.works/images/1748878474559_image.jpeg\" alt=\"Son Kem Lì Lip Blurrism Long-Lasting Matte fmgt The Face Shop ⋆  MyphamTheFaceShop.com\" width=\"225\" height=\"225\" id=\"dimg_eMQ9aLmkMrGE2roPmbqyyQ4_221\" data-csiid=\"eMQ9aLmkMrGE2roPmbqyyQ4_13\" data-atf=\"1\" uploadprocessed=\"true\"></figure><figure class=\"image\"><img class=\"YQ4gaf\" style=\"aspect-ratio:225/225;object-position:center;\" src=\"https://localserver.phuongy.works/images/1748878472936_image.jpeg\" alt=\"Son Romand Juicy Lasting Tint 22\" width=\"225\" height=\"225\" id=\"dimg_eMQ9aLmkMrGE2roPmbqyyQ4_21\" data-csiid=\"eMQ9aLmkMrGE2roPmbqyyQ4_10\" data-atf=\"1\" uploadprocessed=\"true\"></figure>','https://localserver.phuongy.works/images/1748878463590_download.jpg','cach-chon-my-pham-phu-hop-voi-tung-loai-da-crivb',1,'2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','2025-06-02 11:29:01.223','2025-06-02 15:34:39.642'),('9a27d653-93fb-4d5b-9a53-534cbdd02af0','Trang điểm tự nhiên cho nàng công sở','Bí quyết trang điểm nhẹ nhàng, tươi tắn phù hợp môi trường văn phòng.','<h2>1. Lớp nền mỏng nhẹ</h2><p>Sử dụng cushion hoặc foundation dạng lỏng, tán đều bằng mút ẩm.</p><h2>2. Má hồng tự nhiên</h2><p>Chọn màu hồng đào hoặc cam đất, tán nhẹ lên gò má.</p><h2>3. Son môi tươi tắn</h2><p>Ưu tiên son tint hoặc son dưỡng có màu, giúp môi mềm mịn cả ngày.</p><figure class=\"image image_resized\" style=\"width:65.1%;\"><img class=\"YQ4gaf\" style=\"aspect-ratio:290/174;object-position:center;\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCVvmpuPpKSCSD-iU1LAG6ELZl3pIJStq7hw&amp;s\" alt=\"Các bước make up (trang điểm) cơ bản cho nàng xinh đẹp và cuốn hút\" width=\"290\" height=\"174\" id=\"dimg_nsQ9aJ_PKP6l2roPst_ciQM_106\" data-csiid=\"nsQ9aJ_PKP6l2roPst_ciQM_38\" data-atf=\"4\" data-ilt=\"1748878495832\" data-deferred=\"3\" data-iml=\"1748878495832\"><figcaption>&nbsp;</figcaption></figure><p>&nbsp;</p>','https://localserver.phuongy.works/images/1748878502441_images.jpg','trang-iem-tu-nhien-cho-nang-cong-so-vlxrb',1,'4b34abcc-12a5-419e-9559-b3a69c5821af','2025-06-02 11:29:01.052','2025-06-02 16:35:37.312'),('ca30157d-d4a8-458d-8508-d43e65e4e96a','5 thói quen giúp da luôn trẻ đẹp','Những thói quen đơn giản giúp bạn duy trì làn da khỏe mạnh, tươi trẻ.','<ul><li>Ngủ đủ giấc, tránh thức khuya</li><li>Uống đủ 2 lít nước mỗi ngày</li><li>Chăm sóc da đều đặn sáng-tối</li><li>Ăn nhiều rau xanh, trái cây</li><li>Luôn tẩy trang trước khi đi ngủ</li><li>&nbsp;</li></ul><p style=\"text-align:center;\"><img class=\"image_resized YQ4gaf\" style=\"aspect-ratio:259/194;object-position:47% 33%;width:75%;\" src=\"https://localserver.phuongy.works/images/1748878425985_image.jpeg\" alt=\"Review Phấn Phủ Perfect Diary “Chân Ái” Cho Các Nàng Da Dầu\" width=\"259\" height=\"194\" id=\"dimg_0sM9aJ-NCvak2roPx9PVsQ4_303\" data-csiid=\"0sM9aJ-NCvak2roPx9PVsQ4_12\" data-atf=\"1\" uploadprocessed=\"true\"></p>','https://localserver.phuongy.works/images/1748878414155_download.jpg','5-thoi-quen-giup-da-luon-tre-ep-dsdgk',1,'4ce8d640-a5cd-462a-bc95-0df8345c2ad0','2025-06-02 11:29:01.406','2025-06-02 16:33:35.752');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;

--
-- Table structure for table `shippingfeature`
--

DROP TABLE IF EXISTS `shippingfeature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippingfeature` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shippingPolicyId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderIndex` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ShippingFeature_shippingPolicyId_idx` (`shippingPolicyId`),
  CONSTRAINT `ShippingFeature_shippingPolicyId_fkey` FOREIGN KEY (`shippingPolicyId`) REFERENCES `shippingpolicy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippingfeature`
--

/*!40000 ALTER TABLE `shippingfeature` DISABLE KEYS */;
INSERT INTO `shippingfeature` VALUES ('15689689-378e-4b3f-a922-14e345b91e20','shipping-policy-2','Hỗ trợ 24/7','Tư vấn và hỗ trợ mọi lúc','📞',5),('19ad1c1d-a5d9-4207-8b58-3c0d63a454b8','shipping-policy-1','Giao hàng nhanh','3-5 ngày làm việc','🚚',1),('4649053b-50bb-41e4-9b01-ed2876f4819c','shipping-policy-1','Miễn phí vận chuyển','cho đơn hàng từ 500.000₫','💰',2),('4c39e89c-591d-4550-8336-f3e36dfdee6a','shipping-policy-1','Theo dõi đơn hàng','Cập nhật tình trạng theo thời gian thực','📱',4),('7af4cb2a-3c63-498b-9718-66555e512eb1','shipping-policy-2','Giao hàng siêu tốc','1-2 ngày làm việc','⚡',1),('8072fc17-9211-4648-85e9-701ad443337d','shipping-policy-2','Giao hàng COD','Thanh toán khi nhận hàng','💳',3),('8198c4f3-ee05-4294-8760-7f68c7c3dae8','shipping-policy-2','Miễn phí ship','cho đơn hàng từ 300.000₫','🎁',2),('ec10213b-53d0-493d-8b73-5671d7da02ac','shipping-policy-2','Đổi trả miễn phí','trong vòng 7 ngày','↩️',4),('f2abae98-690d-4a2c-bec9-87b3a7426d6d','shipping-policy-1','Đóng gói cẩn thận','Bảo vệ sản phẩm trong quá trình vận chuyển','📦',3);
/*!40000 ALTER TABLE `shippingfeature` ENABLE KEYS */;

--
-- Table structure for table `shippingpolicy`
--

DROP TABLE IF EXISTS `shippingpolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippingpolicy` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `deliveryTime` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `freeShippingThreshold` double DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippingpolicy`
--

/*!40000 ALTER TABLE `shippingpolicy` DISABLE KEYS */;
INSERT INTO `shippingpolicy` VALUES ('shipping-policy-1','Chính sách giao hàng tiêu chuẩn','Chính sách giao hàng tiêu chuẩn cho các sản phẩm chăm sóc da','3-5 ngày làm việc',500000,1,'2025-06-02 11:29:05.351','2025-06-02 11:29:05.351'),('shipping-policy-2','Chính sách giao hàng cao cấp','Chính sách giao hàng cao cấp cho các sản phẩm makeup và skincare','1-2 ngày làm việc',300000,1,'2025-06-02 11:29:05.682','2025-06-02 11:29:05.682');
/*!40000 ALTER TABLE `shippingpolicy` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `googleId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleEmail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secretKey` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','INACTIVE','BANNED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_googleId_key` (`googleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2a3d9e5b-4c5f-4d6c-bcc8-d2f249610e21','nguyễnvănd@example.com','$2b$10$8TVT.ovt6maAnDhyC5xFDOe1n0Nmp2uV3v5y47ADxLdDjrJp.BXiO','Nguyễn Văn D',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:28:58.979','2025-06-02 11:28:58.979'),('2e677649-fd64-4a9d-b892-9f9c136498e5','lêvăng@example.com','$2b$10$ut63CR3gv7sqejcXWnxg6OYibKjx6SrrPsGaRbzv1bT3XtLewpHJO','Lê Văn G',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:28:59.712','2025-06-02 11:28:59.712'),('395c19be-b9e4-4877-9204-73ee3425fe17','nguyễnvănb@example.com','$2b$10$Wdqv89whyjaRohg1UJOxZuS8lM.ye47zTZ2ljSQIkOLMyHKMIcmJC','Nguyễn Văn B',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:28:58.518','2025-06-02 11:28:58.518'),('3c2bb293-860e-4e2a-af4d-45ea1c498008','trầnthịf@example.com','$2b$10$UepeeFj3e/p5RkLw2Cti7.oTEeTVpaQ68TQpOnx8TFvPK82JGF0hq','Trần Thị F',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:28:59.477','2025-06-02 11:28:59.477'),('4b34abcc-12a5-419e-9559-b3a69c5821af','nguyễnvănc@example.com','$2b$10$2jFbCRQrXGE/WvV52jJjPOfFk1UxhTb1Ny7RlL/tPJSMR6hTl7s9W','Nguyễn Văn C',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:28:58.746','2025-06-02 11:28:58.746'),('4ce8d640-a5cd-462a-bc95-0df8345c2ad0','nguyễnvăne@example.com','$2b$10$7adRg6RYBirbGkcON78pC.pLNX5Ik2YnKn7bh2ngxiTH9llO3GWni','Nguyễn Văn E',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:28:59.229','2025-06-02 11:28:59.229'),('58819aa0-5ff7-421e-82bf-f18cde892d22','đặngthịk@example.com','$2b$10$Dqy4jSoJG9SW1zSLM2YVvuuoXQjCJG1dQ9rks6anSWGcWiXKocjeu','Đặng Thị K',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:29:00.403','2025-06-02 11:29:00.403'),('64eaa3a9-bd60-445a-a1b8-142579f160be','admin2@phuongy.works','$2b$10$LG7.Wfes5ACmrOXIUsgFN.CafPMdYxokdkB2oI.r7W1aoOkZ6ie0m','Admin Seed 2',NULL,'admin',NULL,NULL,NULL,'admin-secret-key','ACTIVE','2025-06-02 11:28:57.954','2025-06-02 11:28:57.954'),('6782526c-3eef-4e48-ab65-10b11f8e7c8d','phạmthịh@example.com','$2b$10$kwUqavtpQjaqzEZCi4Yvd.bEN5lt8w0x56XZ0WXqhX/t/5PHwsFUe','Phạm Thị H',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:28:59.944','2025-06-02 11:28:59.944'),('99f86c0a-f550-4bb1-a23b-548e63517cbe','vũvăni@example.com','$2b$10$YTNPxSfZ6f5ET17wXlaHAe70KORyPH1YhiCGU4lYtiaDHwERoFdgy','Vũ Văn I',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:29:00.174','2025-06-02 11:29:00.174'),('c164d1c2-6174-4141-b379-8eab79696831','nguyễnvăna@example.com','$2b$10$IQ4RLwL8arP374BzlXw3x.6LxpjVgu.8kt3NveaV3/hvY0gzhxahi','Nguyễn Văn A',NULL,'user',NULL,NULL,NULL,'user-secret-key','ACTIVE','2025-06-02 11:28:58.286','2025-06-02 11:28:58.286'),('d7797405-02c1-4c6a-a59c-93b1a337f14f','admin@phuongy.works','$2b$10$A.WiQDNHjNIN6YwySkSBteTbyvledxrirzT1ExZ8CvqB1ArL8g7Ky','System Administrator',NULL,'admin',NULL,NULL,NULL,'21b46047a6fa7ab2e65fe316fb974826783f2583b8db9ef00acd90c845dcff18','ACTIVE','2025-06-02 11:30:23.577','2025-06-02 11:30:23.577');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

--
-- Dumping routines for database 'shopmypham'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03  8:30:26
