const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
router.post('/', (req, res)=>{
const {email,password,full_name,billing_address,default_shipping_address,country,phone, user_type} = req.body
try{
  con.query(`INSERT INTO  users (email,password,full_name,billing_address,default_shipping_address,country,phone, user_type) values ("${email}",'${password}','${full_name}','${billing_address}','${default_shipping_address}','${country}','${phone}', '${user_type}')`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });

} catch(error){
  console.log(error)
}
} );
router.put('/', (req, res)=>{
  const {email,password,full_name,billing_address,default_shipping_address,country,phone} = req.body
  try{
    con.query(`INSERT INTO * users values '${email}','${password}','${full_name}','${billing_address}','${default_shipping_address}','${country}','${phone}'`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  
  } catch(error){
    console.log(error)
  }
  } )




module.exports = router;
