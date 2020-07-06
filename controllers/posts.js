const Post = require ('../models/post');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name:'luisyge',
    api_key:'373913552331221',
    api_secret: process.env.CLOUDINARY_SECRET
})
module.exports = {
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render("posts/index", { posts });
    },

    postNew(req, res, next){
        res.render('posts/new');
    },

    async postCreate(req, res, next) {
        req.body.post.images = [];
        for(const file of req.files){
            let image = await cloudinary.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id,
            })
        }
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },

    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id)
        res.render('posts/show', { post })
    },

    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post })
    },

    async postUpdate(req, res, next) {
        // Handle any deletion of existin images
        // Handle upload of any new images
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post, {new: true});
        res.redirect(`/posts/${post.id}`);
    },

    async postDelete(req, res, next) {
        let post = await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts')
    }
} 