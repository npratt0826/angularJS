(function() {
    function SongPlayer($rootScope, Fixtures) {
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

            currentBuzzObject.bind('timeupdate', function(){
              $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
              });
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
        * @type {number}
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
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        SongPlayer.currentVolume = 80;

        /**
        * @function setVolume
        * @desc sets volume of currently playing song
        * @type {number}
        */
        SongPlayer.setVolume = function(newVolume) {
          if(currentBuzzObject){
            currentBuzzObject.setVolume(newVolume);
            SongPlayer.currentVolume = currentBuzzObject.getVolume();
          }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {number} time
        */

        SongPlayer.setCurrentTime = function(time) {
          if(currentBuzzObject) {
            currentBuzzObject.setTime(time);
          }
        };

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
           if(SongPlayer.currentTime === SongPlayer.currentSong.duration){
             var currentSongIndex = getSongIndex(song);
             var nextSong = currentAlbum.songs[currentSongIndex + 1];
             setSong(nextSong);
             playSong(nextSong);
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
         * @type {number}
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
         * @type {number}
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

        SongPlayer.mute = function() {
          if(currentBuzzObject){
            currentBuzzObject.mute();
            SongPlayer.currentVolume = null;
          }
        };
        SongPlayer.unmute = function() {
          if(currentBuzzObject){
            currentBuzzObject.unmute();
            SongPlayer.currentVolume = 80;
          }
        };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
