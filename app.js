// ########## ########## ########## ########## ########## ##########  
// ########## in this version (v7), cleaning the code by adding routes directory
// this is not exactly matching colt steele's v7 of the code.
// ########## ########## ########## ########## ########## ########## 
var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    express     = require("express"),
    passport    = require("passport"),                          //VERSION 6 code
	localStrategy = require("passport-local"),                  //VERSION 6 code
    passportLocalMongoose = require("passport-local-mongoose"), //VERSION 6 code
    app         = express(),
    User        = require("./models/user"),                     //VERSION 6 code
    seedDB      = require("./models/seeds"),
    Comment     = require("./models/comment");
    
let campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require('./routes/comments'),
    indexRoutes         = require('./routes/index');


app.use(bodyParser.urlencoded({extended: true}));   // bodyParser allows to get the variables from the body of the 
app.use(express.static(__dirname+"/public"));  // tell express to serve the contents of the public directory
app.set("view engine", "ejs");      // all the use of the name of the ejs files without specifying the .ejs extension each time

const serverIPAddress = "0.0.0.0";
const serverPort = "8080";

// ########## CHECKING DB CONNECTION & seeding the DB ########## 
mongoose.connect("mongodb://localhost:27017/demo",{useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error to the database:'));
db.once('open', function() {
  console.log("we're connected to the database!");
});

// seedDB();

// Passport configuration - VERSION 6 CODE
app.use(require("express-session")({
   secret: "human Brain can process a small amount of information at a time. Start with simple concepts" ,
   resave: false,
   saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
   res.locals.currentUser = req.user;
   next();
});


app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);


app.listen(serverPort, serverIPAddress,function(){
    console.log("server is running at port: "+serverPort+" and this IP: "+serverIPAddress);
    // console.log(mongoose.);
});