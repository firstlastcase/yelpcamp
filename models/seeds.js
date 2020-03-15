let mongoose    = require("mongoose"),
    Campground  = require("./campground"),
    Comment     = require("./comment");
    
let seeds = [ 
    {name: "salmoncreek"            , location: "location of campground1", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/bents-basin-state-conservation-area/bents-basin-campground/bents-basin-campground-01.jpg?w=460&hash=37440E25A3910D92E216BD469093FA4D5C724E6F"},
    {name: "Black Rocks campground" , location: "location of campground1", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/bundjalung-national-park/black-rocks-campground/black-rocks-campground-06.jpg?w=460&hash=AF86D9474D84A3FD92B9696E19DDD00BE1079030"},
    {name: "Depot Beach campground" , location: "location of campground1", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/cattai-national-park/cattai-campground/cattai-campground-05.jpg?w=460&hash=2FE66F779651863E22F2A19AD4A9981F8CD7FB77"},
    {name: "salmoncreek"            , location: "location of campground1", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/bents-basin-state-conservation-area/bents-basin-campground/bents-basin-campground-01.jpg?w=460&hash=37440E25A3910D92E216BD469093FA4D5C724E6F"},
    {name: "Black Rocks campground" , location: "location of campground1", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/bundjalung-national-park/black-rocks-campground/black-rocks-campground-06.jpg?w=460&hash=AF86D9474D84A3FD92B9696E19DDD00BE1079030"},
    {name: "Depot Beach campground" , location: "location of campground1", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/cattai-national-park/cattai-campground/cattai-campground-05.jpg?w=460&hash=2FE66F779651863E22F2A19AD4A9981F8CD7FB77"}
    ];

let aComment = {
    context: 'this campground is awesome, i liked it. showers, toilets and beautiful landscape',
    author: 'Homer'
};

async function seedDB(){
    try {
        //remove campgrounds
        await Campground.deleteMany({});
        //remove comments
        await Comment.deleteMany({});
        // create campgrounds from the array
        for (const seed of seeds){
            let theCampground = await Campground.create(seed);
            // create a comment in the db
            let theComment = await Comment.create(aComment);
            //push a comment for each campground
            theCampground.comments.push(theComment);
            theCampground.save();
            }
        }
    catch(err) {
        console.log(err);
    }
}
module.exports = seedDB;