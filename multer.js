let multer=require('multer');
let storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'/opt/git/my-server/uploads')
    },
    filename:function (req,file,cb) {
        let arr=file.originalname.split('.');
        cb(null,new Date().toLocaleDateString()+file.originalname);
    }
});

let upload=multer({storage:storage});

module.exports=upload;
