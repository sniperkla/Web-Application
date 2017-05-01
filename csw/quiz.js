var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

var projects = [{'id':0,'name':'5635512063 Anti-theft System','like': 57,'share': 14}, 
			 {'id':1, 'name':'5635512017 Phuket RO Water System','like': 51,'share': 13} 
			 ]
var projectIndex=2;

app.use(express.static('public'))

router.route('/projects') 
     // get all the projects (accessed at GET http://localhost:8000/api/projects)
    .get(function(req, res) {    	
    	res.json(projects);
    })

    // insert a new project
	.post(function(req, res) { 
		var project = {}; 		 
		project.id =  projectIndex++;			
		project.name = req.body.name
		project.like = req.body.like
		project.share = req.body.share			
		projects.push(project); 
		res.json( {message: 'Project updated!'} )
	}) 

// get a single project
router.route('/projects/:project_id')
	.get (function(req,res) {
    	res.json(projects[req.params.project_id])
    })

	.put (function(req,res) {
		var id = req.params.project_id		
		projects[id].name = req.body.name;  // update the projects info
       	projects[id].like = req.body.like;  // update the projects info
		projects[id].share = req.body.share;  // update the projects info
        res.json({ message: 'Project updated!' });        
     })

       .delete (function(req,res) {
	var id = req.params.project_id
	delete 	projects[id]
      	  res.json({ message: 'Project deleted!' });        
    })

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }) 
});

// all of our routes will be prefixed with /api 
app.use('/api', bodyParser.json(), router);   //[use json]
//app.use('/api', bodyParser.urlencoded({ extended: false }), router); 

app.use("*",function(req,res){
  res.status(404).send('404 Not found');
 // res.sendFile(__dirname + "/public/404.html");
});

app.listen(80, function() {
	console.log("Server is running")
});
