const mongoose = require('mongoose');


// Define a schema for the URL pairs
const urlPairSchema = new mongoose.Schema({
       longUrl: String,
       shortId: String,
     });
     
     // Define a model for the URL pairs
     const UrlPair = mongoose.model('UrlPair', urlPairSchema);
module.exports=UrlPair;