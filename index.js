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

app.listen(8092,()=>{
    console.log("succesfully connected in port 8092");
})