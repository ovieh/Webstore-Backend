const inquirer = require("inquirer");
const mysql = require('mysql');
const Table = require('cli-table');

// instantiate 
let table = new Table({
    head: ['Item ID', 'Product Name', 'Department', 'Price'],
    colWidths: [10, 25, 20, 10]
});

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Jaxon17",
    database: "bamazon"
});


const customerPrompt = () => {
    inquirer
        .prompt([{
                name: 'product_id',
                type: 'input',
                message: 'Please enter a product id: '
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'Please enter a quantity: '
            }

        ]);
}


const displayProducts = (callback) => {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) console.log(err);

        res.map( x =>  table.push([ x.item_id, x.product_name, x.department_name, x.price ]));

        console.log(table.toString());
        callback();
    });
}



displayProducts(customerPrompt);