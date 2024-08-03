CREATE DATABASE school CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `school`;

CREATE TABLE `allobalance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `allocationID` text,
  `amount` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `allocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payableID` text,
  `name` text,
  `percentage` text,
  `notes` text,
  `balance` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `genbalance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `allocationID` text,
  `amount` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `grade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grade` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `parent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `address` text,
  `relationship` text,
  `contact` text,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `payables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `amount` text,
  `percentage` text,
  `year` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `or_no` text,
  `amount` text,
  `parentID` text,
  `studentID` text,
  `year` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `scholar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `amount` text,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `schoolyr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `schoolyr` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE `section` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` text,
  `gradeID` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `LRN` text,
  `parentID` text,
  `gradeID` text,
  `sectionID` text,
  `scholarshipID` text,
  `schoolyrID` text,
  `initialyr` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `password` text,
  `role` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` text,
  `requestor` text,
  `amount` text,
  `voucherno` text,
  `allocationID` text,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `users` VALUES (1,'Treasurer','password','Treasurer'),(2,'Cashier','password','User'),(3,'Super Admin','password','Super Admin'),(4,'Test','password','Idk');

INSERT INTO `schoolyr` VALUES (1,'2024-2025'),(2,'2023-2024');
