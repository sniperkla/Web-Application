var express = require('express'),
	app = express(),
	router = express.Router(),
	bodyParser = require('body-parser')
  
var posts = [{'id':0,'timage':'https://scontent.fbkk5-2.fna.fbcdn.net/v/t31.0-8/s960x960/15844766_612985515551606_3853759802908287949_o.jpg?oh=40a28bec085e9fd1e1397e1200924712&oe=59BFB261','name':'Piyaphun','comment':'เรียนอ่ะอยากเลิกไว แต่รักใครไม่อยากเลิกเร็ว💓' },
			 {'id':1,'timage':'https://scontent.fbkk5-2.fna.fbcdn.net/v/t1.0-9/15940681_1052273371568845_3310995059145620796_n.jpg?oh=0b6a04972dd93b20e3e51a7d98dfc908&oe=59BEA2C9','name':'Janjira','comment':'❤เรี่องคิดเลขอ่ะเกรด1เรื่องคิดถึงอ่ะเกรด4❤'},
			 {'id':2,'timage':'https://scontent.fbkk5-2.fna.fbcdn.net/v/t1.0-9/1236263_491911204244005_660416981911721022_n.jpg?oh=e38da3bb74b94d7e197a12d108eaa817&oe=597F5715','name':'Katanyoo','comment':'การเรียนอ่ะเรื่องจิ๊บๆ ที่เห็นเลือดซิบๆอ่ะนั่นหนามบาด💓💓'}]
var postIndex = 3;
app.use(express.static('public')) 
router.route('/posts') 
	.get( function(req,res) {
		res.json(posts);
	})

	.post(function(req, res) { 
	    var post = {}; 
	    post.id = postIndex++
		post.timage = req.body.timage
	    post.name = req.body.name
	    post.comment = req.body.comment
	    posts.push(post); 
	    // res.json(posts); 
	    res.json({ message: 'Added a new post'} ) 
	})
  
router.route('/posts/:post_id')
	.get(function(req,res){
		res.json(posts[req.params.post_id] )
	})

	.put(function(req,res){
		var id = req.params.post_id
		posts[id].timage = req.body.timage
		posts[id].name = req.body.name
		posts[id].comment = req.body.comment
		// res.json(posts[id])
		res.json({message: 'Post updated'})
	})

	.delete(function(req,res){
		var id = req.params.post_id
		delete posts[id]
		// res.json(posts)
		res.json({message: 'Post deleted'})
	})

// all of our routes will be prefixed with /api 
app.use('/api', bodyParser.json(), router)
// app.use('/api',bodyParser.urlencoded({extended:false}), router)

app.listen(50091, function() {
	console.log('server is running...')
})
