(function() {
     function AlbumCtrl() {
      //  this.albumData = [];
       this.albumData = angular.copy(albumPicasso);
       console.log(this.albumData);
       this.songs =[];
       var songsLength = this.albumData.songs.length;
       for(var i=0; i < songsLength; i++){
          this.songs.push(this.albumData.songs[i]);
       }
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();
