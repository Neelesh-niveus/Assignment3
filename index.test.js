const dbconnect=require('./index');

test("testing for dbconnect function",async()=>{
    const collection=await dbconnect();
    const data=await collection.find({}).toArray();
    expect(data).not.toBe(null);
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].name).toEqual("karthik");
    expect(data[0].email).toEqual("karthik@gmail.com");
    expect(data[1].name).toEqual("chethan");
    expect(data[1].email).toEqual("chethan@gmail.com");
    expect(data[2].name).toEqual("sampath");
    expect(data[2].email).toEqual("sampath@gmail.com");
   
})