var app = angular.module('adrrApp.wrapper.autocomp', [], null);

app.directive('planAutocomplete', ['$http', 'Restangular', function($http, Restangular) {
    return {
        restrict: 'A',
        // scope: {},
        link: function(scope, elem, attr) {


            var taken_list = null;

            // test on witch element -id- we are appliying the autocompletion
            var theid = elem.attr('id')
            switch (theid)
            {
                case 'plant':
                    var li = [];
                    Restangular.all('eng/labPlant').getList().then(function(data){

                        for (var i = data.length - 1; i >= 0; i--) {
                            var elem = {};
                            elem.key = data[i]['plant'];
                            li.push(elem);
                        };
                    });
                    taken_list = li;
                    break;

                case 'truck':
                    var li = [];
                    Restangular.all('eng/labTruck').getList().then(function(data){

                        for (var i = data.length - 1; i >= 0; i--) {
                            var elem = {};
                            elem.key = data[i]['truck'];
                            li.push(elem);
                        };
                    });
                    taken_list = li;
                    break;
            }


            function filterPlan(array, term) {
                var matcher = new RegExp('(' + $.ui.autocomplete.escapeRegex(term) + ')', 'gi');
                return $.grep(array, function (item) {
                    return matcher.test(item.key);
                });
            }

            function highlightPlan(text, term) {
                var matcher = new RegExp('(' + $.ui.autocomplete.escapeRegex(term) + ')', 'gi');
                return text.replace(matcher, '<strong>$1</strong>');
            }

            elem.autocomplete({
                source: function(request, response) {

                    // console.log(Restangular.all('eng/labPlant').getList());

                    response(filterPlan(taken_list, this.term));
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

                item.label = item.key;

                var planNameHighlighted = highlightPlan(item.key, this.term);


                var planLine = $("<div>").html(planNameHighlighted);

                return $("<li>").append("<a>" + $("<div>").append(planLine).html() + "</a>").appendTo(ul);
            };
        }
    }
}]);




