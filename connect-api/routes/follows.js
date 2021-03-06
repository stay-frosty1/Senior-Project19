var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');



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
router.post('/', (req,res) => {
	const {user1, user2,v} = req.body;
	if(user2>0)
	console.log("user " + user1 + " now following user:" + user2);
	else
		console.log("user " + user1 + " now following venue:" + v);
	if(false)
	{

	}else{
		// The followname wasn't found in the database
		// Create insert query for new follow
		// Added a comment
		new_follow = "CALL add_follow(?,?,?,?)";
		// Execute the query to insert into the database
		con.query(new_follow,[user1, user2,v , 'follow'], (err, results) => {
			if (err) throw err;
			res.status(201).jsonp({results}).end;
		})

	}
});

// updates all follows
router.put('/', (req,res) => {

	// The followname wasn't found in the database
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

	// The followname wasn't found in the database
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


// Creates a new follow
router.post('/buddies', (req,res) => {
	const {user1, user2} = req.body;


	if(false)
	{

	}else{
		// The followname wasn't found in the database
		// Create insert query for new follow
		// Added a comment
		new_buddy = "CALL add_buddy(?,?)";
		console.log("user " + user1 + " now buddies with:" + user2 );
		// Execute the query to insert into the database
		con.query(new_buddy,[user1, user2], (err, results) => {
			if (err) throw err;
			res.status(201).jsonp({results}).end;
		})

	}
});

// Grab specific follow by their id
router.get('/:venueId', (req,res) => {
	const venueId = req.params.venueId;

	get_venue  = "call get_venue(?)";
	con.query(get_venue, [venueId],(err, results) => {
		if (err) throw err;
		res.status(200).jsonp({msg:'follow info:',results}).end;
	})
});

// Grab specific follow by their id
router.get('/:userId', (req,res) => {
	const userId = req.params.userId;

	get_user  = "call get_user(?)";
	con.query(get_user, [userId],(err, results) => {
		if (err) throw err;
		res.status(200).jsonp({msg:'follow info:',results}).end;
	})
});

// Grab specific follow by their id
router.get('/:userId', (req,res) => {
	const userId = req.params.userId;

	get_buddy  = "call get_buddy(?)";
	con.query(get_buddy, [userId],(err, results) => {
		if (err) throw err;
		res.status(200).jsonp({msg:'follow info:',results}).end;
	})
});

// updates all users
router.put('/', (req,res) => {

	// The username wasn't found in the database
	// Create insert query for new user
	// Added a comment
	new_followerUser = "CALL update_followersUser()";
	// Execute the query to insert into the database
	con.query(new_follower,(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// updates all users
router.put('/', (req,res) => {

	// The username wasn't found in the database
	// Create insert query for new user
	// Added a comment
	new_followerVenue = "CALL update_followersVenue()";
	// Execute the query to insert into the database
	con.query(new_follower,(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// updates all users
router.put('/', (req,res) => {

	// The username wasn't found in the database
	// Create insert query for new user
	// Added a comment
	new_followerBuddy = "CALL update_followersBuddy()";
	// Execute the query to insert into the database
	con.query(new_follower,(err, results) => {
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
	const followId = req.params.followId;
	const {user1, user2, ven, ty} = req.body;
	console.log("via put follow updated with id: " + followId);
	update_follow = "CALL update_follow(?,?,?,?,?)";

	con.query(update_follow,[followId,user1, user2, ven, ty[0]],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// updates all follows
router.patch('/:followId', (req,res) => {
	const followId = req.params.followId;
	const {user1, user2, ven, ty} = req.body;
	console.log(" via patch follow updated with id: " + followId);
	update_follow = "CALL update_follow(?,?,?,?,?)";

	con.query(update_follow,[followId,user1, user2, ven, ty[0]],(err, results) => {
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