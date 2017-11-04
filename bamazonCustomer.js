const inquirer = require("inquirer");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Jaxon17",
    database: "bamazon"
});



const displayProducts = () => {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) console.log(err);

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product_name);
        }
    });
}

displayProducts();