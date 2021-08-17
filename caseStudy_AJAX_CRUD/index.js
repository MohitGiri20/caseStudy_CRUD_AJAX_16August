// var product=[
//     // {
//     //     prodName : "pen",
//     //     quantity : "5",
//     //     price : 10  
//     // },
//     // {
//     //     prodName : "pencil",
//     //     quantity : "10",
//     //     price : 5  
//     // }

// ]



// var http  = require('http')
// var fs = require('fs')
// var server= http.createServer((req,res)=>{
//     // console.log("Server started")
//     // res.writeHead(200,{'Content-Type' : "text/html"})
//     // res.write("Hello Ji")
//     // res.end() 
    
//     if(req.method=="GET"&&req.url=="/")
//     {
//     // res.write("Home")
//     res.write(index)
//      res.end()
//     }
//     //  if(req.method=="GET" && req.url=="/api"){
//     //  res.writeHead(200,{"Content-Type":"application/json"})
//     //  res.write(JSON.stringify(product))
//     //  res.end()
//     // }
// //     if(req.method=="PATCH" && req.url=="/api"){
     
// //      req.on("data",(chunk)=>{
// //          console.log(chunk);
// //          product.forEach(data=>{
// //              if(data.prodName==JSON.parse(chunk).prodName){
// //                  data.price=JSON.parse(chunk).price
// //                  data.quantity=JSON.parse(chunk).quantity
// //              }
// //          })
// //          console.log(product)
// //      })
// //      res.writeHead(200,{"Content-Type":"application/json"})
// //      res.write(JSON.stringify(product))
// //      res.end()
// //  }
   
//  if(req.method == "POST"  && req.url == "/formreq"){
//     //   req.on("data",(chunk)=>{
//     //       console.log(chunk.toString())
//     //   })
//     //   res.write("Request received")
//     //   res.end()
//      var str = "";
//      var prodName,quantity,price;
//     req.on("data",(chunk)=>{
//          console.log(chunk.toString());
//          //str = chunk.toString();
//          var data = chunk.toString().split("&")
//          console.log(data[0])
//          prodName = data[0].split("=")[1];
//          quantity = data[1].split("=")[1];
//          price = data[2].split("=")[1];
//          console.log(prodName +" " + quantity +" " + price); 

//          var obj = {
//              pName : prodName,
//              pr : price,
//              quant : quantity
//          }

//         product.push(obj)
//         console.log(product)
//         console.log(product.length)
//     })

//     // res.writeHead(200,{"Content-Type":"text/html"})
//     // res.write(JSON.stringify(product))
   
//     res.end()
//  }

    


//     // if(req.method=="POST" && req.url=="/api"){
//     //     req.on("data",(chunk)=>{
//     //         console.log(chunk);
//     //         product.push(JSON.parse(chunk))
//     //         console.log(product)
//     //     })
//     //     res.writeHead(200,{"Content-Type":"application/json"})
//     //     res.write(JSON.stringify(product))
//     //     res.end()
//     // }
//     // if(req.method=="DELETE" && req.url.match("/api/([a-z]+|[A-Z]+)")){
//     //     console.log(req.url.split('/'));
//     //     var p=req.url.split('/')[2];
//     //     product=product.filter(data=>{
//     //         console.log(data);
//     //         return data.prodName!=p
//     //     })
//     //     res.writeHead(200,{"Content-Type":"application/json"})
//     //     res.write(JSON.stringify(product))
//     //     res.end()
//     // }


// })

// var index =""
// fs.readFile("index.html",(err,data)=>{
//     index = data;
// server.listen(5055,()=>{
//     console.log("server started");
// })
// })

///////////////////////////////////////////////////////////////////

const { fstat } = require('fs')
var http = require('http')
var prods=[]
var server=http.createServer((req,res)=>{
    if(req.method=='POST' && req.url=='/add'){
        //console.log(chunk)
        req.on("data",(chunk)=>{
            console.log(chunk.toString())
            let str=chunk.toString().split('&')
            let prod={
                product_name:str[0],
                price:parseInt(str[1]),
                quantity:parseInt(str[2])
            }
            prods.push(prod) 
            console.log('Product added')
        })
    }
    else if(req.method=='GET' && req.url=='/api'){
        res.writeHead(200,{"Content-Type" : "text/html"})
        req.on("data",(chunk)=>{
            for(let i=0;i<prods.length;i++){
                if(prods[i].product_name==chunk.toString()){
                   console.log("Match found")
                }else{
                    console.log("Match not found")
                }
            }
            res.write(JSON.stringify(prods))
        })
        res.write(JSON.stringify(prods))
    }
    else if(req.method=='DELETE' && req.url=='/del'){
        req.on("data",(chunk)=>{
            for(let i=0;i<prods.length;i++){
                if(prods[i].product_name==chunk.toString())
                prods.splice(i,1)
            }
        })
        console.log("Product deleted")
    }
    else if(req.method=='PATCH' && req.url=='/updtpr'){
        
        req.on("data",(chunk)=>{

            console.log(chunk.toString())
            let str=chunk.toString().split('&')
            let product_name=str[0]
            let price=str[1]


            for(let i=0;i<prods.length;i++){
                if(prods[i].product_name==product_name)
                prods[i].price=price
            }
        })
        console.log('Product Updated')        
    }
    else if(req.method=='POST' && req.url=='/search'){
        let ans=[]
        
        req.on("data",(chunk)=>{
            for(let i=0;i<prods.length;i++){
                if(prods[i].product_name.indexOf(chunk)==0)
                ans.push(prods[i])
            }
        })

        res.writeHead(200,{"Content-Type":"application/json"})
        res.write(JSON.stringify(ans))

    }
    else if(req.method=='GET' && req.url=='/formreq'){
        res.write(index)
    }
    else if(req.method=='POST' && req.url=='/formreq'){
        req.on("data",(chunk)=>{
            console.log(chunk.toString())
        })
        res.write("Request received")
    }
    res.end()
})
var fs = require('fs')
var index=""
fs.readFile('index.html',function(err,data){
    index=data
    server.listen(5055,()=>{
        console.log("server started");
    })
})

