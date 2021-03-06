var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');



// Grabs all follows from db
router.get('/', (req,res) => {
	// Find all follows from database
	follow_list = "CALL get_follows()";


	console.log(req.query);

	con.query(follow_list, (err, results) => {
		if (err) throw err;

		res.status(200).jsonp({results}).end;

	})
});


// Creates a new follow
// For venue pass in the venue_id instead of the user2 ID
router.post('/', (req,res) => {
	const {usr, ven, ty} = req.body;

	console.log("user " + user1 + " now following venue :" + ven);
	if(false)
	{

	}else{
		// The follow name wasn't found in the database
		// Create insert query for new follow
		// Added a comment
		new_follow = "CALL follow_venue(?,?)";
		// Execute the query to insert into the database
		con.query(new_follow,[usr, ven, ty[0]], (err, results) => {
			if (err) throw err;
			res.status(201).jsonp({results}).end;
		})

	}
});

// updates all follows
router.put('/', (req,res) => {

	// The follow name wasn't found in the database
	// Create insert query for new follow
	// Added a comment
	new_follow = "CALL update_follows()";
	// Execute the query to insert into the database
	con.query(new_follow,(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// updates all follows
router.patch('/', (req,res) => {

	// The follow name wasn't found in the database
	// Create insert query for new follow
	// Added a comment
	new_follow = "CALL update_follows()";
	// Execute the query to insert into the database
	con.query(new_follow,(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})


});

// deletes all follows
router.delete('/', (req,res) => {
	delete_follows = "CALL delete_follows()";
	con.query(delete_follows, (err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})


});

// Grab specific follow by their id
router.get('/:followId', (req,res) => {
	const followId = req.params.followId;

	get_follow  = "call get_follow(?)";
	con.query(get_follow, [followId],(err, results) => {
		if (err) throw err;
		res.status(200).jsonp({results}).end;
	})
});

// updates follow
router.put('/:followId', (req,res) => {
    const followId = req.params.followId; //followId is the ID of the user
    ven = req.params.venueId;
    const {usr} = req.body;
    console.log("via put follow updated with id: " + followId);
    update_follow = "CALL update_follow_venue(?,?,?)";

    con.query(update_follow_venue,[followId, ven, usr],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all follows
router.patch('/:followId', (req,res) => {
	const followId = req.params.followId;
	ven = req.params.venueId;
	const {usr} = req.body;
	console.log(" via patch follow updated with id: " + followId);
	update_follow = "CALL update_follow_venue(?,?,?)";

	con.query(update_follow_venue,[followId, usr, ven],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// deletes follow
router.delete('/:followId', (req,res) => {
	const followId = req.params.followId;
	console.log(" deleting follow with follow id: " + followId);
	delete_follows = "CALL delete_follow(?)";
	con.query(delete_follows, [followId],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({msg:'follow deleted'}).end;
	})
});


module.exports = router;