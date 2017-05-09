(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
         * @desc creates variable for album Object
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

          /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
          };

          /**
          *@function playSong
          * @desc Plays song if SongPlayer.currentSong is not the song clicked
          * @param {object} song
          */

        var playSong = function(song) {
            currentBuzzObject.play()
            song.playing = true;
        };

        /**
        * @function stopSong
        * @desc stops currentBuzzObject playing and returns song.playing to null
        * @param {Object} song
        */
        var stopSong = function(song) {
          currentBuzzObject.stop()
          SongPlayer.currentSong.playing = null;
        };

        /**
        * @function getSongIndex
        * @desc uses currentAlbum to find index # of song
        * @param {Object} song
        * @type number
        */
        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
        };

        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */

        SongPlayer.play = function (song) {
          song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {

             setSong(song);
             playSong(song);

           } else if (SongPlayer.currentSong === song) {
             if(currentBuzzObject.isPaused()){
               playSong(song);
             }
           }
         };

         /**
         * @function pause
         * @desc Pause current song
         * @param {Object} song
         */

         SongPlayer.pause = function(song) {
           song = song || SongPlayer.currentSong;
           currentBuzzObject.pause();
           song.playing = false;
         };

         /**
         * @function SongPlayer.previous
         * @desc finds currentSongIndex of currentSong and subtracts the index by 1
         * @type number
         */
         SongPlayer.previous = function() {
           var currentSongIndex = getSongIndex(SongPlayer.currentSong);
           currentSongIndex--;

           if(currentSongIndex < 0) {
             stopSong(song);
           } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
           }

         };

         /**
         * @function SongPlayer.next
         * @desc finds currentSongIndex of current song and moves up the index by 1
         * @type number
         */
        SongPlayer.next = function () {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if(currentSongIndex == currentAlbum.songs.length){
            stopSong(song);
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
        };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
