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

    getScore: function(mp1, mp2) {

      var num_genres_same = 0;
      var num_artists_same = 0;
      var num_songs_same = 0;
      
      var genres_1 = new Set(mp1.genres);
      var artists_1 = new Set(mp1.artists);
      var songs_1 = new Set(mp1.songs);
      
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

      mp2.songs.forEach(genre => {
        if (songs_1.has(genre)) {
          num_songs_same++;
        }
      });

      var genre_length = mp1.genres.length < mp2.genres.length ? mp1.genres.length : mp2.genres.length;
      var artist_length = mp1.artists.length < mp2.artists.length ? mp1.artists.length : mp2.artists.length;
      var songs_length = mp1.songs.length < mp2.songs.length ? mp1.songs.length : mp2.songs.length;
      
      var genre_score;
      var artist_score;
      var song_score;

      genre_score = genre_length != 0 ? num_genres_same / genre_length : 0;
      artist_score = artist_length != 0 ? num_artists_same / artist_length : 0;
      song_score = songs_length != 0 ? num_songs_same / songs_length : 0;

      // want to factor in # too, not just %s
      var totals = num_genres_same + num_artists_same + num_songs_same

      const weights = {
        genres: totals / 4,
        artists: totals / 4,
        songs: totals / 2
      };

      return totals + (genre_score * weights.genres) + (artist_score * weights.artists) + (song_score * weights.songs);

    }
  };
})();