// importing libraries
const express = require("express")
const morgan = require("morgan")
const axios = require("axios")
const api_key = '9dd62183b4df4be69a3987684074d598'
//  Creating our app
const app = express()

// defining the web port
let port = process.env.PORT || 8080

//Midleware
app.use(express.json())
app.use(morgan("dev"))
//APIS:
app.get('/', (req, res)=> {
    res.send("<h1>Hello World<h1>")
})
app.get('/gatorade', (req, res)=> {
    res.send("<h1>Hello from Gatorade<h1>")
})
app.post('/send-data', (req, res)=> {
    console.log(req.body.Hola)
    res.send("Succes")
})

//POSTs
app.post('/reversegeocoding', (req,res) => {

    //Validation
    const {lat,long}= req.body;

    const END_POINT = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&pretty=1&key=9dd62183b4df4be69a3987684074d598`
    
    console.log("END_POINT: " + END_POINT)
    axios.get(END_POINT)
        .then(function(response){
            console.log("RES:" + response.data)
            res.status(200)
            res.json(
                {
                address: response.data.results[0].formatted

             })
            })

            //ERROR HANDLER
        .catch(function (error){
            console.log("An error has ocurred" + error)
            res.send(error)
            res.status(400)
        })
})

//Server running
app.listen(port, ()=>{
    console.log("Server running on port " + port);
})
