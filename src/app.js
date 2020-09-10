const express=require("express")
const chalk=require("chalk")
const path=require("path")
const app=express()
const hbs=require("hbs")
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")
 console.log(__dirname)

 const port=process.env.PORT || 3000
 //Define path for express configuration
 const public=path.join(__dirname,"../public")
 const viewpath=path.join(__dirname,"../templates/views")
 const partialspath=path.join(__dirname,"../templates/partials")
 const partialspath2=path.join(__dirname,"../templates/partials")
//Setup handlebars engine and views location
 app.set("view engine","hbs")
 app.set("views",viewpath)
 hbs.registerPartials(partialspath)
 hbs.registerPartials(partialspath2)
//setup static directory to serve
 app.use(express.static(public))
/*app.get("",(req,res)=>{
    res.send("<h1>Hello Express!!</h1>")
})*/

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        location:"India",
        name:"Hasanparthy"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Vishnu Teja"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
      title:"Vasavi College of Engineering",
      address:"Ibrahimbagh",
      name:"VCE Administration" 
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:"You must provide the address term"
        }) 
    }
   const data= geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send(error)
        }
        console.log(data)
        res.send({latitude:data.Latitude,longitude:data.Longitude,location:data.location,code:data.code})
    })
   /* res.send({
        forecast:"23.6'c",
        location:req.query.address
    })*/
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render("error",{
        name:"Valusa",
        title:"404",
        errormessage:"Help article not found"
    })
})


app.get("*",(req,res)=>{
    res.render("error",{
        title:"404",
        name:"Valusa",
        errormessage:"Page not Found"     
    })
})
app.listen(port,()=>{
    console.log("Server is upon port ",port)
})