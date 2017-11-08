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

// const calculateCost = (quantity, price) => {
//     return formatter.format(quantity * price);
// }



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
                displayProducts(addInventory);
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
        console.log("\n");

        console.log(table.toString());
        callback();
    });
}

const addInventory = () => {

    inquirer
        .prompt([{
                name: 'product_id',
                type: 'input',
                message: 'Please enter the id of prodcut to be updated: ',
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
                "SELECT stock_quantity, product_name, item_id FROM products WHERE item_id = ?", answer.product_id,
                (err, res) => {
                    if (err) throw err;
                    updateInventory(res, parseInt(answer.quantity), newAction);
                }
            )
        })

    // callback();
}

const updateInventory = (product, quantity, callback) => {
    let newQty = product[0].stock_quantity + quantity;
    // console.log(newQty + " New Quantity");
    // console.log(product);
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQty, product[0].item_id],
        (err, res) => {
            if (err) throw err;
            // console.log(res);
            console.log(`The quantity of ${product[0].product_name}s is now ${product[0].stock_quantity + quantity}.`);
            callback();

        }
    )

}

const newAction = () => {
    inquirer.prompt([{
            type: 'confirm',
            name: 'action',
            message: 'Would you like to perform another action?',
            default: false
        }])
        .then(answer => {

            // answer.filter(x => x.action === true) {displayProducts(listOptions)};
            if (answer.action === true) {
                displayProducts(listOptions);
            } else {
                process.exit();
            }
        })
}

const addProduct = (callback) => {
    inquirer.prompt([{
            name: 'name',
            message: 'Enter the product name.',
            type: 'input'
        },
        {
            name: 'department',
            message: 'Enter the products department.',
            type: 'input'
        },
        {
            name: 'quantity',
            message: 'Enter the quantity of the product',
            type: 'input'
        },
        {
            name: 'price',
            message: 'Enter the price of the product.',
            type: 'input'

        }

    ]).then(answer =>
        connection.query(
            'INSERT INTO products SET ?', {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
            },
            (err, res) => {
                console.log(res.affectedRows + " product inserted!");
                setTimeout(newAction, 500);
            }
        )
    )
    // callback();
}

listOptions();