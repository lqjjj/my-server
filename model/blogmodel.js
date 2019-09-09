let mongoose= require('mongoose');
let Schema=mongoose.Schema;
let blogSchema =new Schema({
    title:{
        type:String,
    },
    author:{
        type: String,
        required:true
    },
    content:{
        type:String,
    },
    color:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    edited_time:{
        type:Date,
        default: null
    },
    img_list:{
        type:Array,
        default: null
    }
});
module.exports = mongoose.model('blog',blogSchema);
