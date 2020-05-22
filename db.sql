CREATE DATABASE IF NOT EXISTS `practice`;
USE `practice`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (

    `Name` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Username` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(50) NOT NULL,
    `ImagePath` TEXT,
    `AboutMe` TEXT NOT NULL,
    
    PRIMARY KEY(`Username`)
);