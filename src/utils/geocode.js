const request=require("request")
const geocode=(address,callback)=>{
    setTimeout(()=>{
        const url2="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoidmFsdXNhIiwiYSI6ImNrZW9kMHBvbzA3ZTQyd29lcXdkdXNmajYifQ.rWptgFtxGEynh8cm21dasg&limit=1"
        request({url:url2,json:true},(error,response)=>{
            if(error){
                callback("Unable to connect to location services",undefined)
            }
            else if(response.body.features.length==0){
                callback("Unable to find the location",undefined)
            }
            else{
            const data={Latitude:response.body.features[0].center[0],Longitude:response.body.features[0].center[1],location:response.body.features[0].place_name}
            callback(undefined,data)
            }
        })
    },2000)
}
module.exports=geocode