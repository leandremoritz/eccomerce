const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const middleware = require('../middleware/auth')

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
// Gets one products
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products WHERE product_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post('/addingproduct', (req, res)=>{
   if(req.user.user_type === 'user') {
    const {image,brand,descriptions,price} = req.body
    try{
      con.query(`INSERT INTO  products (image,branddescriptions,price) values ('${image}','${brand}','${descriptions}','${price}')`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    
    } catch(error){
      console.log(error)
    }
   }
   else {
    res.send('Not Allowed')
   }
    } );

    router.put("/:id", (req, res) => {
      try {
        const {
          sku,
          name,
          price,
          descriptions,
          image,
          category,
          stock,
          
        } = req.body;
       
        con.query(
          `UPDATE products set sku="${sku}",name="${name}", price="${price}",descriptions="${descriptions}",image="${image}",category="${category}",stock="${stock}" WHERE product_id = "${req.params.id}"`,
          (err, result) => {
            if (err) throw err;
            res.send(result);
          }
        );
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    });
    // delete product
    router.delete("/:id", (req, res) => {
      try {
        con.query(
          `DELETE FROM products WHERE product_id = "${req.params.id}" `,
          (err, result) => {
            if (err) throw err;
            res.send(result);
          }
        );
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    });

    
    module.exports = router;