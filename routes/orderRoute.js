const express = require("express");
const router = express.Router();
const con = require("../lib/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");
// Register Route
// The Route where Encryption starts
router.post("/order", (req, res) => {
  try {
    let sql = "INSERT INTO orders SET ?";
    const {
      user_id,
      amount,
      shipping_address,
      order_email,
      order_date,
      order_status,
    } = req.body;
    // The start of hashing / encryption
    let order = {
      user_id,
      amount,
      shipping_address,
      order_email,
      order_date,
      order_status,
    };
    con.query(sql, order, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`order no: ${order_id} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});
// check order
// check order
router.post("/check", (req, res) => {
  try {
    let sql = "SELECT * FROM orders WHERE ?";
    let order = {
      order_id: req.body.order_id,
    };
    con.query(sql, order, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("invalid order number");
      } else {
        const payload = {
          order: {
            order_id: result[0].order_id,
            user_id: result[0].user_id,
            amount: result[0].amount,
            shipping_address: result[0].shipping_address,
            order_email: result[0].order_email,
            order_date: result[0].order_date,
            order_status: result[0].order_status,
          },
        };
        // Creating a token and setting expiry date
        jwt.sign(
          payload,
          process.env.jwtSecret,
          {
            expiresIn: "365d",
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
});
// Verify
router.get("/orders/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        msg: "Unauthorized Access!",
      });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
});
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.get("/", middleware, (req, res) => {
  try {
    let sql = "SELECT * FROM orders";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
// Gets one order
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM orders WHERE order_id = ${req.params.id}`,
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
// Add new order
router.post("/", (req, res) => {
  if (req.body.user_type.length !== 0) {
    // the below allows you to only need one const, but every input required is inside of the brackets
    const {
      user_id,
      amount,
      shipping_address,
      order_email,
      order_date,
      order_status,
    } = req.body;
    // OR
    // the below requires you to add everything one by one
    //   const email = req.body.email;
    try {
      con.query(
        //When using the ${}, the content of con.query MUST be in the back tick
        `INSERT INTO orders (user_id,amount,shipping_address,order_email,order_date,order_status,) VALUES ("${user_id}",${amount}","${shipping_address}","${order_email}","${order_date}","${order_status}")`,
        (err, result) => {
          if (err) throw err;
          res.send(`order registered ${order_id}`);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.send("login first");
  }
});
// update order
router.put("/:id", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const {
      email,
      password: hash,
      full_name,
      billing_address,
      default_shipping_address,
      country,
      phone,
      order_type,
    } = req.body;
    con.query(
      `UPDATE orders set email="${email}",password="${password}",full_name="${full_name}",billing_address="${billing_address}",default_shipping_address="${default_shipping_address}",country="${country}",phone="${phone}",order_type="${order_type}" WHERE order_id = "${req.params.id}"`,
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
// delete order
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM orders WHERE order_id = "${req.params.id}" `,
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