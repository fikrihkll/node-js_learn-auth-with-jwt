const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Welcome to the API'
            });
        }
    });
});

app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'POST CREATED',
                authData
            });
        }
    })
    
});

app.post('/api/login',(req,res)=>{
    //MOCK USER

    const user = {
        id:1,
        username:'brad',
        email:'brad@teamdagger.com'
    }

    jwt.sign({user},'secretkey',{expiresIn:'14d'},(err,token)=>{
        res.json({
            token
        });
    });
});

//FORMAT OF TOKEN
// Authorization: Bearer access_token

//Verify Token
function verifyToken(req,res,next){
    //GET auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if beareris undefined
    if(typeof bearerHeader != 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;

        // Next middleware
        next();
    }else{
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000,()=>console.log('Server started on port 5000'));