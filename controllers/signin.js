const handleSignin = (req, res, db, bcrypt, saltRounds) => {
	db.select('email', 'hash').from('login')
	  .where('email', '=', req.body.email)
	  .then(data => {
		bcrypt.compare(req.body.password, data[0].hash, function(err, result) {
    		if(result) {
    			return db.select('*').from('users')
    			.where('email', '=', req.body.email)
    			.then(user => {
    						res.json({
    							id: user[0].id,
    							name: user[0].name,
    							entries: user[0].entries
    						})
    			})
                .catch(err => res.json('invalid creds'))
    		} 
		})
	  })
      .catch(err=>res.status(400).json('invalid creds'))
}

module.exports = {
    handleSignin: handleSignin
};