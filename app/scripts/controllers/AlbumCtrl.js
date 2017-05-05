(function() {
     function AlbumCtrl(Fixtures) {
       this.albumData = Fixtures.getAlbum();
       this.songs =[];
       var songsLength = this.albumData.songs.length;
       for(var i=0; i < songsLength; i++){
          this.songs.push(this.albumData.songs[i]);
       }
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
 })();
