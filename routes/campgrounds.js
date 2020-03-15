let Campground  = require("../models/campground.js"),
    express     = require("express"),
    router      = express.Router();



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

router.get("/campgrounds",function(req,res){
// app.get("/campgrounds",function(req,res){
    Campground.find({},function(err, foundCampgrounds){
        if(err){
            console.log("could not find any Campgrounds");
        }else{
            res.render("campgrounds/index", {campgrounds:foundCampgrounds});
        }
    
    });

});


router.post("/campgrounds", isLoggedIn, function(req, res){
    const newCampgroundName=req.body.campgroundName;
    const newCampgroundImage=req.body.campgroundImage;
    const newCampground = {name:newCampgroundName, location:"whatever", image:newCampgroundImage};
    
    Campground.create(newCampground,function(err,createdCampground){
        if(err){
            console.log("an Error has occured while trying to create a new campground!");
            console.log(err);
        }else {
            // console.log("a new campground has been created with the following details");
            res.redirect("/campgrounds");
        }
        
    });
});

router.get("/campgrounds/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id",function(req, res){
// app.get("/campgrounds/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundOne){
        if(err){
            console.log("some error happened here");
        }else{
            res.render("campgrounds/show",{campground:foundOne});
        }
    });

});


module.exports = router;