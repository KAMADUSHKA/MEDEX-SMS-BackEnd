const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true
    },
    url:{
        type:String,
        // required:true,
    },
    description:{
        type:String
    }
});

const subjectSchema = new mongoose.Schema({
    subject: {
        type:String,
        // required:true
    },
    links: {
        type: [linkSchema],
        // required:true
    }
});

module.exports = mongoose.model('ZoomSessions',subjectSchema);