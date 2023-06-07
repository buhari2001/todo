const exp = require('constants');
const express=require('express');
const app=express();
app.use(express.json());
const path=require('path');
const mysql=require('mysql');
//const { connect } = require('http2');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Veltech12^",
    database:"auth"
})
con.connect(function(err){
    if(err){
        throw err;
    }
    console.log("connected");
})



app.use(express.static(path.join(__dirname,"public")))

app.post('/api/feeding',(req,res)=>{
    var val={
        inputZZ:req.body.inputZZ,
        time:req.body.time
    }
    var sql=`insert into feed(val,time) values ("${val.inputZZ}","${val.time}")`;
    con.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        res.send({message:"success"});
    })
})

app.get('/api/retriving',(req,res)=>{
    var sql=`select * from feed`;
    con.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        res.send({results});
        console.log(results);
    })
})


app.delete('/api/delete', (req, res) => {
    const { val, time } = req.body;
    var sql=`delete from feed where val="${val}"`;
    con.query(sql,(err,results)=>{
        if(err){
            console.error('Error deleting data from MySQL:', error);
            res.sendStatus(500);
        }
        else{
            if (results.affectedRows > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }
    })

});

app.listen(8092,()=>{
    console.log("succesfully connected in port 8092");
})