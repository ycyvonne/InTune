module.exports = (() => {
  return {

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    generateRandomString: function(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },

    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     * @returns {Array} Shuffled array
     */
    shuffle: function(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },

    /**
     * Generates a similarity score between two users
     * @param {*} mp1 
     * @param {*} mp2
     * @returns {Number} The similarity score
     */
    getScore: function(mp1, mp2) {

      if (!mp1 || !mp2)  return 0;
      if(!Object.keys(mp1).length || !Object.keys(mp2).length) return 0;

      var num_genres_same = 0;
      var num_artists_same = 0;
      var num_tracks_same = 0;
      
      var genres_1 = new Set(mp1.genres);
      var artists_1 = new Set(mp1.artists);
      var tracks_1 = new Set(mp1.tracks);
      
      mp2.genres.forEach(genre => {
        if (genres_1.has(genre)) {
          num_genres_same++;
        }
      });

      mp2.artists.forEach(genre => {
        if (artists_1.has(genre)) {
          num_artists_same++;
        }
      });

      mp2.tracks.forEach(genre => {
        if (tracks_1.has(genre)) {
          num_tracks_same++;
        }
      });

      var genre_length = mp1.genres.length < mp2.genres.length ? mp1.genres.length : mp2.genres.length;
      var artist_length = mp1.artists.length < mp2.artists.length ? mp1.artists.length : mp2.artists.length;
      var tracks_length = mp1.tracks.length < mp2.tracks.length ? mp1.tracks.length : mp2.tracks.length;
      
      var genre_score;
      var artist_score;
      var track_score;

      genre_score = genre_length != 0 ? num_genres_same / genre_length : 0;
      artist_score = artist_length != 0 ? num_artists_same / artist_length : 0;
      track_score = tracks_length != 0 ? num_tracks_same / tracks_length : 0;

      // want to factor in # too, not just %s
      var totals = num_genres_same + num_artists_same + num_tracks_same

      const weights = {
        genres: totals / 4,
        artists: totals / 4,
        tracks: totals / 2
      };

      return totals + (genre_score * weights.genres) + (artist_score * weights.artists) + (track_score * weights.tracks);

    }
  };
})();