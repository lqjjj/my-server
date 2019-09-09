let multer=require('multer');
let storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./uploads')
    },
    filename:function (req,file,cb) {
        let arr=file.originalname.split('.');
        cb(null,arr[0]+' - '+new Date().toLocaleDateString()+'.'+arr[1]);
    }
});

let upload=multer({storage:storage});

module.exports=upload;
