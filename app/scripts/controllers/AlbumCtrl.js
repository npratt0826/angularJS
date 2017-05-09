(function() {
<<<<<<< HEAD
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
=======
    function AlbumCtrl (Fixtures) {
        this.albumData = Fixtures.getAlbum();
>>>>>>> checkpoint-6-services
    }

    angular
        .module('blocJams')
<<<<<<< HEAD
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
=======
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
>>>>>>> checkpoint-6-services
})();
