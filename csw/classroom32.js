var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

var classrooms = [{'id':0,'name':'pooh','start': 21.30,'end':23.00}, 
			 {'id':1, 'name':'vinnie','start': 11.15,'end':13.12} 
			 ]
var classroomIndex=2;

app.use(express.static('public'))

router.route('/classrooms') 
     // get all the classrooms (accessed at GET http://localhost:8000/api/classrooms)
    .get(function(req, res) {    	
		res.json(classrooms);
    })

    // insert a new classroom
	.post(function(req, res) { 
		var classroom = {}; 		 
		classroom.id =  classroomIndex++;			
		classroom.name = req.body.name
		classroom.start = req.body.start
		classroom.end = req.body.end		
		classrooms.push(classroom);
		res.json( {message: 'classroom created!'} )
	}) 

// get a single classroom
router.route('/classrooms/:classroom_id')
	.get (function(req,res) {
    	res.json(classrooms[req.params.classroom_id])
    })

	.put (function(req,res) {
		var id = req.params.classroom_id		
		classrooms[id].name = req.body.name;  // update the classrooms info
       	classrooms[id].start = req.body.start;  // update the classrooms info
		classrooms[id].end = req.body.end; 
        res.json({ message: 'classroom updated!' });        
     })

    .delete (function(req,res) {
	var id = req.params.classroom_id
	delete 	classrooms[id]
      	  res.json({ message: 'classroom deleted!' });        
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
