const Post = require ('../models/post');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
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
        let response = await geocodingClient
        .forwardGeocode({
          query: req.body.post.location,
          limit: 1,
        })
        .send();
        req.body.post.coordinates = response.body.features[0].geometry.coordinates
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
        // find post by id
        let post = await Post.findById(req.params.id);
        // check if there's any images for deletion
        if(req.body.deleteImages && req.body.deleteImages.length){
            // assign deleteImages fron req.body to its own variable
            let deleteImages = req.body.deleteImages;
            //loop over deleteImages
            for(const public_id of deleteImages){
                // delete images from cloudinary
                await cloudinary.uploader.destroy(public_id);
                // delete image from post.images
                for(const image of post.images){
                    if(image.public_id === public_id){
                        let index = post.images.indexOf(image)
                        // quit the image from the array using splice
                        post.images.splice(index, 1);
                    }
                }
            }
        }
        // check if there are any new images to upload
        if(req.files){
            // add images to post.images array
            for(const file of req.files){
                let image = await cloudinary.uploader.upload(file.path);
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id,
                })
            }
        }
        // Update the location
        if(req.body.post.location !== post.location){
            let response = await geocodingClient
            .forwardGeocode({
              query: req.body.post.location,
              limit: 1,
            })
            .send();
            post.coordinates = response.body.features[0].geometry.coordinates;
            post.location = req.body.post.location;
        }
        // Update the other stuff
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        // and save
        post.save(); 
        // Redirect to posts page
        res.redirect(`/posts/${post.id}`);
    },

    async postDelete(req, res, next) {
        // we want to delete the post and the photos from cloudinaty
        let post = await Post.findById(req.params.id);
        for(const image of post.images){
            await cloudinary.uploader.destroy(image.public_id);
        }
        await post.remove();
        res.redirect('/posts')
    }
} 