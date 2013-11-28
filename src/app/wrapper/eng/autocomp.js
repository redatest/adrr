angular.module('adrrApp.wrapper.autocomp', [], null).

    
    controller('myCtrl', function($scope, Restangular){
        
        
        $scope.planlist = [];
        var li = [];

        // getting list of available Plants
        Restangular.all('eng/labPlant').getList().then(function(data){

            for (var i = data.length - 1; i >= 0; i--) {
                var elem = {};
                elem.plant = data[i]['plant'];
                li.push(elem);
            };
            $scope.planlist = li;

        });

        // for testing : to be deleted later
        $scope.planlist2 = [
            { 'plant' : 'Blaze Commando' },
            { 'plant' : 'Uncovered Clues' },
            { 'plant' :  '1112323'},
            { 'plant' :  '11'}
        ];

        $scope.plan = null;
        
        

    }).
    directive('planAutocomplete', ['$http', function($http) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {

            function filterPlan(array, term) {
                var matcher = new RegExp('(' + $.ui.autocomplete.escapeRegex(term) + ')', 'gi');
                return $.grep(array, function (item) {
                    return matcher.test(item.plant);
                });
            }

            function highlightPlan(text, term) {
                var matcher = new RegExp('(' + $.ui.autocomplete.escapeRegex(term) + ')', 'gi');
                return text.replace(matcher, '<strong>$1</strong>');
            }

            // elem is a jquery lite object if jquery is not present, but with jquery and jquery ui, it will be a full jquery object.
            elem.autocomplete({
                source: function(request, response) {

                    // console.log(Restangular.all('eng/labPlant').getList());

                    response(filterPlan(scope.planlist, this.term));
                },
                focus: function(event, ui) {

                    return false;
                },
                select: function(event, ui) {

                    scope.plan = parseInt(ui.item.label);
                    scope.$apply();
                    return false;
                },
                appendTo : attr.appendTo

            }).data("ui-autocomplete")._renderItem = function(ul, item) {

                item.label = item.plant;

                var planNameHighlighted = highlightPlan(item.plant, this.term);


                var planLine = $("<div>").html(planNameHighlighted);

                return $("<li>").append("<a>" + $("<div>").append(planLine).html() + "</a>").appendTo(ul);
            };
        }
    }
}]);
