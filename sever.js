let express=require('express');
let multer=require('./multer');
let path=require('path');
let db=require('./db');
let blogmodel=require('./model/blogmodel');
let bodyParser=require('body-parser');
let app=express();


db.then(()=>{
    app.use(express.static(path.join(__dirname, 'dist')));
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended:true}));
    app.get('/',(request,res)=>{
        res.sendFile(__dirname+'/dist')
    });
    app.get('/api/blog',async (request,res)=>{
        let result = await blogmodel.find({author:'小游'}).sort({'_id':-1})
        res.send(result);
    });
    app.get('/api/img/:path',(req,res)=>{
        console.log(req.params.path);
        res.sendFile(__dirname+'/uploads/'+req.params.path)
    }),
    app.post('/api/addblog',multer.array('file'),async (request,res)=>{
        // console.log(request.body);
        // console.log(request.files);
        let {title,author,content,color}=request.body;
        let img_list=request.files.map((item)=>{
            return "/api/img/"+item['filename']
        });
        await blogmodel.create({title, author, content, color,img_list});
        console.log(blogmodel);
        res.send('ok')
    });
}).catch((err)=>{
    console.log('数据库链接失败',err)
});

app.listen(3000,(err)=>{
    if(!err) console.log('服务器启动');
    else console.log(err)
});
