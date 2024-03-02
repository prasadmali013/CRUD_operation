const express=require('express');
const bodyparser= require('body-parser');
const mysql=require("mysql");
const server= express();
const cors=require("cors");
server.use(bodyparser.json());
server.use(cors());

//database Connection.........

const db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"DBtest",
});



db.connect(function (error){
    if(error){
        console.log("error Connecting to DB");
    }else {
        console.log("Ho gaya Connect");
    }
});



//port asssigned......


server.listen(8085, function check(error){
    if(error){
        console.log("Error....");
    }
    else{
        console.log("Startedd.... 8085");

    }
});

//insert data..........

server.post("/api/category/add",(req, res)=>{
        let details={
           category_name: req.body.category_name,
        };
         let sql="INSERT INTO category SET ?";
         db.query(sql, details, (error)=>{
            if(error){
                res.send({status: false, error});
            }else{
                res.send({status: true, message:"Ho gaya BHAI"});

            }
         });
    });
    
    
    server.post('/api/products/add', (req, res) => {
        const {product_name, category_id}  = req.body;
        const query = 'INSERT INTO products (product_name, category_id) VALUES (?, ?)';
        db.query(query, [product_name, category_id], (err, result) => {
          if (err) throw err;
          res.send('Product added successfully');
         
        });
      });


    //show data.......

      server.get("/api/products",(req, res)=>{
         var sql = "SELECT *FROM category JOIN products ON category.category_id=products.category_id;";
         db.query(sql,function(error, result){
            if(error){
                console.log("error connnecting to DB");
            }else{
                res.send({status: true, data: result});
            }
         });
      });

      server.get("/api/category",(req, res)=>{
        var sql = "SELECT *FROM category";
        db.query(sql,function(error, result){
           if(error){
               console.log("error connnecting to DB");
           }else{
               res.send({status: true, data: result});
           }
        });
     });

      //search the record.....

      server.get("/api/products/:product_id", (req, res)=>{
                 var product_id=req.params.product_id;
                 var sql = "SELECT * FROM products WHERE product_id="+product_id;
                 db.query(sql, function (error, result){
                  if(error){
                    console.log("error connecting to db");
                  }else{
                    res.send({status:true, data:result});
                  }
            });
      });

      server.get("/api/category/:category_id", (req, res)=>{
        var category_id=req.params.category_id;
        var sql = "SELECT * FROM category WHERE category_id="+category_id;
        db.query(sql, function (error, result){
         if(error){
           console.log("error connecting to db");
         }else{
           res.send({status:true, data:result});
         }
   });
});

      //update record.....

      server.put("/api/products/update/:product_id", (req, res) => {
        let sql =
          "UPDATE products SET product_name='" +
          req.body.product_name +
           "' WHERE product_id="+ req.params.product_id;
          
          let a = db.query(sql, (error, result) => {
          if (error) {
            res.send({ status: false, message: "products Updated Failed" });
          } else {
            res.send({ status: true, message: "products Updated successfully" });
          }
        });
      });

      server.put("/api/category/update/:category_id", (req, res) => {
        let sql =
          "UPDATE category SET category_name='" +
          req.body.category_name +
           "' WHERE category_id="+ req.params.category_id;
          
          let a = db.query(sql, (error, result) => {
          if (error) {
            res.send({ status: false, message: "products Updated Failed" });
          } else {
            res.send({ status: true, message: "products Updated successfully" });
          }
        });
      });

      //Delete the Records............
      
      server.delete("/api/products/delete/:product_id", (req, res) => {
        let sql = "DELETE FROM products WHERE product_id=" + req.params.product_id +"" ;
        let query = db.query(sql, (error) => {
          if (error) {
            res.send({ status: false, message: "product Deleted Failed" });
          } else {
            res.send({ status: true, message: "product Deleted successfully" });
          }
        });
    });

    server.delete("/api/category/delete/:category_id", (req, res) => {
      let sql = "DELETE FROM category WHERE category_id=" + req.params.category_id +"" ;
      let query = db.query(sql, (error) => {
        if (error) {
          res.send({ status: false, message: "product Deleted Failed" });
        } else {
          res.send({ status: true, message: "product Deleted successfully" });
        }
      });
  });