angular.module('adrrApp.wrapper.autocomp', [], null).
    controller('myCtrl', function($scope){
        $scope.testname = 'med_reda';

        $scope.planlist = [
            { 'name' : 'Blaze Commando' },
            { 'name' : 'Uncovered Clues' },
            { 'name' :  '111'},
            { 'name' :  '11'}
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
                    return matcher.test(item.name);
                });
            }

            function highlightPlan(text, term) {
                var matcher = new RegExp('(' + $.ui.autocomplete.escapeRegex(term) + ')', 'gi');
                return text.replace(matcher, '<strong>$1</strong>');
            }

            // elem is a jquery lite object if jquery is not present, but with jquery and jquery ui, it will be a full jquery object.
            elem.autocomplete({
                source: function(request, response) {
                    // exemple on rest field
                    /*$http.get("/magicsupremacy/rest/api/1/card/search?name=" + this.term).success(function(data) {
                     response(data.cardslist);
                     });*/

                    response(filterPlan(scope.planlist, this.term));
                },
                focus: function(event, ui) {

                    return false;
                },
                select: function(event, ui) {

                    scope.plan = ui.item.label;
                    scope.$apply();
                    return false;
                },
                appendTo : attr.appendTo

            }).data("ui-autocomplete")._renderItem = function(ul, item) {

                item.label = item.name;

                var planNameHighlighted = highlightPlan(item.name, this.term);


                var planLine = $("<div>").html(planNameHighlighted);

                return $("<li>").append("<a>" + $("<div>").append(planLine).html() + "</a>").appendTo(ul);
            };
        }
    }
}]);
