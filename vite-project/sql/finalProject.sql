-- CREATE DATABASE CoinCollection;
-- USE CoinCollection;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
-- flush privileges;

-- CREATE TABLE coins (
--     coin_id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     obverseDetails TEXT,
--     reverseDetails TEXT,
--     issuingCountry VARCHAR(255),
--     composition VARCHAR(255),
--     quality VARCHAR(50),
--     denomination VARCHAR(50),
--     year YEAR,
--     weight DECIMAL(5,2),
--     price DECIMAL(10,2)
-- );

-- INSERT INTO coins (
--     name, description, obverseDetails, reverseDetails, issuingCountry, composition, quality, denomination, year, weight, price
-- ) VALUES (
--     'Canadian Beaver',
--     '"Canadian beaver". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.',
--     'In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.',
--     'In the center of the coin reverse is a Canadian beaver on a rock sticking out of the water. At the top is a semicircle with the inscription "5 cents" between two maple leaves. At the bottom in two lines is the inscription CANADA (CANADA) and the year of minting.',
--     'CANADA',
--     'nickel',
--     'BU',
--     '5 cents',
--     1965,
--     4.54,
--     40.00
-- );

-- INSERT INTO coins (
--     name, description, obverseDetails, reverseDetails, issuingCountry, composition, quality, denomination, year, weight, price
-- ) VALUES (
--     'Looney',
--     '"Looney". Unique coin with the image of a goat. Canadian dollar symbol.',
--     'The obverse depicts Queen Elizabeth II. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is the year of coinage.',
--     'The reverse of the coin depicts a black goat - a symbol of Canada and an inscription divided into the lower and upper semicircle "Canadian dollar".',
--     'CANADA',
--     'gold',
--     'BU',
--     '1 dollar',
--     1970,
--     5.4,
--     65.00
-- );

-- ALTER TABLE coins
-- ADD image VARCHAR(255);

-- UPDATE coins
-- SET image = "https://i.postimg.cc/BQGyCX2v/Canadian-Beaver-1.png"
-- WHERE coin_id = 1;

-- UPDATE coins
-- SET image = "https://i.postimg.cc/DyFjXRKJ/Looney-1.png"
-- WHERE coin_id = 2;

-- TRUNCATE TABLE coins;

-- CREATE TABLE coinTypes (
--     typeID INT AUTO_INCREMENT PRIMARY KEY,
--     typeName VARCHAR(50) NOT NULL
-- );

-- INSERT INTO coinTypes (typeName)
-- VALUES ('Bullion coins'), ('Exclusive coins'), ('Commemorative coins');

-- TRUNCATE TABLE coinTypes;

-- CREATE TABLE coinDetails (
--     detailID INT AUTO_INCREMENT PRIMARY KEY,
--     coinID INT,
--     typeName VARCHAR(50),
--     name VARCHAR(255),
--     description TEXT,
--     observeDetails TEXT,
--     reverseDetails TEXT,
--     issuingCountry VARCHAR(255),
--     composition VARCHAR(255),
--     quality VARCHAR(255),
--     denomination VARCHAR(50),
--     year INT,
--     weight DECIMAL(5, 2),
--     price DECIMAL(10, 2),
--     FOREIGN KEY (coinID) REFERENCES coins(coin_id)
-- );

-- drop table coinDetails;

-- ALTER TABLE coins
-- ADD COLUMN typeID INT;

-- ALTER TABLE coins
-- ADD CONSTRAINT fk_coin_type
-- FOREIGN KEY (typeID) REFERENCES coinTypes(typeID);

-- ALTER TABLE coinDetails
-- ADD COLUMN typeID INT;

-- ALTER TABLE coinDetails
-- ADD CONSTRAINT fk_coin_type
-- FOREIGN KEY (typeID) REFERENCES coinTypes(typeID);

-- ALTER TABLE coins
-- DROP COLUMN  typeID;

-- ALTER TABLE coins
-- DROP CONSTRAINT fk_coin_type;

-- INSERT INTO coinDetails (coin_id, typeName, name, description, obverseDetails, reverseDetails, issuingCountry, composition, quality, denomination, year, weight, price, image)
-- SELECT 
--     coins.coin_id,
--     coinTypes.typeName,
--     coins.name,
--     coins.description,
--     coins.obverseDetails,
--     coins.reverseDetails,
--     coins.issuingCountry,
--     coins.composition,
--     coins.quality,
--     coins.denomination,
--     coins.year,
--     coins.weight,
--     coins.price,
--     coins.image
-- FROM coins
-- JOIN coinTypes ON coins.typeID = coinTypes.typeID;

-- ALTER TABLE coinDetails CHANGE COLUMN observeDetails obverseDetails TEXT;

-- SELECT c.coin_id, 
--        c.name AS coin_name, 
--        c.description, 
--        c.obverseDetails, 
--        c.reverseDetails, 
--        c.issuingCountry, 
--        c.composition, 
--        c.quality, 
--        c.denomination, 
--        c.year, 
--        c.weight, 
--        c.price, 
--        c.image, 
--        ct.typeName AS coin_type
-- FROM coins c
-- JOIN coinTypes ct ON c.typeID = ct.typeID;

-- ALTER TABLE coins
-- ADD type_id INT;

-- ALTER TABLE coins
-- ADD CONSTRAINT fk_coin_type
-- FOREIGN KEY (type_id) REFERENCES coinTypes(typeID);

-- ALTER TABLE coinDetails
-- DROP CONSTRAINT fk_coin_type;
-- FOREIGN KEY (typeID) REFERENCES coinTypes(typeID);

-- SELECT c.coin_id, 
--        c.name AS coin_name, 
--        c.description, 
--        c.obverseDetails, 
--        c.reverseDetails, 
--        c.issuingCountry, 
--        c.composition, 
--        c.quality, 
--        c.denomination, 
--        c.year, 
--        c.weight, 
--        c.price, 
--        c.image, 
--        ct.typeName AS coin_type
-- FROM coins c
-- JOIN coinTypes ct ON c.type_id = ct.typeID;

-- UPDATE coins
-- SET type_id = 1
-- WHERE coin_id = 1;

-- UPDATE coins
-- SET type_id = 2
-- WHERE coin_id = 2;

-- DROP TABLE coinDetails;

-- CREATE TABLE coinDetails (
--     coin_id INT,
--     coin_name VARCHAR(255),
--     description TEXT,
--     obverseDetails TEXT,
--     reverseDetails TEXT,
--     issuingCountry VARCHAR(255),
--     composition VARCHAR(255),
--     quality VARCHAR(50),
--     denomination VARCHAR(50),
--     year YEAR,
--     weight DECIMAL(5,2),
--     price DECIMAL(10,2),
--     imageFront VARCHAR(255),
--     coin_type VARCHAR(50),
--     imageBack VARCHAR(255)
-- );

-- INSERT INTO coinDetails (
--     coin_id, 
--     coin_name, 
--     description, 
--     obverseDetails, 
--     reverseDetails, 
--     issuingCountry, 
--     composition, 
--     quality, 
--     denomination, 
--     year, 
--     weight, 
--     price, 
--     imageFront, 
--     coin_type,
--     imageBack
-- )
-- SELECT c.coin_id, 
--        c.name AS coin_name, 
--        c.description, 
--        c.obverseDetails, 
--        c.reverseDetails, 
--        c.issuingCountry, 
--        c.composition, 
--        c.quality, 
--        c.denomination, 
--        c.year, 
--        c.weight, 
--        c.price, 
--        c.imageFront, 
--        ct.typeName AS coin_type,
--        c.imageBack
-- FROM coins c
-- JOIN coinTypes ct ON c.type_id = ct.typeID;

-- SELECT * from coinDetails;

-- UPDATE coins
-- SET type_id = 3
-- WHERE coin_id = 1; 

-- ALTER TABLE coins CHANGE COLUMN image imageFront VARCHAR(255);

-- ALTER TABLE coins
-- ADD imageBack VARCHAR(255);

-- UPDATE coins
-- SET imageBack = "https://i.postimg.cc/Nf4N7bgN/Looney-2.png"
-- WHERE coin_id = 2; 

-- INSERT INTO coins (
--     name, description, obverseDetails, reverseDetails, issuingCountry, composition, quality, denomination, year, weight, price, imageFront, type_id, imageBack
-- ) VALUES (
--     'Rial',
--     'Iranian silver coin with the image of a lion. Face value 5000 five thousand dinars (5 five taps). 1928 year.',
--     'It depicts a bust of Reza Shah, whose head is turned to the right.',
--     'On the other side is a lion with a saber in front of the radiant sun. Above it is a crown.
-- Before the monetary reform of 1932, the currency of Iran was fog. (1 fog = 10 clicks, 1 crane = 1000 dinars.)
-- Currently, the name "fog" is used to denote the amount of 10 reais.',
--     'Iran',
--     'silver',
--     'BU',
--     '5000 dinars',
--     1928,
--     6.12,
--     98.00,
--     'https://i.postimg.cc/qRMSyYKx/Rial-1.png',
--     2,
--     'https://i.postimg.cc/0QW3ffdR/Rial-2.png'
-- );

-- select * from coinDetails;

-- ALTER TABLE coinDetails CHANGE COLUMN image imageFront VARCHAR(255);

-- ALTER TABLE coinDetails
-- ADD imageBack VARCHAR(255);

-- CREATE TABLE admin (
--     adminID INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL UNIQUE,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL
-- );

DELIMITER $$

-- Trigger for inserting into coinDetails after a new coin is added
CREATE TRIGGER after_coins_insert
AFTER INSERT ON coins
FOR EACH ROW
BEGIN
    INSERT INTO coinDetails (
        coin_id, 
        coin_name, 
        description, 
        obverseDetails, 
        reverseDetails, 
        issuingCountry, 
        composition, 
        quality, 
        denomination, 
        year, 
        weight, 
        price, 
        imageFront, 
        coin_type, 
        imageBack
    )
    VALUES (
        NEW.coin_id, 
        NEW.name, 
        NEW.description, 
        NEW.obverseDetails, 
        NEW.reverseDetails, 
        NEW.issuingCountry, 
        NEW.composition, 
        NEW.quality, 
        NEW.denomination, 
        NEW.year, 
        NEW.weight, 
        NEW.price, 
        NEW.imageFront, 
        (SELECT typeName FROM coinTypes WHERE typeID = NEW.type_id), 
        NEW.imageBack
    );
END$$

-- Trigger for updating coinDetails after a coin is updated
CREATE TRIGGER after_coins_update
AFTER UPDATE ON coins
FOR EACH ROW
BEGIN
    UPDATE coinDetails 
    SET 
        coin_name = NEW.name,
        description = NEW.description,
        obverseDetails = NEW.obverseDetails,
        reverseDetails = NEW.reverseDetails,
        issuingCountry = NEW.issuingCountry,
        composition = NEW.composition,
        quality = NEW.quality,
        denomination = NEW.denomination,
        year = NEW.year,
        weight = NEW.weight,
        price = NEW.price,
        imageFront = NEW.imageFront,
        coin_type = (SELECT typeName FROM coinTypes WHERE typeID = NEW.type_id),
        imageBack = NEW.imageBack
    WHERE coin_id = NEW.coin_id;
END$$

-- Trigger for deleting from coinDetails when a coin is deleted
CREATE TRIGGER after_coins_delete
AFTER DELETE ON coins
FOR EACH ROW
BEGIN
    DELETE FROM coinDetails WHERE coin_id = OLD.coin_id;
END$$

DELIMITER ;


-- select * from coinDetails

TRUNCATE TABLE admin;