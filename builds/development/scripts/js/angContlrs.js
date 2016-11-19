var mainCtrls = angular.module('mainCtrls', []);

mainCtrls.controller('OneController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/profile/dude').
    success(function(data) {
        $scope.dude = data;
    });

    angular.element(document).ready(function() {
        //$('.profile').html('hello');


        function getInternetExplorerVersion()
        // Returns the version of Internet Explorer or a -1
        // (indicating the use of another browser).
        {
            var rv = -1; // Return value assumes failure.
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) !== null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        }

        function checkVersion() {
            var msg = "You're not using Internet Explorer.";
            var ver = getInternetExplorerVersion();

            if (ver > -1) {
                if (ver <= 9.0) {
                    $('.animeIconsCntr').append('<div class="centerOverlay">' + $scope.dude.user.ieNotSupported + '</div><div class="animeDiableLayer"></div>');
                    msg = "You should upgrade your copy of Internet Explorer.";
                } else {
                    msg = "You're using a recent copy of Internet Explorer.";
                }

            }
            //alert(msg);
        }
        checkVersion();

    });

}]);


mainCtrls.controller('DateYear', ['$scope', function($scope) {
    $scope.date = new Date();
}]);

mainCtrls.controller('flickrApi', ['$scope', '$http', function($scope, $http) {

    $scope.results = [];
    var counter = 0;

    $scope.searchFlickr = function() {

        $http({
            method: 'GET',
            url: 'https://api.flickr.com/services/rest',
            params: {
                method: 'flickr.photos.search', //'flickr.groups.pools.getPhotos',
                api_key: '11bb512423059ce111bd673c98cdbcc4', //'68c3c94595322226822b36ad9bafe209',
                //group_id: '38436807@N00',
                per_page: '100',
                text: $scope.searchTerm,
                format: 'json',
                nojsoncallback: 1
            }
        }).success(function(data) {
            //console.log('api success');
            $scope.results = data;

            $('.flickrCntr').html('');
            counter = 0;

            $.each(data.photos.photo, function(i, item) {

                var flickrSize = "<img src='" + "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_z.jpg' />";
                $(flickrSize).load(function() {
                    if (this.width == 640 && this.height == 427 && counter <= 7) {
                        flickrTemp = "<div class='col-xs-6 col-sm-4 col-md-3 flickrApi-item'><img class='flickrCntr-img' src='" + "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_z.jpg' title='" + item.title + "' /></div>";

                        $('.flickrCntr').append(flickrTemp);
                        counter++;
                    }
                    //console.log(flickrSize);
                });
            });
            //console.log(counter);
        }).error(function(error) {
            console.log('flickr api failed');
        });

    };
}]);