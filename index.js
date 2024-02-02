const express = require('express');
const app = express();
const conn = require('./connection')
const fs = require('fs');
const ejs = require('ejs');
const port = 3000;

// Serve static files from the same directory
app.use(express.static(__dirname));
app.use(express.urlencoded());

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

conn.connect((err) => {
  if (err) console.error(err);

  var sql = 'SELECT * FROM products';

  conn.query(sql, (err, products) => {
    if (err) console.error(err);

    products.forEach((product, index) => {
      try {


        // Read the EJS template file synchronously
        const templateContent = fs.readFileSync('products/template.ejs', 'utf-8');

        // Render the EJS template with product data
        const htmlContent = ejs.render(templateContent, { product, products });

        // Write the rendered HTML content to a new HTML file
        fs.writeFileSync(`productspages/item${product.Id}.ejs`, htmlContent);

        // console.log(`Generated HTML file for product ${product.title} & ${product.Id}`);
      } catch (err) {
        console.error('Error:', err);
      }
    });
  });
});

app.get('/', (req, res) => {

  conn.connect((err) => {
    if (err) console.error('.........36.........' + err);

    var sql = "SELECT * FROM products ";

    conn.query(sql, (err, data) => {
      if (err) console.error('.........42.........' + err);
      res.render(__dirname + '/home', { products: data });
      // console.log(data);
    })
  })

})

app.get('/collection', (req, res) => {
  // Use fs.readFile to read the HTML file asynchronously
  const queryParam = req.query.query;
  const category = req.query.category;

  if (queryParam) {

    conn.connect((err) => {
      if (err) console.error(err);

      const sql = "SELECT * FROM products WHERE title LIKE ? OR decs LIKE ?";
      const values = [`%${queryParam}%`, `%${queryParam}%`];

      conn.query(sql, values, (err, data) => {

        if (err) console.error(err);
        res.render(__dirname + '/collection', { products: data });

      })
    })
  } else if (category) {

    conn.connect((err) => {
      if (err) console.error(err);

      const category = req.query.category;

      const sql = "SELECT * FROM products WHERE type LIKE ?  ";


      conn.query(sql, category, (err, data) => {

        if (err) console.error(err);
        res.render(__dirname + '/collection', { products: data });

      })
    })
  }

  else {
    conn.connect((err) => {
      if (err) console.error(err);

      var sql = 'SELECT * FROM products';

      conn.query(sql, (err, data) => {
        if (err) console.error(err);
        res.render(__dirname + '/collection', { products: data });

      })
    })
  }
});

app.get('/contact', (req, res) => {
  // Use fs.readFile to read the HTML file asynchronously
  fs.readFile('./Contact.html', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

app.post('/contact', (req, res) => {

  const name = req.body.name;
  const phonenumber = req.body.phonenumber;
  const email = req.body.email;
  const title = req.body.title;
  const problem = req.body.problem;

  conn.connect((err) => {
    if (err) console.error('............171.........' + err)


    var sql = `INSERT INTO contact (name,phonenumber, email, title, problem) VALUES (?, ?,?, ?, ?)`;
    var values = [name, phonenumber, email, title, problem];

    conn.query(sql, values, (err, result) => {

      if (err) console.error('............176.........' + err)

      // res.send('Student added to the form with roll number' + result.insertId);
      res.redirect('/success-contact')
    })

  })
});

app.get('/success-contact', (req, res) => {

  fs.readFile('./success-contact.html', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
})

app.get('/about', (req, res) => {
  // Use fs.readFile to read the HTML file asynchronously
  fs.readFile('./About.html', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

app.get('/productspages/item/:value', (req, res) => {
  const capturedValue = req.params.value;

  fs.readFile(`./productspages/item${capturedValue}.ejs`, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

app.get('/success', (req, res) => {

  fs.readFile('./success.html', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
})

app.get('/cart', (req, res) => {

  fs.readFile('./cart.html', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });

});

app.get('/insert', (req, res) => {
  // Use fs.readFile to read the HTML file asynchronously
  fs.readFile('./insert.html', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });

});

app.get('/order', (req, res) => {
  // Use fs.readFile to read the HTML file asynchronously
  fs.readFile('./order.html', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });

});

app.get('/update', (req, res) => {



  conn.connect((err) => {
    if (err) console.error('.........71.........' + err);

    const id = req.query.id
    var sql = "SELECT * FROM products where id=? ";

    conn.query(sql, [id], (err, data) => {
      if (err) console.error('.........76.........' + err);
      res.render(__dirname + '/update', { products: data });
      // console.log(data);
    })
  })

})

app.post('/update', (req, res) => {


  const id = req.body.id;
  const title = req.body.title;
  const decs = req.body.decs;
  const type = req.body.type;
  const img = req.body.image;
  const price = req.body.price;
  const color = req.body.color;
  const size = req.body.size;

  conn.connect((err) => {
    if (err) console.log('............171.........' + err)

    // var sql = `UPDATE students SET name=?,class=?,age=?,number=? where id=?`;

    var sql = `UPDATE products SET type=?, img=?, title=?, decs=?, price=?, color=?, size=? where Id=? `;
    var values = [type, img, title, decs, price, color, size, id];

    conn.query(sql, values, (err, result) => {

      if (err) console.log('............176.........' + err)

      // res.send('Student added to the form with roll number' + result.insertId);
      res.redirect('/products')
    })

  })
})

app.post('/insert', (req, res) => {

  const title = req.body.title;
  const decs = req.body.decs;
  const type = req.body.type;
  const img = req.body.image;
  const price = req.body.price;
  const color = req.body.color;
  const size = req.body.size;
  const labal = req.body.labal;

  conn.connect((err) => {
    if (err) console.log('............171.........' + err)


    var sql = `INSERT INTO products (type, img, title, decs, price, color, size,labal ) VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
    var values = [type, img, title, decs, price, color, size, labal];

    conn.query(sql, values, (err, result) => {

      if (err) console.log('............176.........' + err)

      // res.send('Student added to the form with roll number' + result.insertId);
      res.redirect('/collection')
    })

  })



})

app.get('/orders', (req, res) => {

  conn.connect((err) => {
    if (err) console.error(err);

    const sql = "SELECT * FROM orders";
    // const values = [`%${queryParam}%`, `%${queryParam}%`];

    conn.query(sql, (err, data) => {
      if (err) console.error(err);
      res.render(__dirname + '/orders', { products: data });

    })
  })

});

app.get('/products', (req, res) => {

  conn.connect((err) => {
    if (err) console.error(err);

    const sql = "SELECT * FROM products";
    // const values = [`%${queryParam}%`, `%${queryParam}%`];

    conn.query(sql, (err, data) => {
      if (err) console.error(err);

      res.render(__dirname + '/products', { products: data });
      // console.log(data)
    })
  })

});

app.get('/contact-list', (req, res) => {

  conn.connect((err) => {
    if (err) console.error(err);

    const sql = "SELECT * FROM contact";
    // const values = [`%${queryParam}%`, `%${queryParam}%`];

    conn.query(sql, (err, data) => {
      if (err) console.error(err);

      res.render(__dirname + '/contact-list', { contact: data });
      // console.log(data)
    })
  })

});

app.post('/order', (req, res) => {
  const Name = req.body.name;
  const phone = req.body.phone;
  const optionalphone = req.body.otherphone;
  const address = req.body.adress;
  const province = req.body.province;
  const City = req.body.City;
  const Area = req.body.Area;
  const Street = req.body.Street;
  const Nearest = req.body.Nearest;
  const postalcode = req.body.postalcode;
  const data = req.body.data;

  // const price = req.body.price;
  // const quantity = req.body.quantity;
  // const product = req.body.product;


  conn.connect((err) => {
    if (err) console.error('Error connecting to the database: ' + err);

    // var sql = `INSERT INTO orders (Id, usermane, phonenumber, optionalphone, adress, provience, city, area, street, nearestplace, postalcode, price, quantity, product) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    var sql = `INSERT INTO orders (Id, usermane, phonenumber, optionalphone, adress, provience, city, area, street, nearestplace, postalcode, data) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Pass user input as an array of values
    var values = [Name, phone, optionalphone, address, province, City, Area, Street, Nearest, postalcode, data];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing SQL query: ' + err);
        // Handle the error appropriately, e.g., return an error response to the client.
      } else {
        // console.log('Order inserted successfully.');
        res.redirect('/success');
      }
    });
  });

});

app.get('/delete', (req, res) => {

  const id = req.query.id
  var sql = `DELETE FROM orders WHERE ID=${id}`;

  conn.query(sql, (err, data) => {
    if (err) console.error('.........288.........' + err);
    res.redirect('/orders')
    // console.log(data);
  })

})

app.get('/delete-products', (req, res) => {

  const id = req.query.id
  var sql = `DELETE FROM products WHERE ID=${id}`;

  conn.query(sql, (err, data) => {
    if (err) console.error('.........288.........' + err);
    res.redirect('/products')
    // console.log(data);
  })

})

app.get('/delete-contact', (req, res) => {

  const id = req.query.id
  var sql = `DELETE FROM contact WHERE ID=${id}`;

  conn.query(sql, (err, data) => {
    if (err) console.error('.........288.........' + err);
    res.redirect('/contact-list')
    // console.log(data);
  })

})

app.listen(port, () => {
  console.log(`Website is on http://localhost:${port}`);
});



// // Step 1: Retrieve all data from the "products" table
// conn.query('SELECT * FROM products', (err, results) => {

//   if (err) console.error('Error retrieving data:', err);

//   for (let i = 0; i < results.length; i++) {


//     const title = results[i].title;
//     const decs = results[i].decs;
//     const type = results[i].type;
//     const img = results[i].img;
//     const price = results[i].price + 100;
//     const color = results[i].color;
//     const size = results[i].size;
//     const labal = results[i].labal;



//     var sql = `INSERT INTO products (type, img, title, decs, price, color, size,labal ) VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
//     var values = [type, img, title, decs, price, color, size, labal];

//     conn.query(sql, values, (err, result) => {

//       if (err) console.log('............176.........' + err)

//       console.log(`Data ${i} inserted`)


//     })
//   }
// });
