DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(128) NULL,
    department_name VARCHAR(128) NULL,
    price DECIMAL (7, 2),
    stock_quantity INT NULL,
    PRIMARY KEY (item_ID)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Cell Phones", 1000.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Home", 10.00, 100000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A Dance for Dragons", "Books", 20.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Television", "Eleectronics", 550.00, 7500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("USB Type C Cable" , "Electronics", 10.00, 9000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hanes Socks", "Men's Clothing", 12.00, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Galaxy Note 8", "Cell Phones", 1050.00, 750);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bAmazon bEcho", "Electronics", 35.00, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oven Thermometor", "Kitchen", 5.60, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diapers", "Baby", 500.00, 10000);
