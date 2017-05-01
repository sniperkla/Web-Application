var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

var students = [{'stdid':5735512001,'name':'John Nuvo','score': 51}, 
			 {'stdid':5735512003,'name':'Joe Uveuveuvevue Osas','score': 91} 
			 ];

app.use(express.static('public'))

router.route('/students') 
     // get all the students (accessed at GET http://localhost:8000/api/students)
    .get(function(req, res) {    	
    	res.json(students);
    })

    // insert a new student
	.post(function(req, res) { 
		var student = {}; 			
		student.stdid = req.body.stdid			
		student.name = req.body.name
		student.score = req.body.score	
		students.push(student); 
		res.json( {message: 'student created!'} )
	}) 

// get a single student
router.route('/students/)
	.get (function(req,res) {
    	res.json(students[])
    })

	.put (function(req,res) {
		var 
		students[].stdid = req.body.stdid; 		
		students[].name = req.body.name;  // update the students info
       	students[].score = req.body.score;  // update the students info
		
        res.json({ message: 'student updated!' });        
     })

       .delete (function(req,res) {
	var 
	delete 	students[]
      	  res.json({ message: 'student deleted!' });        
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
