let db=require('./db');
let blogmodel=require('./model/blogmodel');


;(async ()=>{
    await db;
    let result = await blogmodel.find({author:'小游'});
    console.log(result)
})();
