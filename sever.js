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
    app.get('/api/blog/:path',async (req,res)=>{
        let result;
        if (req.params.path==='all') {
            result = await blogmodel.find({author:'小游'}).sort({'_id':-1});
        }
        else {
            result = await blogmodel.findOne({_id: req.params.path}).select({title:1,content:1,color:1});
        }
        res.send(result);
    });
    app.get('/api/img/:path',(req,res)=>{
        res.sendFile(__dirname+'/uploads/'+req.params.path)
    }),
    app.post('/api/add_blog',multer.array('file'),async (request,res)=>{
        let {title,author,content,color}=request.body;
        let img_list=request.files.map((item)=>{
            return "/api/img/"+item['filename']
        });
        await blogmodel.create({title, author, content, color,img_list});
        console.log(blogmodel);
        res.send('ok')
    });
    app.post('/api/edit_text',async (req,res)=>{
        let {_id,title,content,color}=req.body;
        await blogmodel.updateOne({_id:_id},{title,content,color,edited_time:''});
        res.send('ok')
    })

}).catch((err)=>{
    console.log('数据库链接失败',err)
});

app.listen(3000,(err)=>{
    if(!err) console.log('服务器启动');
    else console.log(err)
});
