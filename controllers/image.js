const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'aedec4f900c042b08ee701bb1518b4b7'
});

const handleApiCall = (req, res) => {
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
        .then(data => {
        	res.json(data);
        })
        .catch(err => res.status(400).json('error with api call'))
}

const handleImage = (req, res, db) => {
	db('users')
		.where('id', '=', req.body.id)
		.increment('entries', 1)
		.returning('entries')
		.then(response => {
			res.json(response[0]);
		})
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};