const inquirer = require("inquirer");
const mysql = require('mysql');
const Table = require('cli-table');

// instantiate 
let table = new Table({
    head: ['Item ID', 'Product Name', 'Department', 'Price']
  , colWidths: [20, 20, 20, 20]
});
 
// table is an Array, so you can `push`, `unshift`, `splice` and friends 
// table.push(
//     ['First value', 'Second value']
//   , ['First value', 'Second value']
// );
 

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
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price]
              
            );
            // console.log(res[i].product_name);
        }
        console.log(table.toString());
        
    });
    
}

displayProducts();