const inquirer = require("inquirer");
const mysql = require('mysql');
const Table = require('cli-table');

// instantiate 
let table = new Table({
	head: ['Item ID', 'Product Name', 'Department', 'Price'],
	colWidths: [10, 25, 20, 12]
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
				message: 'Please enter a product id: ',
				validate: val => (isNaN(val) === false) ? true : false
			},
			{
				name: 'quantity',
				type: 'input',
				message: 'Please enter a quantity: ',
				validate: val => (isNaN(val) === false) ? true : false
			}

		]).then(answer => {
			connection.query(
				"SELECT stock_quantity, price FROM products WHERE item_id = ?", answer.product_id,
				(err, res) => {
					if (err) throw err;

					if (answer.quantity <= res[0].stock_quantity) {
						updateInventory(res, answer.quantity, answer.product_id, newPurchase);
					} else {
						console.log("not enough inventory");
						newPurchase();
					}

				}

			)
		})
}

const updateInventory = (product, quantity, id, callback) => {
	let newQty = product[0].stock_quantity - quantity;
	const query = connection.query(
		"UPDATE products SET ? WHERE ?", [{
				stock_quantity: newQty
			},
			{
				item_id: id

			}
		], (err, res) => {
			if (err) throw err;
			console.log(`The total cost of your purchase is: ${calculateCost(quantity, product[0].price)}`);
			console.log(res.affectedRows + " products updated!\n");
			callback();
		}
	)
	
}

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
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;

		res.map(x => table.push([x.item_id, x.product_name, x.department_name, formatter.format(x.price)]));

		console.log(table.toString());
		callback();
	});
}

const newPurchase = () => {
	inquirer.prompt([{
			type: 'confirm',
			name: 'buyAgain',
			message: 'Would you like to buy something else?',
			default: false
		}])
		.then(answer => {
			if (answer.buyAgain === true) {
				displayProducts(customerPrompt);
			} else {
				process.exit();
			}
		})
}



displayProducts(customerPrompt);