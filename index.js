const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req,res) => {
    res.json({
        message: "Hey there! Welcome to Kevin's tut"
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post created",
                authData
            });
        }
    });
});

app.post('/api/login', (req,res) => {
    const user = {
        id: 1,
        username: 'Kay',
        email: 'kay@test.be'
    }

    jwt.sign({user:user}, 'secretkey', (err, token) => {
        res.json({
            token,
        });
    });
});

function verifyToken(req, res, next){
    const bearerheader = req.headers['authorization']
    if (typeof bearerheader !== 'undefined') {
        const bearerToken = bearerheader.split(' ')[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

app.listen(3000, (req,res) => {
    console.log('server started on port 3000')
})