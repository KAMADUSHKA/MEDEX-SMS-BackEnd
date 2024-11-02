const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    topic : {
        type: String,
        require:true
    },
    description : {
        type: String,
        require:true
    },
    postCatagory : {
        type: String,
        require:true
    },
}); 

module.exports = mongoose.model('post',postSchema);