const Post = require('../models/post');
const Review = require('../models/review');


module.exports = {
	// Reviews Create
	async reviewCreate(req, res, next) {
		// find the post by its id
		let post = await Post.findById(req.params.id).populate('reviews').exec();
		// Nos saca un array con las reviews cuyo autor
		// coinciden con el autor de la review por lo que
		// si el que pretende hacer una review ahora pretende
		// hacer otra review el tamaño del array será mayor que 0
		// en teoria deberia ser uno. Si todavia no ha publicado
		// ninguna review el tamaño será igual a 0
		let haveReviewed = post.reviews.filter(review => {
			return review.author.equals(req.user._id);
		}).length;
		if(haveReviewed){
			req.session.error = "Sorry, solo puedes crear una review por post";
			return res.redirect(`/posts/${post.id}`);
		}
		// create the review
		req.body.review.author = req.user._id;
		let review = await Review.create(req.body.review);
		// assign review to post
		post.reviews.push(review);
		// save the post
		post.save();
		// redirect to the post
		req.session.success = 'Review created successfully!';
		res.redirect(`/posts/${post.id}`);
	},
	// Reviews Update
	async reviewUpdate(req, res, next) {
		await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
		req.session.success = 'Review updated succesfully'
		res.redirect(`/posts/${req.params.id}`);
	},
	
	// Reviews Destroy
	async reviewDelete(req, res, next) {
		await Post.findByIdAndUpdate(req.params.id, {
			$pull: { reviews: req.params.review_id}
		});
		await Review.findByIdAndRemove(req.params.review_id);
		req.session.success = 'Review deleted succesfully'
		res.redirect(`/posts/${req.params.id}`);
	}
}
