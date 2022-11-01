const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
require('./Db/Config');
const Products=require('./Db/Products');
const app=express();
app.use(express.json())

const PORT=process.env.PORT || 5000;
// sdfrr
const User=require('./Db/User');
app.use(cors({'Access-Control-Allow-Origin': '*'}));
app.post('/api/register',async(req,res)=>{
    
console.log(req.body);
   const fuser=await User.findOne({email:req.body.email});
   const nuser=new User(req.body);
   console.log(fuser);
  try{
    if(fuser){
        res.json({
            status:'already exist',
            
        })
    }
    else{
        nuser.save((e)=>{
            res.json({
                status:'user created',
                data:req.body
            })
        })
    }
  }catch(e){
    console.log(e);
  }
})




app.get('/userlist',async(req, res)=>{
   
    const udata=await User.find();
  
    try{
        res.send(udata);
    }catch(e){
        console.log(e)
    }
})

app.get('/',(req,res)=>{
    res.send('working !')
})



app.post('/api/login',async(req,res)=>{
   
    const user =await User.findOne({email: req.body.email});
    
    try{
        if(!user){
            res.json({
                status: 'Invalid credentials'
            })
            
        }else{

            
            if(req.body.email!=user.email){
                res.json({

                    status:'Invalid credentials',
                    
                })
            }else if(req.body.password!=user.password){
                res.json({

                    status:'Invalid credentials',
                    
                })
            }else{
                res.json({

                    status:'ILoggedin',
                    
                })
            }
        }
        console.log(user.email)
        // res.json({
        //     user:user,
        // })
    }catch(e){
        console.log(e);
    }
    
})


const Product=require('./Db/Products');
app.post('/api/addproduct',async(req,res)=>{
    // res.send(req.body);
const data =await req.body;
const newproduct= new Product(data)
newproduct.save((e)=>{
    if(e){
        res.json({
            msg:"unable to save"
        })
    }else{
        res.json({
            msg:"added"
        })
    }
})
console.log(data);

})

app.get('/api/products',async(req,res)=>{
    const products=await Product.find();
    if(products!==''){
        res.json(products);
    }
    else{
        res.json("no product found!");
    }
})

app.delete('/api/products/:id',async(req,res)=>{
    const delpro=await Product.deleteOne({_id:req.params.id});
res.json(delpro);
})

app.get('/api/products/:id',async(req,res)=>{
    const getprod=await Product.findOne({_id:req.params.id});
    // console.log(typeof req.params.id)
    res.json(getprod);
})
app.patch('/api/upproducts/:id',async(req,res)=>{
    console.log(req.params.id)
    console.log(req.body);
    const uppro=await Product.updateOne({_id:req.params.id},{$set:req.body});
    res.json(uppro);
})
app.listen(PORT,()=>console.log('server is running'));


//app.post('/wefd',(req,res)=>{})
//thecn(()=>{})