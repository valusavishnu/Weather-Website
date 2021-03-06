//console.log("Client side js file is loaded")

fetch("http://puzzle.mead.io/puzzle").then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
}) 


const weatherform=document.querySelector("form")
const search=document.querySelector("input")
const msg1=document.querySelector("#msg1")
const msg2=document.querySelector("#msg2")
 //msg1.textContent="From Js"

weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location=search.value
     msg1.textContent="Loading..."
     msg2.textContent=""
         fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent="Error"
            }else{
            msg2.textContent="Location: "+data.location+"\nLatitude: "+data.latitude+"\nLongitude: "+data.longitude+"\nCode:"+data.code
        }
        })
    })    
})