-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2022 at 09:40 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mikro`
--

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

CREATE TABLE `attribute` (
  `a_category_id` int(11) NOT NULL,
  `a_id` int(11) NOT NULL,
  `a_name` varchar(50) NOT NULL,
  `charge` float DEFAULT 0,
  `availability` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attribute`
--

INSERT INTO `attribute` (`a_category_id`, `a_id`, `a_name`, `charge`, `availability`) VALUES
(4, 15, 'Yes', 0, 1),
(5, 16, 'Ketchup', 0, 1),
(5, 17, 'Chili', 0, 1),
(5, 18, 'Garlic aioli', 0, 1),
(5, 19, 'Honey mustard', 0, 1),
(7, 21, 'Medium', 0, 1),
(7, 22, 'Large', 2, 1),
(8, 23, 'Medium', 0, 1),
(8, 24, 'Large', 2, 1),
(9, 25, 'Medium', 0, 1),
(9, 26, 'Large', 1, 1),
(10, 27, 'Apple', 0, 1),
(10, 28, 'Orange', 0, 1),
(10, 29, 'Watermelon', 0, 1),
(10, 30, 'Mango', 0, 1),
(10, 31, 'Pineapple', 0, 1),
(1, 83, 'Sesame bun', 0, 1),
(1, 84, 'Charcoal bun', 0, 1),
(6, 85, 'Yes', 0, 1),
(2, 98, 'Handcut fries -medium', 5, 1),
(2, 99, 'Handcut fries - large', 7, 1),
(2, 100, 'Mashed Russet -medium', 7, 1),
(2, 101, 'Mashed Russet -large', 9, 1),
(2, 102, 'Nachos & Salsa -medium', 4, 1),
(2, 103, 'Nachos & Salsa -large', 5, 1),
(3, 110, 'Coke', 3, 1),
(3, 111, 'Coke Zero', 3, 1),
(3, 112, 'Sprite', 3, 1),
(3, 113, 'Fanta Orange', 3, 1),
(3, 114, 'Fanta Grape', 3, 1),
(3, 115, 'Minute Maid Orange', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `attribute_category`
--

CREATE TABLE `attribute_category` (
  `shop_id` int(11) NOT NULL DEFAULT 1,
  `a_category_id` int(11) NOT NULL,
  `a_category_name` varchar(30) NOT NULL,
  `note` varchar(50) DEFAULT NULL,
  `optional` tinyint(1) NOT NULL,
  `minimum` int(11) NOT NULL,
  `maximum` int(11) NOT NULL,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `availability` tinyint(1) NOT NULL,
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`products`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attribute_category`
--

INSERT INTO `attribute_category` (`shop_id`, `a_category_id`, `a_category_name`, `note`, `optional`, `minimum`, `maximum`, `attributes`, `availability`, `products`) VALUES
(1, 1, 'Burger buns', 'bun types for burgers', 0, 1, 1, '[84,83]', 1, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]'),
(1, 2, 'Sides', 'sides for burgers', 1, 0, 1, '[98,99,100,101,102,103]', 1, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]'),
(1, 3, 'Soft drinks', 'soft drink choices', 1, 0, 0, '[110,112,111,113,114,115]', 1, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,25]'),
(1, 4, 'Cutlery', 'cutlery for burgers', 1, 0, 1, '[15]', 1, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]'),
(1, 5, 'Sauce', 'sauce for fries', 1, 0, 1, '[16,17,18,19]', 1, '[17]'),
(1, 6, 'Straw', 'straw for drinks', 1, 0, 1, '[85]', 1, '[20,21,22,23,24,25]'),
(1, 7, 'Size', 'alacarte fries size', 0, 1, 1, '[21,22]', 1, '[17]'),
(1, 8, 'Size', 'alacarte mashed size', 0, 1, 1, '[23,24]', 1, '[18]'),
(1, 9, 'Size', 'alacarte nachos size', 0, 1, 1, '[25,26]', 1, '[19]'),
(1, 10, 'Fruit', 'fruit juice type', 0, 1, 1, '[27,28,29,30,31]', 1, '[24]');

-- --------------------------------------------------------

--
-- Table structure for table `customer_order`
--

CREATE TABLE `customer_order` (
  `order_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `customer_info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`customer_info`)),
  `delivery_method` varchar(20) NOT NULL,
  `order_method` varchar(20) NOT NULL,
  `schedule` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `payment_method` varchar(20) NOT NULL,
  `total_price` float NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'requesting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_order`
--

INSERT INTO `customer_order` (`order_id`, `shop_id`, `customer_info`, `delivery_method`, `order_method`, `schedule`, `date`, `time`, `items`, `payment_method`, `total_price`, `status`) VALUES
(41, 1, '{\"name\":\"Kai En Lee\",\"email\":\"leekaien1111@gmail.com\",\"phone\":\"0169499422\",\"address\":\"bukitbintang\",\"postcode\":\"50000\"}', 'delivery', 'ordernow', 'NULL', '2022-05-03', '21:49:36', '[{\"product\":{\"shop_id\":1,\"product_id\":1,\"product_name\":\"Classic Beef\",\"product_image\":5,\"product_description\":\"The Classic. Simply delicious.\",\"price\":17.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_classic.jpg?alt=media&token=f8cfb8f1-56d6-4a9a-b0b9-078b73d76c94\",\"price\":17.9,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":1,\"name\":\"Charcoal bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]}]', 'cash', 17.9, 'complete'),
(42, 1, '{\"name\":\"Kai En Lee\",\"email\":\"leekaien1111@gmail.com\",\"phone\":\"0169499422\",\"address\":\"no 15, jalan tu 28, taman tasik utama, 75450, ayer keroh, melaka\",\"postcode\":\"50000\"}', 'delivery', 'preorder', '{\"date\":\"2022-05-06\",\"time\":\"11:00\"}', '2022-05-03', '22:12:49', '[{\"product\":{\"shop_id\":1,\"product_id\":1,\"product_name\":\"Classic Beef\",\"product_image\":5,\"product_description\":\"The Classic. Simply delicious.\",\"price\":17.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_classic.jpg?alt=media&token=f8cfb8f1-56d6-4a9a-b0b9-078b73d76c94\",\"price\":17.9,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":1,\"name\":\"Charcoal bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]},{\"product\":{\"shop_id\":1,\"product_id\":2,\"product_name\":\"Double Beef\",\"product_image\":6,\"product_description\":\"Double the beef. Double the fun.\",\"price\":19.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_double.jpg?alt=media&token=a0a5b7cd-3a45-438b-98ba-027f2492d749\",\"price\":19.9,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":2,\"name\":\"Sesame bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]},{\"product\":{\"shop_id\":1,\"product_id\":19,\"product_name\":\"Nachos & Salsa\",\"product_image\":25,\"product_description\":\"Baked nachos with fresh salsa\",\"price\":4,\"product_attribute\":\"[9]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fsalsa_nachos.jpg?alt=media&token=d425e8e1-0ff6-4b13-a6dd-fa9b273723bf\",\"price\":5,\"quantity\":1,\"selections\":[{\"id\":9,\"name\":\"Size\",\"selection\":[{\"id\":26,\"name\":\"Large\"}]}]},{\"product\":{\"shop_id\":1,\"product_id\":23,\"product_name\":\"Mixberry Milkshake\",\"product_image\":21,\"product_description\":\"Made with fresh frozen berries and a touch of greek yogurt\",\"price\":14.9,\"product_attribute\":\"[6]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fmilkshake_mixberry.jpg?alt=media&token=5da41230-463c-4697-8bb0-54945487\",\"price\":29.8,\"quantity\":2,\"selections\":[{\"id\":6,\"name\":\"Straw\",\"selection\":[{\"id\":20,\"name\":\"Yes\"}]}]}]', 'cash', 72.6, 'cancelled'),
(43, 1, '{\"name\":\"Kai En Lee\",\"email\":\"leekaien1111@gmail.com\",\"phone\":\"0169499422\",\"address\":\"\",\"postcode\":\"\"}', 'pickup', 'preorder', '{\"date\":\"2022-05-04\",\"time\":\"20:00\"}', '2022-05-03', '22:14:13', '[{\"product\":{\"shop_id\":1,\"product_id\":15,\"product_name\":\"Ume Kakiage \",\"product_image\":19,\"product_description\":\"Vege tempura burger with homemade ume plum sauce\",\"price\":15.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fkakiage_san.jpg?alt=media&token=4d30b285-d07b-4f97-a60f-9942dca57579\",\"price\":15.9,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":1,\"name\":\"Charcoal bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]},{\"product\":{\"shop_id\":1,\"product_id\":17,\"product_name\":\"Handcut Fries\",\"product_image\":17,\"product_description\":\"Handcut triple fried russet potato fries\",\"price\":5,\"product_attribute\":\"[5,7]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fhandcut_fries.jpg?alt=media&token=53fc96e1-f07d-4c82-b172-72744a070847\",\"price\":7,\"quantity\":1,\"selections\":[{\"id\":5,\"name\":\"Sauce\",\"selection\":[{\"id\":18,\"name\":\"Garlic aioli\"}]},{\"id\":7,\"name\":\"Size\",\"selection\":[{\"id\":22,\"name\":\"Large\"}]}]},{\"product\":{\"shop_id\":1,\"product_id\":24,\"product_name\":\"Fresh Juice\",\"product_image\":18,\"product_description\":\"Choose from a variety of fruit\",\"price\":7.9,\"product_attribute\":\"[10,6]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fjuice.jpg?alt=media&token=a6b19206-9949-4f6a-9353-f660954ee818\",\"price\":7.9,\"quantity\":1,\"selections\":[{\"id\":6,\"name\":\"Straw\",\"selection\":[]},{\"id\":10,\"name\":\"Fruit\",\"selection\":[{\"id\":29,\"name\":\"Watermelon\"}]}]},{\"product\":{\"shop_id\":1,\"product_id\":14,\"product_name\":\"Feta Shroom\",\"product_image\":16,\"product_description\":\"Portobello mushroom burger served with greek feta cheese\",\"price\":18.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Ffeta_shroom.jpg?alt=media&token=c03fadf8-d3be-4208-bada-2024c25df9df\",\"price\":22.9,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":1,\"name\":\"Charcoal bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[{\"id\":7,\"name\":\"Nachos & Salsa -medium\"}]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]}]', 'cash', 53.7, 'complete'),
(44, 1, '{\"name\":\"Kai En Lee\",\"email\":\"leekaien11112@gmail.com\",\"phone\":\"0169499422\",\"address\":\"\",\"postcode\":\"\"}', 'pickup', 'ordernow', 'NULL', '2022-05-03', '22:14:47', '[{\"product\":{\"shop_id\":1,\"product_id\":2,\"product_name\":\"Double Beef\",\"product_image\":6,\"product_description\":\"Double the beef. Double the fun.\",\"price\":19.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_double.jpg?alt=media&token=a0a5b7cd-3a45-438b-98ba-027f2492d749\",\"price\":24.9,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":1,\"name\":\"Charcoal bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[{\"id\":3,\"name\":\"Handcut fries -medium\"}]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]}]', 'cash', 24.9, 'pending'),
(45, 1, '{\"name\":\"Kai En Lee\",\"email\":\"caleblee@gmail.com\",\"phone\":\"0169499422\",\"address\":\"mlk\",\"postcode\":\"42000\"}', 'delivery', 'ordernow', 'NULL', '2022-05-03', '22:15:53', '[{\"product\":{\"shop_id\":1,\"product_id\":10,\"product_name\":\"Lemongrass Chicken\",\"product_image\":15,\"product_description\":\"Vietnamese lemongrass chicken served between buns\",\"price\":15.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fchicken-lemongrass.jpg?alt=media&token=b1449f4b-fbf5-4dd3-ba6a-5437867e\",\"price\":22.9,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":1,\"name\":\"Charcoal bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[{\"id\":4,\"name\":\"Handcut fries - large\"}]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]},{\"product\":{\"shop_id\":1,\"product_id\":11,\"product_name\":\"Biggies Chicken\",\"product_image\":12,\"product_description\":\"Eastcoast chicken sandwhich inspired by Biggies \\\"Juicy\\\"\",\"price\":15.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fchicken_biggie.jpg?alt=media&token=dd05c22b-6cfa-4daa-9035-031ef97d8eb5\",\"price\":28.4,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":2,\"name\":\"Sesame bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[{\"id\":6,\"name\":\"Mashed Russet -large\"}]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[{\"id\":10,\"name\":\"Coke Zero\"}]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]},{\"product\":{\"shop_id\":1,\"product_id\":18,\"product_name\":\"Mashed Russet\",\"product_image\":24,\"product_description\":\"Cheesy mashed russet potato with beef fat gravy\",\"price\":7,\"product_attribute\":\"[8]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Frusset_mashed.jpg?alt=media&token=87617bac-cc66-4bba-b89c-a16d6697e511\",\"price\":9,\"quantity\":1,\"selections\":[{\"id\":8,\"name\":\"Size\",\"selection\":[{\"id\":24,\"name\":\"Large\"}]}]}]', 'cash', 60.3, 'complete'),
(46, 1, '{\"name\":\"Kai En Lee\",\"email\":\"leekaien1111@gmail.com\",\"phone\":\"0169499422\",\"address\":\"bukitbintang\",\"postcode\":\"50000\"}', 'delivery', 'ordernow', 'NULL', '2022-05-04', '12:47:15', '[{\"product\":{\"shop_id\":1,\"product_id\":1,\"product_name\":\"Classic Beef\",\"product_image\":5,\"product_description\":\"The Classic. Simply delicious.\",\"price\":17.9,\"product_attribute\":\"[1,2,3,4]\",\"availability\":1},\"image\":\"https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_classic.jpg?alt=media&token=f8cfb8f1-56d6-4a9a-b0b9-078b73d76c94\",\"price\":17.9,\"quantity\":1,\"selections\":[{\"id\":1,\"name\":\"Burger buns\",\"selection\":[{\"id\":1,\"name\":\"Charcoal bun\"}]},{\"id\":2,\"name\":\"Sides\",\"selection\":[]},{\"id\":3,\"name\":\"Soft drinks\",\"selection\":[]},{\"id\":4,\"name\":\"Cutlery\",\"selection\":[]}]}]', 'cash', 17.9, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_area`
--

CREATE TABLE `delivery_area` (
  `shop_id` int(11) NOT NULL,
  `da_id` int(11) NOT NULL,
  `whole_malaysia` tinyint(1) NOT NULL,
  `area` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`area`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery_area`
--

INSERT INTO `delivery_area` (`shop_id`, `da_id`, `whole_malaysia`, `area`) VALUES
(1, 1, 0, '{\"area\": [{\"state\": \"Selangor\", \"city\": [\"Ampang\",\"Batang Berjuntai\",\"Batang Kali\",\"Cheras\",\"Cyberjaya\",\"Dengkil\",\"Hulu Langat\",\"Kerling\",\"Klang\",\"Klia\",\"Kuala Selangor\",\"Pelabuhan Klang\",\"Petaling Jaya\",\"Puchong\",\"Pulau Carey\",\"Pulau Indah\",\"Pulau Ketam\",\"Rasa\",\"Rawang\",\"Sepang\",\"Serdang\",\"Serendah\",\"Seri Kembangan\",\"Shah Alam\",\"Subang Airport\",\"Subang Jaya\",\"Sungai Buloh\"]},{\"state\": \"Wp Kuala Lumpur\",\"city\": [\"Kuala Lumpur\",\"Setapak\"]}]}\r\n'),
(10, 4, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_mode`
--

CREATE TABLE `delivery_mode` (
  `shop_id` int(11) NOT NULL,
  `dm_id` int(11) NOT NULL,
  `delivery` tinyint(1) NOT NULL,
  `delivery_time` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `pickup` tinyint(1) NOT NULL,
  `pickup_time` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery_mode`
--

INSERT INTO `delivery_mode` (`shop_id`, `dm_id`, `delivery`, `delivery_time`, `pickup`, `pickup_time`) VALUES
(1, 1, 1, '{\"estimate\":{\"type\":\"minutes\",\"value\":30}}', 0, '{\"estimate\":{\"type\":\"minutes\",\"value\":30}}'),
(10, 4, 0, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `image_id` int(11) NOT NULL,
  `image_link` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`image_id`, `image_link`) VALUES
(1, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2FLogo.PNG?alt=media&token=8dc2ab7e-b07b-401d-a8e6-cc4d9c9e64d5'),
(2, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_beefy.jpg?alt=media&token=2154a7a2-2d2f-49fc-aea3-0705899ee5cb'),
(3, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_beefy.jpg?alt=media&token=2154a7a2-2d2f-49fc-aea3-0705899ee5cb'),
(4, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_brunch.jpg?alt=media&token=4e00f884-7978-4742-9754-e878884ba72f'),
(5, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_classic.jpg?alt=media&token=f8cfb8f1-56d6-4a9a-b0b9-078b73d76c94'),
(6, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_double.jpg?alt=media&token=a0a5b7cd-3a45-438b-98ba-027f2492d749'),
(7, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_jewel.jpg?alt=media&token=6a95c6af-d413-401b-a6e2-51505d77900a'),
(8, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_ohana.jpg?alt=media&token=425139dd-ac18-4be3-b4f9-a0d351fcc0c4'),
(9, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_pbj.jpg?alt=media&token=ffdcff81-2d0b-47ac-8350-f2fcd6599662'),
(10, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_swede.jpg?alt=media&token=a2674ebc-75ae-4071-a7d5-a55b7ca10407'),
(11, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fbeef_truffled.jpg?alt=media&token=684026e3-27d0-4297-940b-d6dfc3717bb5'),
(12, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fchicken_biggie.jpg?alt=media&token=dd05c22b-6cfa-4daa-9035-031ef97d8eb5'),
(13, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fchicken_maui.jpg?alt=media&token=c1fa3629-a571-4d25-8c8d-7dc2d76c6e76'),
(14, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fchicken_pesto.jpg?alt=media&token=d4cf470f-a62c-4c7e-88dd-48f7c4a3d766'),
(15, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fchicken-lemongrass.jpg?alt=media&token=b1449f4b-fbf5-4dd3-ba6a-5437867e'),
(16, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Ffeta_shroom.jpg?alt=media&token=c03fadf8-d3be-4208-bada-2024c25df9df'),
(17, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fhandcut_fries.jpg?alt=media&token=53fc96e1-f07d-4c82-b172-72744a070847'),
(18, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fjuice.jpg?alt=media&token=a6b19206-9949-4f6a-9353-f660954ee818'),
(19, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fkakiage_san.jpg?alt=media&token=4d30b285-d07b-4f97-a60f-9942dca57579'),
(20, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fmilkshake_choco.jpg?alt=media&token=06ac2ecb-7519-4840-972a-d5d8a97e26c'),
(21, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fmilkshake_mixberry.jpg?alt=media&token=5da41230-463c-4697-8bb0-54945487'),
(22, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fmilkshake_strawberrycookie.jpg?alt=media&token=4a181701-dc6f-4916-814c-'),
(23, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fmilkshake_vanilla.jpg?alt=media&token=ee15e1c2-6897-4d1c-af34-31f5610cd'),
(24, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Frusset_mashed.jpg?alt=media&token=87617bac-cc66-4bba-b89c-a16d6697e511'),
(25, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fsalsa_nachos.jpg?alt=media&token=d425e8e1-0ff6-4b13-a6dd-fa9b273723bf'),
(26, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fsoda.jpg?alt=media&token=f1bd64f9-3950-4eb1-94fb-e5daf20d24cd'),
(27, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/images%2Fswiss_tofu.jpg?alt=media&token=b138eda3-9240-4111-a011-9cbc0a378c2a'),
(47, 'https://firebasestorage.googleapis.com/v0/b/mikro-77e1f.appspot.com/o/f5a6da86-720c-49f1-b977-b212817fa50d.jpg?alt=media&token=d0a0d25d-f44b-470b-99dd');

-- --------------------------------------------------------

--
-- Table structure for table `operating_hours`
--

CREATE TABLE `operating_hours` (
  `shop_id` int(11) NOT NULL,
  `oh_id` int(11) NOT NULL,
  `mon` tinyint(1) NOT NULL,
  `mon_open` time DEFAULT NULL,
  `mon_close` time DEFAULT NULL,
  `tues` tinyint(1) NOT NULL,
  `tues_open` time DEFAULT NULL,
  `tues_close` time DEFAULT NULL,
  `wed` tinyint(1) NOT NULL,
  `wed_open` time DEFAULT NULL,
  `wed_close` time DEFAULT NULL,
  `thur` tinyint(1) NOT NULL,
  `thur_open` time DEFAULT NULL,
  `thur_close` time DEFAULT NULL,
  `fri` tinyint(1) NOT NULL,
  `fri_open` time DEFAULT NULL,
  `fri_close` time DEFAULT NULL,
  `sat` tinyint(1) NOT NULL,
  `sat_open` time DEFAULT NULL,
  `sat_close` time DEFAULT NULL,
  `sun` tinyint(1) NOT NULL,
  `sun_open` time DEFAULT NULL,
  `sun_close` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operating_hours`
--

INSERT INTO `operating_hours` (`shop_id`, `oh_id`, `mon`, `mon_open`, `mon_close`, `tues`, `tues_open`, `tues_close`, `wed`, `wed_open`, `wed_close`, `thur`, `thur_open`, `thur_close`, `fri`, `fri_open`, `fri_close`, `sat`, `sat_open`, `sat_close`, `sun`, `sun_open`, `sun_close`) VALUES
(1, 1, 0, NULL, NULL, 1, '11:00:00', '22:00:00', 1, '11:00:00', '22:00:00', 1, '11:00:00', '22:00:00', 1, '11:00:00', '22:00:00', 1, '09:00:00', '23:00:00', 1, '09:00:00', '23:00:00'),
(10, 5, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_mode`
--

CREATE TABLE `order_mode` (
  `shop_id` int(11) NOT NULL,
  `om_id` int(11) NOT NULL,
  `order_now` tinyint(1) NOT NULL DEFAULT 0,
  `preorder` tinyint(1) DEFAULT 0,
  `preorder_option` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_mode`
--

INSERT INTO `order_mode` (`shop_id`, `om_id`, `order_now`, `preorder`, `preorder_option`) VALUES
(1, 2, 1, 0, '{\"option\":[{\"date\":\"2022-05-05\",\"day\":\"thu\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Fri\",\"date\":\"2022-05-06\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Sat\",\"date\":\"2022-05-07\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Sun\",\"date\":\"2022-05-08\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Tue\",\"date\":\"2022-05-10\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Wed\",\"date\":\"2022-05-11\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Thu\",\"date\":\"2022-05-12\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Fri\",\"date\":\"2022-05-13\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Sat\",\"date\":\"2022-05-14\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Sun\",\"date\":\"2022-05-15\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Tue\",\"date\":\"2022-05-17\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Wed\",\"date\":\"2022-05-18\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Thu\",\"date\":\"2022-05-19\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Fri\",\"date\":\"2022-05-20\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Sat\",\"date\":\"2022-05-21\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Sun\",\"date\":\"2022-05-22\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Tue\",\"date\":\"2022-05-24\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Wed\",\"date\":\"2022-05-25\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Thu\",\"date\":\"2022-05-26\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Fri\",\"date\":\"2022-05-27\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Sat\",\"date\":\"2022-05-28\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Sun\",\"date\":\"2022-05-29\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"day\":\"Tue\",\"date\":\"2022-05-31\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]},{\"date\":\"2022-06-01\",\"day\":\"wed\",\"time\":[\"11:00\",\"13:00\",\"15:00\",\"17:00\",\"20:00\"]}]}'),
(10, 4, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `shop_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `product_image` int(11) DEFAULT NULL,
  `product_description` varchar(100) DEFAULT NULL,
  `price` float NOT NULL,
  `product_attribute` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `availability` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`shop_id`, `product_id`, `product_name`, `product_image`, `product_description`, `price`, `product_attribute`, `availability`) VALUES
(1, 1, 'Classic Beef', 5, 'The Classic. Simply delicious.', 17.9, '[1,2,3,4]', 1),
(1, 2, 'Double Beef', 6, 'Double the beef. Double the fun.', 19.9, '[1,2,3,4]', 1),
(1, 3, 'Beefy Beef', 2, 'The Beefiest beef burger in town.', 19.9, '[1,2,3,4]', 1),
(1, 4, 'Brunch Beef', 4, 'The full english breakfast experience, in one bite.', 17.9, '[1,2,3,4]', 1),
(1, 5, 'Jewel Beef', 7, 'American southern barbeque served between buns.', 21.9, '[1,2,3,4]', 1),
(1, 6, 'PB&J Beef', 9, 'PB&J, Beef and Cheese?!', 19.9, '[1,2,3,4]', 1),
(1, 7, 'Ohana Beef', 8, 'Hawaiian burger with Havarti cheese', 19.9, '[1,2,3,4]', 1),
(1, 8, 'Truffled Beef', 11, 'Truffle oil infused beef katsu burger', 27.9, '[1,2,3,4]', 1),
(1, 9, 'Swedish Beef', 10, 'The köttbulle burger aka the meatball burger', 22.9, '[1,2,3,4]', 1),
(1, 10, 'Lemongrass Chicken', 15, 'Vietnamese lemongrass chicken served between buns', 15.9, '[1,2,3,4]', 1),
(1, 11, 'Biggies Chicken', 12, 'Eastcoast chicken sandwhich inspired by Biggies \"Juicy\"', 15.9, '[1,2,3,4]', 1),
(1, 12, 'Maui Chicken', 13, 'Maui Hawaiian burger with a twist', 17.9, '[1,2,3,4]', 1),
(1, 13, 'Pesto Chicken', 14, 'Grilled sous vide chicken burger with a touch of pesto sauce. Perfecto!', 17.9, '[1,2,3,4]', 1),
(1, 14, 'Feta Shroom', 16, 'Portobello mushroom burger served with greek feta cheese', 18.9, '[1,2,3,4]', 1),
(1, 15, 'Ume Kakiage ', 19, 'Vege tempura burger with homemade ume plum sauce', 15.9, '[1,2,3,4]', 1),
(1, 16, 'Swiss Tofu', 27, 'Homemade tofu patty flooded in swiss cheese fondue served between buns', 18.9, '[1,2,3,4]', 1),
(1, 17, 'Handcut Fries', 17, 'Handcut triple fried russet potato fries', 5, '[5,7]', 1),
(1, 18, 'Mashed Russet', 24, 'Cheesy mashed russet potato with beef fat gravy', 7, '[8]', 1),
(1, 19, 'Nachos & Salsa', 25, 'Baked nachos with fresh salsa', 4, '[9]', 1),
(1, 20, 'Choco Milkshake', 20, 'Made with 85% belgian dark chocolate', 14.9, '[6]', 1),
(1, 21, 'Strawberry Cookie Milkshake', 22, 'Made with homamade strawberry jam cookies', 14.9, '[6]', 1),
(1, 22, 'Vanilla Milkshake', 23, 'Made with homemade barrel aged vanilla', 11.9, '[6]', 1),
(1, 23, 'Mixberry Milkshake', 21, 'Made with fresh frozen berries and a touch of greek yogurt', 14.9, '[6]', 1),
(1, 24, 'Fresh Juice', 18, 'Choose from a variety of fruit', 7.9, '[10,6]', 1),
(1, 25, 'Soft Drinks', 26, 'Choose from a variety of brands', 3.5, '[3,6]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `shop_id` int(11) NOT NULL,
  `p_category_id` int(11) NOT NULL,
  `p_category_name` varchar(50) NOT NULL,
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `availability` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`shop_id`, `p_category_id`, `p_category_name`, `products`, `availability`) VALUES
(1, 1, 'Beef Burger', '[1,2,3,4,5,6,7,8,9]', 1),
(1, 2, 'Chicken Burger', '[10, 11, 12, 13]', 1),
(1, 3, 'Vegan Burger', '[14,15,16]', 1),
(1, 4, 'Sides', '[17,18,19]', 1),
(1, 5, 'Milkshake', '[20,21,22,23]', 1),
(1, 6, 'Beverage', '[24,25]', 1),
(1, 7, 'Recommended', '[1,3,5,11,10,15,18,22,21]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'primeburgershop', 'leekaien1111@gmail.com', '12345678'),
(2, 'mantoryshop', 'leekaien11112@gmail.com', '12345678'),
(24, 'testing', 'testing@gmail.com', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `user_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `shop_name` varchar(50) NOT NULL,
  `shop_image` int(11) DEFAULT NULL,
  `shop_description` varchar(300) DEFAULT NULL,
  `availability` tinyint(1) NOT NULL,
  `p_category` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`p_category`)),
  `address` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`user_id`, `shop_id`, `shop_name`, `shop_image`, `shop_description`, `availability`, `p_category`, `address`) VALUES
(1, 1, 'Prime Shack', 1, 'Gourmet burgers inspired by the world.', 0, '[7,1,2,3,4,5,6]', 1),
(2, 4, 'Mantory', NULL, NULL, 1, NULL, 0),
(24, 10, 'testing', 47, 'testing', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `shop_address`
--

CREATE TABLE `shop_address` (
  `shop_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `address` varchar(100) NOT NULL,
  `postcode` int(5) NOT NULL,
  `latitude` decimal(40,20) NOT NULL,
  `longitude` decimal(40,20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop_address`
--

INSERT INTO `shop_address` (`shop_id`, `address_id`, `address`, `postcode`, `latitude`, `longitude`) VALUES
(1, 1, '135, Jalan Petaling, City Centre, 50000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur', 50000, '3.14189364030792200000', '101.69786426816329000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attribute`
--
ALTER TABLE `attribute`
  ADD PRIMARY KEY (`a_id`),
  ADD KEY `a_category_id` (`a_category_id`);

--
-- Indexes for table `attribute_category`
--
ALTER TABLE `attribute_category`
  ADD PRIMARY KEY (`a_category_id`);

--
-- Indexes for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `co shop id` (`shop_id`);

--
-- Indexes for table `delivery_area`
--
ALTER TABLE `delivery_area`
  ADD PRIMARY KEY (`da_id`),
  ADD KEY `da shopid` (`shop_id`);

--
-- Indexes for table `delivery_mode`
--
ALTER TABLE `delivery_mode`
  ADD PRIMARY KEY (`dm_id`),
  ADD KEY `dm shopid` (`shop_id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `operating_hours`
--
ALTER TABLE `operating_hours`
  ADD PRIMARY KEY (`oh_id`),
  ADD KEY `op shopid` (`shop_id`);

--
-- Indexes for table `order_mode`
--
ALTER TABLE `order_mode`
  ADD PRIMARY KEY (`om_id`),
  ADD KEY `om shop_id` (`shop_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `product_image` (`product_image`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`p_category_id`),
  ADD KEY `shopid link` (`shop_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`shop_id`),
  ADD KEY `owner_id` (`user_id`),
  ADD KEY `shop_image` (`shop_image`);

--
-- Indexes for table `shop_address`
--
ALTER TABLE `shop_address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `address shopid` (`shop_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attribute`
--
ALTER TABLE `attribute`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `attribute_category`
--
ALTER TABLE `attribute_category`
  MODIFY `a_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `customer_order`
--
ALTER TABLE `customer_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `delivery_area`
--
ALTER TABLE `delivery_area`
  MODIFY `da_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `delivery_mode`
--
ALTER TABLE `delivery_mode`
  MODIFY `dm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `operating_hours`
--
ALTER TABLE `operating_hours`
  MODIFY `oh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order_mode`
--
ALTER TABLE `order_mode`
  MODIFY `om_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `p_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `shop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `shop_address`
--
ALTER TABLE `shop_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attribute`
--
ALTER TABLE `attribute`
  ADD CONSTRAINT `a_category_id` FOREIGN KEY (`a_category_id`) REFERENCES `attribute_category` (`a_category_id`);

--
-- Constraints for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD CONSTRAINT `co shop id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `delivery_area`
--
ALTER TABLE `delivery_area`
  ADD CONSTRAINT `da shopid` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `delivery_mode`
--
ALTER TABLE `delivery_mode`
  ADD CONSTRAINT `dm shopid` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `operating_hours`
--
ALTER TABLE `operating_hours`
  ADD CONSTRAINT `op shopid` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `order_mode`
--
ALTER TABLE `order_mode`
  ADD CONSTRAINT `om shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_image` FOREIGN KEY (`product_image`) REFERENCES `image` (`image_id`),
  ADD CONSTRAINT `shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `shopid link` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `owner_id` FOREIGN KEY (`user_id`) REFERENCES `profile` (`user_id`),
  ADD CONSTRAINT `shop_image` FOREIGN KEY (`shop_image`) REFERENCES `image` (`image_id`);

--
-- Constraints for table `shop_address`
--
ALTER TABLE `shop_address`
  ADD CONSTRAINT `address shopid` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
