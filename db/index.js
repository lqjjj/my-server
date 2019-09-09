//链接数据库暴露promise
let mongoose= require('mongoose');
mongoose.set('useCreateIndex',true);
const DB_NAME='demo';
const DB_URL='localhost:27017';

module.exports=new Promise((resolve,reject)=>{
    mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`,{useNewUrlParser: true});
    mongoose.connection.on('open',(err)=>{
        if(!err){
            console.log('数据库链接成功');
            resolve()
        }
        else{
            console.log(err);
            reject()
        }
    });
});
