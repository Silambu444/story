const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
    res.redirect("/");

});

app.post("/", function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    console.log(firstName + " " + lastName + " " + email);

    var data = {
        members :[
            {email_address : email,
            status : "subscribed",
             merge_fields: {
                 FNAME : firstName,
                 LNAME : lastName,
             } 

        }
        ]
    };

    const jsondata = JSON.stringify(data)
    const options = {
        method : "POST",
        auth: "iamsim:4ee65d348af9ae58cc6c401dc93056c7-us7"

    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsondata);
    request.end();

})


// app.listen(3000, function(){
//     console.log("server is running");

// });

app.listen(process.env.PORT ||  3000, function(){
    console.log("server is running");

});




// API Key
// 4ee65d348af9ae58cc6c401dc93056c7-us7

// 40e671790c