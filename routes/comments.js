let Campground  = require("../models/campground.js"),
    express     = require("express"),
    router      = express.Router(),
    Comment     = require("../models/comment.js");


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
// app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err,foundOne){
        if(err){
            console.log("error finding the campground with id: "+req.params.id);
            res.redirect("/campgrounds");
        }else{
            res.render("comments/new",{campground:foundOne});
        }
    });
    
});


router.post("/campgrounds/:id/comments/",isLoggedIn,function(req, res){
// app.post("/campgrounds/:id/comments/",function(req, res){
    Campground.findById(req.params.id, function(err,foundOne){
        if(err){
            console.log("error finding the campground with id: "+req.params.id + "this is the err"+ err);
            res.redirect("/campgrounds");
        }else{
            // console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, commentCreated){
                if(err){
                    console.log("error creating comment "+ err);
                    res.redirect("/campgrounds/:id/");
                }else{
                    foundOne.comments.push(commentCreated);
                    foundOne.save();
                    res.redirect("/campgrounds/"+foundOne._id);
                }
            });
        }
    });
});

module.exports = router;