const SongkickAdapter = require("../adapters/SongkickAdapter");
const Concert = require('../models/Concert');

/**
 * Checks if concert exists and persists if it does not
 * @param {*} id 
 * @param {*} concertData 
 */
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

/**
 * Calls Songkick API and returns information for multiple concerts
 * @param {*} req 
 * @param {*} res 
 */
function getConcerts(req, res) {
  var data;
  SongkickAdapter.getEventsByMetroArea({})
    .then(function(concertData) {
      data = concertData;
      var promises = concertData.map(songkickConcert => {
        //check if this concert is in db and add if its not
        var concert = {};
        concert.id = songkickConcert.id;
        concert.name = songkickConcert.displayName;
        concert.url = songkickConcert.uri;
        concert.venue = songkickConcert.venue.displayName;
        concert.location = songkickConcert.location.city;
        concert.artist = songkickConcert.performance[0].displayName;
        concert.artistId = songkickConcert.performance[0].artist.id;
        concert.date = songkickConcert.start.datetime;
        concert.data = JSON.stringify(songkickConcert);      
        return checkConcert(concert.id, concert);
      })

      return Promise.all(promises);
    })
    .then(_ => {
      return res.json(data);
    })
    .catch(function(error) {
      console.log("bad error:", error.message);
      res.send(error);
    });
}

/**
 * Deletes all concerts from DB
 * @param {*} req 
 * @param {*} res 
 */
function deleteAll(req,res){
  Concert.deleteAll()
    .then(concerts => res.send(JSON.stringify(concerts)))
    .catch(error => res.send(error))
}

/**
 * Gets all concerts from DB
 * @param {*} req 
 * @param {*} res 
 */
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
