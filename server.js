let express = require('express');
let app = express();
let mongoose = require('mongoose');
let registermodel = require("./scema/register");
let jwt_token = require("jsonwebtoken");
let bcrypt = require('bcrypt');
let cors = require('cors');


app.use(express.json())
app.use(cors())


app.listen(3001, () => {
    console.log("server started at 3001")
});

mongoose.connect('mongodb://localhost/employee');

let secretkey = require('crypto').randomBytes(64).toString('hex');

app.post('/register', async (req, res) => {
    console.log(req.body)
    let hashsalt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(req.body.user_password, hashsalt);
    registermodel.create({
        user_name: req.body.user_name, user_email: req.body.user_email, user_mobileNumber: req.body.user_mobileNumber,
        user_password: hashpassword
    }).then(() => {
        res.status(200).send("User Successfully Register Thank You")
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post("/login", async (req, res) => {
    registermodel.find({ user_email: req.body.user_email }).then((userdata) => {
        if (userdata.length) {

            bcrypt.compare(req.body.password, userdata[0].user_password).then((value) => {
                if (value) {
                    let token = jwt_token.sign(userdata[0].user_email, secretkey);
                    res.status(200).send({ token, userdata })
                } else {
                    res.status(400).send("wrong password")
                }
            })


        } else {
            res.status(400).send("Failed to Login")
        }
    }).catch((err) => {
        res.status(400).send(err)
    })
})



