const inquirer = require("inquirer");
const mysql = require('mysql');
const Table = require('cli-table');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Jaxon17",
    database: "bamazon"
});

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
});

const calculateCost = (quantity, price) => {
	return formatter.format(quantity * price);
}



const displayProducts = (callback) => {
	connection.query("SELECT * FROM products", (err, res) => {
		if (err) throw err;

		res.map(x => table.push([x.item_id, x.product_name, x.department_name, formatter.format(x.price), x.stock_quantity]));

		console.log(table.toString());
		callback();
	});
}

// instantiate 
let table = new Table({
	head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity'],
	colWidths: [10, 25, 20, 12, 12]
});


const listOptions = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product'
        ]
    }]).then(answer => {
        switch (answer.choice) {
            case 'View Products for Sale':
                displayProducts(listOptions);
                break;
            case 'View Low Inventory':
                displayLowInventory(listOptions);
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;

        }
    })
}
const displayLowInventory = (callback) => {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", (err, res) => {
		if (err) throw err;
		res.map(x => table.push([x.item_id, x.product_name, x.department_name, formatter.format(x.price), x.stock_quantity]));

		console.log(table.toString());
		callback();
	});
}
listOptions();

