const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM order_details", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
router.post('/', (req, res)=>{
    const {	price	,sku,	quantity} = req.body
    try{
      con.query(`INSERT INTO  order_details ( price	,sku,	quantity) values ('${price}','${sku}','${quantity}')`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    
    } catch(error){
      console.log(error)
    }
    } );

    module.exports = router;