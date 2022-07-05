const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Karan@2002",
    database: "farmhouse",
});
app.get("/login", (req, res) => {
    const { email, password, seller, customer } = req.query;
    if (seller === "on") {
        db.query(
            `SELECT * FROM seller WHERE  Seller_mail="${email}" AND Seller_password="${password}"`,
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        );
    } else {
        db.query(
            `SELECT * FROM Customer WHERE  Customer_mail="${email}" AND Customer_password="${password}"`,
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        );
    }
});

app.post("/signup", (req, res) => {
    const { name, email, password, city, state, phn, seller, customer, shop } =
        req.body;
    if (seller === "on") {
        db.query(
            "INSERT INTO SELLER VALUES(UUID(),?,?,?,?,?,?,NULL)",
            [name, email, password, city, state, shop],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(req.body);
                }
            }
        );
    } else {
        const location = city + "," + state;
        db.query(
            "INSERT INTO CUSTOMER VALUES(UUID(),?,?,?,?,?)",
            [name, email, password, location, phn],
            (err, result) => {
                if (err) {
                } else {
                    res.send(req.body);
                }
            }
        );
    }
});

app.post("/new-item", (req, res) => {
    const { name, price, detail, image, type, isAvailable, Seller_id } =
        req.body.newItemDetail;
    db.query(
        "INSERT INTO item VALUES(UUID(),?,?,?,?,?,?,?)",
        [name, isAvailable, type, Seller_id, price, detail, image],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/all-items", (req, res) => {
    db.query("SELECT * FROM item", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/seller/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * from seller WHERE Seller_id="${id}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/seller-items", (req, res) => {
    const { Seller_id } = req.query;
    db.query(`SELECT * from item WHERE s_id="${Seller_id}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/delete-item/:id", (req, res) => {
    const { id } = req.params;
    db.query(`DELETE from item WHERE Item_id="${id}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/item/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * from item WHERE Item_id="${id}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/edit-item/:id", (req, res) => {
    const { id } = req.params;
    const { Item_name, Item_price, Item_detail, item_img, Item_type } =
        req.body.itemDetail;
    db.query(
        `UPDATE item SET Item_name="${Item_name}",Item_price=${Item_price},Item_detail="${Item_detail}",item_img="${item_img}",Item_type="${Item_type}" WHERE Item_id="${id}" `,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete-seller-account/:id", (req, res) => {
    const { id } = req.params;
    db.query(`DELETE from seller WHERE Seller_id="${id}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.delete("/delete-customer-account/:id", (req, res) => {
    const { id } = req.params;
    db.query(`DELETE from customer WHERE Customer_id="${id}"`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/change-seller-password/:id", (req, res) => {
    console.log("we got request");
    const { id } = req.params;
    const { currpassword, newpassword1, newpassword2 } = req.body;
    db.query(
        `SELECT Seller_password from seller WHERE Seller_id="${id}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result[0].Seller_password, currpassword);
                if (currpassword === result[0].Seller_password) {
                    db.query(
                        `UPDATE seller SET Seller_password="${newpassword1}" WHERE Seller_id="${id}" `,
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send(result);
                            }
                        }
                    );
                }
            }
        }
    );
});

app.post("/change-customer-password/:id", (req, res) => {
    console.log("we got request");
    const { id } = req.params;
    const { currpassword, newpassword1, newpassword2 } = req.body;
    db.query(
        `SELECT Customer_password from customer WHERE Customer_id="${id}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result[0].Customer_password, currpassword);
                if (currpassword === result[0].Customer_password) {
                    db.query(
                        `UPDATE customer SET Customer_password="${newpassword1}" WHERE Customer_id="${id}" `,
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send(result);
                            }
                        }
                    );
                }
            }
        }
    );
});

app.post("/cart/:id", (req, res) => {
    const { id } = req.params;
    const { quantity, item } = req.body;
    console.log(quantity, item);
    try{
        db.query(`select * from cart where customer_id="${id}"`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    `INSERT INTO cart_item values("${result[0].cart_id}","${item.Item_id}",${quantity})`,
                    (error, ress) => {
                        if (error) {
                            console.log(result[0].cart_id,item.Item_id);
                            db.query(`call update_qty(${quantity},"${result[0].cart_id}","${item.Item_id}")`,
                            (err, result)=>{
                                if (err) {
                                    console.error(err);
                                }else{
                                    res.send(result);
                                }
                            }
                            )
                        } else {
                            res.send(ress);
                        }
                    }
                );
            }
        });
    }catch(e){
        console.log(e);
    }
    
});

app.get("/cart-item/:id", (req, res) => {
    const { id } = req.params;
    db.query(
        `select * from cart_item ci inner join cart c inner join customer cu where c.cart_id=ci.icart_id and cu.Customer_id=c.customer_id and cu.Customer_id="${id}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/update-qty/:iid/:cid', (req, res)=>{
    const { iid,cid } = req.params;
    const {qty} = req.body;
    db.query(`update cart_item set quantity=${qty} where icart_id="${cid}" and iitem_id="${iid}"`,(err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/delete-item/:iid/:cid', (req, res)=>{
    const { iid,cid } = req.params;
    db.query(`delete from cart_item where icart_id="${cid}" and iitem_id="${iid}"`,(err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.post('/order/:id', async(req, res)=>{
    const { id } = req.params;
    const {totalcost,totalitems,itemList,props}= req.body;
    const u_id=uuidv4();
    await db.query(`insert into forder values(?,?,"Approved",?,"2021-09-25",?)`,[u_id,id,totalcost,totalitems],async(err1, result1)=>{
        if (err1) {
            console.log(err1);
        }else{
            console.log("I am in loop");
            console.log(result1);
            await db.query(`select * from forder where cust_id="${id}"`,async(err2,result2)=>{
                if (err2) {
                    console.log(err2);
                }else{
                    console.log("I am in loop");
                    itemList.forEach(async(item)=>{
                        await db.query(`insert into order_item values(?,?,?)`,[u_id,item.iitem_id,item.quantity],async(err3,result3)=>{
                            if (err3) {
                                console.log(err3);
                            }else{
                                console.log("I am in loop");
                                console.log(result3);
                                await db.query(`delete from cart_item where icart_id = "${item.icart_id}" and iitem_id = "${item.iitem_id}"`,(err4,result4)=>{
                                    if (err4) {
                                        console.log(err4);
                                    }else{
                                        console.log("I am in loop");
                                        console.log(result4);                        
                                    }
                                })
                            }
                        })
                    })
                }
            })
            res.send(result1);
        }
    })
})

app.get('/order/:id',(req, res)=>{
    const { id } = req.params;
    db.query(
        `select * from forder where cust_id="${id}"`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

app.get('/order-item/:id',(req, res)=>{
    const { id } = req.params;
    db.query(
        `select * from order_item oi inner join item i where oi.o_id="${id}" and oi.oitem_id=i.Item_id`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

app.get("/review/:id", (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * from review r inner join customer c WHERE r.i_id="${id}" and c.Customer_id=r.c_id`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/review", (req, res) => {
    const {userDetail,item,reviewDeatil}=req.body;
    db.query(
        "INSERT INTO review VALUES(?,?,?,UUID(),?)",
        [userDetail.Customer_id,reviewDeatil.body,reviewDeatil.rating,item.Item_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    );
});

app.listen(3001, () => {
    console.log("listening on 3001");
});
