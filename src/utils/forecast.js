const request=require("request")
const forecast=(a,b,callback)=>{
    setTimeout(()=>{
        const url2="https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/"+a+","+b
        request({url:url2,json:true},(error,response)=>{
            if(error){
                callback("Unable to connect to location services",undefined)
            }
            else if(response.body.error){
                callback("Unable to find the location",undefined)
            }
            else{
            const data="There is a"+response.body.currently.precipProbability+"% chance of rain"
            callback(undefined,data)
            }
        })
    },2000)
}
module.exports=forecast