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
				"SELECT stock_quantity FROM products WHERE item_id = ?", answer.product_id, (err, res) => {
					if (err) console.log(err);

					if (answer.quantity <= res[0].stock_quantity) {
						updateInventory(res, answer.quantity, answer.product_id);
					} else {
						console.log("not enough inventory");
					}
					
				}

			)
		})
}

const updateInventory = (product, quantity, id) => {
	let newQty = product[0].stock_quantity - quantity;
	console.log(product);
	const query = connection.query(
		"UPDATE products SET ? WHERE ?",
		[
			{
				stock_quantity: newQty
			},
			{
				item_id: id
				
			}
		], (err, res) => {
			if (err) console.log(err);
			console.log(res.affectedRows + " products updated!\n");
			
		}
	)
	// console.log(query.sql);
}


const displayProducts = (callback) => {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) console.log(err);

		res.map(x => table.push([x.item_id, x.product_name, x.department_name, x.price]));

		console.log(table.toString());
		callback();
	});
}



displayProducts(customerPrompt);