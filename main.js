const express = require('express');
const User = require('./models');
const fs = require('fs')

const app = express();
app.use(express.json())

app.post('/register', async (req, res) => {
    let { username, photo_url } = req.body;
    await new User({
        username,
        photo_url,
    }).save()
})

app.get('/get_photo', async (req, res) => {
    let { username } = req.body;
    let user = await User.findOne({username});
    
    fs.readFile('photos/'+user.photo, (err, data) => {
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.end(data)
    }
    )})


module.exports = app;