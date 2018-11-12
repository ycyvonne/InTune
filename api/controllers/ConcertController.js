const SongkickAdapter = require('../adapters/SongkickAdapter');

function getConcerts(req, res){

	SongkickAdapter.getEventsByMetroArea({})
	.then(function(concertData) {
        res.json(concertData);
    })
    .catch(function(error) {
        res.json({'error': error})
    });
}

module.exports = {
    getConcerts
}