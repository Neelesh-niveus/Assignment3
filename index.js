const express =require('express');
const app=express();
const {MongoClient}=require('mongodb');
const url='mongodb://localhost:27017';
const client=new MongoClient(url);
app.use(express.json());

async function dbconnect(){
    let result=await client.connect();
    let db=result.db('mydbs');
    return db.collection('usersDetails');
    // let collection=db.collection('usersDetails');
    // let data=await collection.find({}).toArray();
    // console.log(data);
    // return data;
}

//dbconnect();
module.exports=dbconnect;




const port=7000;
app.get('',async(req,res)=>{
    let collection=await dbconnect();
    let data =await collection.find({}).toArray();
    //res.write("getting data from server");
    //console.log(data);
    res.send(data);
})

app.post('',async(req,res)=>{
  //console.log(req.body);
  let collection=await dbconnect();
  let data=await collection.insertOne(req.body);
  res.send(data);
   

})

app.put('/:name',async(req,res)=>{
    //res.send(req.body);
    let collection=await dbconnect();
    let data= await collection.updateOne(
        {name:req.params.name},
        { $set:req.body

        }
        )
    //console.log(data);
    res.send(data);
})
app.listen(port,()=>{
    console.log(`listening to port number ${port}`);
})