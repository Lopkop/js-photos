const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());


var util = require('util');
var exec = require('child_process').exec;


app.post('/register', async (req, res) => {
    let { username, photo_url } = req.body;
    await new User({
        username,
        photo_url,
    }).save()
})

// // UPLOAD IMAGE
uploadImage = async (req, res) => {
    try {
      const image = req.file ? req.file.filename : null;
      const { name } = req.body;
      const user = await User.findOne({ name });
      user.photo = req.file.filename
      var command = `curl -F 'file=@"public/images/${req.file.filename}"' http://localhost:5000`
      child = exec(command, function(error, stdout, stderr){

        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        
        if(error !== null)
        {
            console.log('exec error: ' + error);
        }
        
        });

      res.status(201).json({ message: "data upload successfully" });
    } catch (error) {
      res.status(500).json({ error, message: "internal server error " });
    }}

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload_photo", upload.single("image"), uploadImage);


// ENDPOINT FOR GETTING URL TO A PHOTO
app.get('/get_photo', async (req, res) => {
    let { username } = req.body;
    let user = await User.findOne({username});
    
    res.status(200).send('http://localhost:5000/'+user.photo)
})


module.exports = app;
