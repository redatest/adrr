angular.module('adrrApp.wrapper.autocomp_truck', [], null).

    
    controller('myCtrl2', function($scope, Restangular){
        
        
        $scope.trucklist = [];
        var li = [];

        // getting list of available truck
        Restangular.all('eng/labTruck').getList().then(function(data){

            for (var i = data.length - 1; i >= 0; i--) {
                var elem = {};
                elem.truck = data[i]['truck'];
                li.push(elem);
            };
            $scope.trucklist = li;

        });

        // for testing : to be deleted later
        $scope.trucklist2 = [
            { 'truck' : 'Blaze Commando' },
            { 'truck' : 'Uncovered Clues' },
            { 'truck' :  '1112323'},
            { 'truck' :  '11'}
        ];

        $scope.truck = null;
        
        

    }).
    directive('truckAutocomplete', ['$http', function($http) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {

            function filtertruck(array, term) {
                var matcher = new RegExp('(' + $.ui.autocomplete.escapeRegex(term) + ')', 'gi');
                return $.grep(array, function (item) {
                    return matcher.test(item.truck);
                });
            }

            function highlighttruck(text, term) {
                var matcher = new RegExp('(' + $.ui.autocomplete.escapeRegex(term) + ')', 'gi');
                return text.replace(matcher, '<strong>$1</strong>');
            }

            // elem is a jquery lite object if jquery is not present, but with jquery and jquery ui, it will be a full jquery object.
            elem.autocomplete({
                source: function(request, response) {

                    // console.log(Restangular.all('eng/labtruck').getList());

                    response(filtertruck(scope.trucklist, this.term));
                },
                focus: function(event, ui) {

                    return false;
                },
                select: function(event, ui) {

                    scope.truck = parseInt(ui.item.label);
                    scope.$apply();
                    return false;
                },
                appendTo : attr.appendTo

            }).data("ui-autocomplete")._renderItem = function(ul, item) {

                item.label = item.truck;

                var truckNameHighlighted = highlighttruck(item.truck, this.term);


                var truckLine = $("<div>").html(truckNameHighlighted);

                return $("<li>").append("<a>" + $("<div>").append(truckLine).html() + "</a>").appendTo(ul);
            };
        }
    }
}]);
