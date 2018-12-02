const SongkickAdapter = require("../adapters/SongkickAdapter");
const Concert = require('../models/Concert');

function checkConcert(id,concertData) {
  return Concert.findByConcertId(id)
    .then(concert => {
      if(concert === null)
      {
        Concert.create(id, concertData)
        .then(data => {
          console.log(JSON.stringify(data));
        })
      }
    })
}

function getConcerts(req, res) {
  SongkickAdapter.getEventsByMetroArea({})
    .then(function(concertData) {
      var promises = concertData.map(songkickConcert => {
        //check if this concert is in db and add if its not
        var concert = {};
        concert.id = songkickConcert.id;
        concert.name = songkickConcert.displayName;
        concert.url = songkickConcert.uri;
        concert.venue = songkickConcert.venue.displayName;
        concert.location = songkickConcert.location.city;
        concert.artist = songkickConcert.performance[0].displayName;
        concert.date = songkickConcert.start.datetime;
      
        return checkConcert(concert.id, concert);
      })

      Promise.all(promises).then(data =>
      {
        res.json(concertData);
      });
    })
    .catch(function(error) {
      res.send(error);
    });
}

function deleteAll(req,res){
  Concert.deleteAll()
    .then(concerts => res.send(JSON.stringify(concerts)))
    .catch(error => res.send(error))
}

function getAllConcerts(req, res) {
  Concert.findAll()
    .then(concerts => res.send(JSON.stringify(concerts)))
    .catch(err => res.send(err));
}





module.exports = {
  getConcerts,
  deleteAll,
  getAllConcerts,
};
