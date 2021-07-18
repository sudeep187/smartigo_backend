const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    if( !req.body.email || !req.body.name || !req.body.password ) {
        res.status(400).json('Fill all the fields') 
    }
    else if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(req.body.email)){

     bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: req.body.email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: req.body.name,
                        joined: new Date()
                    })
                    .then(user => {
                            res.json({
                                id: user[0].id,
                                name: user[0].name,
                                entries: user[0].entries
                            })
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'))
      })
    }
    else {
        res.status(400).json('invalid email id')
    }
}

module.exports = {
    handleRegister: handleRegister
};