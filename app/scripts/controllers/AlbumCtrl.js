(function() {
     function AlbumCtrl() {
       this.albumData = angular.copy(albumPicasso);
       this.songs =[];
       for(var i=0; i < albumData.songs.length; i++){
          this.songs.push(albumData.songs[i]);
       }
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();
