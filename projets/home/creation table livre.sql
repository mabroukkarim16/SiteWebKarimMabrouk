SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `Glivre` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `Glivre` ;

-- -----------------------------------------------------
-- Table `Glivre`.`livre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Glivre`.`livre` (
  `ISBN` INT NOT NULL,
  `auteur` VARCHAR(45) NULL,
  `titre` VARCHAR(45) NULL,
  `prix` DECIMAL(5,2) NULL,
  PRIMARY KEY (`ISBN`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



INSERT INTO `Glivre`.`livre` (`ISBN`, `auteur`, `titre`, `prix`) VALUES ('12345', 'Leduc', 'Java 2', '65'), ('12346', 'Cornell', 'Au coeur de java', '80'),('12685', 'Leduc', 'Langage Java', '55');