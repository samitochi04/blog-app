const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Blog', BlogSchema);
