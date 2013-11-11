var adrrDirectives = angular.module('adrrDirectives', ['ui.select2'], null)

    .directive
(
    'adrrTimepicker', function ($compile) {

        return {

            restrict: 'E',

            require: 'ngModel',

            scope: {
                ngModel: '=',
                adrrOptions: '&',
                ngDisabled: '='
            },

            template: '<div class="input-group double-input">' +
                '<input ng-disabled="ngDisabled" ng-model="hour" type="number" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="23" min="0" class="form-control text-center" />' +
                '<input ng-disabled="ngDisabled" ng-model="mint" type="number" pattern="[0-9]*" ng-change="formatTime()" adrr-num-range max="59" min="0" class="form-control text-center" />' +
                '<span class="input-group-addon"><i class="glyphicon glyphicon-time"></i> </span>' +
                '</div>',

            link: function (scope, element, attrs, ctrl) {

                scope.$watch
                (
                    'ngModel', function (newVal) {

                        if (!angular.isUndefined(newVal) && newVal !== '' && newVal !== null) {

                            newVal = newVal.match(/(\d{1,2}:\d{1,2}:\d{1,2})/)[0];

                            scope.ngModel = newVal;

                            var timeArr = newVal.split(':');

                            scope.hour = parseInt(timeArr[0], 10);

                            scope.mint = parseInt(timeArr[1], 10);

                            ctrl.$setValidity('wrong', true);
                            ctrl.$setViewValue(newVal);
                        } else {
                            scope.hour = '';
                            scope.mint = '';
                        }
                    }
                );

                scope.formatTime = function () {

                    if (!angular.isUndefined(scope.hour) && scope.hour !== null && !angular.isUndefined(scope.mint) && scope.mint !== null && scope.mint !== '' && scope.mint !== '') {

                        var time = (String(scope.hour).length < 2 ? '0' + scope.hour : scope.hour) + ':';
                        time += (String(scope.mint).length < 2 ? '0' + scope.mint : scope.mint) + ':00';

                        ctrl.$setViewValue(time);

                        scope.ngModel = time;

                        ctrl.$setValidity('wrong', true);

                    } else {
                        ctrl.$setValidity('wrong', false);
                    }
                };

                if (!angular.isUndefined(attrs.adrrOptions)) {

                    scope.$watch
                    (
                        'adrrOptions()', function (newVal) {
                            if (!angular.isUndefined(newVal.template)) {
                                element.html($compile(newVal.template)(scope));
                            }
                        }
                    );
                }
            }
        }
    }
)

// .directive
// (
    // 'adrrJtimepicker', function ()
    // {
    // return {
    // restrict: 'E',

    // require: '^ngModel',

    // template: '<div class="input-group"><input class="wow {{adrrClass}}" type="text" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div>',

    // scope:
    // {
    // ngModel: '='
    // },

    // link: function (scope, iElement, iAttrs, ctrl)
    // {
    // scope.adrrClass = iAttrs.adrrClass;

    // iElement.find('.wow').timepicker
    // ({
    // timeFormat: 'HH:mm:ss',
    // hourMin: 0,
    // hourMax: 23,
    // sliderAccessArgs: { touchonly: false }
    // });
    // }
    // }
    // }
// )

    // Select version
    /*.directive
     (
     'adrrSelect2Wrapper', function () {
     return {
     restrict: 'E',

     require: 'ngModel',

     scope: {
     ngModel: '=',
     adrrData: '&'
     },

     template: '<div>' +
     '<button ng-repeat="frequent in frequents" class="btn btn-default" ng-click="programmaticallySelect(frequent.id)">{{frequent.name}}</button>' +
     '</div>' +
     '<select class="form-control s2w"><option value="">Select...</option><option ng-repeat="item in adrrData()" value="{{item.id}}" ng-selected="item.id == ngModel">{{item.name}}</option></select>',

     link: function (scope, element, attrs, ctrl) {

     var $select = element.find('.s2w');

     scope.$watch
     (
     'adrrData()', function (newVal) {
     scope.frequents = _.filter
     (
     newVal, function (item) {
     if (attrs['frequentProp']) {
     return item[attrs['frequentProp']] == 1;
     }
     else {
     return item['mostFrequent'] == 1;
     }
     }
     );
     }
     );

     scope.programmaticallySelect = function (id) {
     scope.ngModel = id;
     };

     $select.on
     (
     'change', function () {

     scope.ngModel = $select.val();

     if (!scope.$$phase) {
     scope.$apply();
     }
     }
     );

     scope.$watch
     (
     'ngModel', function (newVal) {
     ctrl.$setViewValue(newVal);

     $select.val(newVal);
     }, true
     );
     }
     }
     }
     )*/

    .directive
(
    'adrrSelect2Wrapper', function () {
        return {
            restrict: 'EA',

            require: 'ngModel',

            scope: {
                ngModel: '=',
                adrrData: '&'
            },

            template: '<div class="input-group">' +
                '<div class="input-group-btn">' +
                '<button ng-show="frequents.length" class="btn btn-primary" data-toggle="modal" data-target="#modal-{{id}}">' +
                'Frequents' +
                '</button>' +
                '</div>' +

                '<select class="form-control s2w">' +
                '<option value="">Select...</option>' +
                '<option ng-repeat="item in adrrData()" value="{{item.id}}" ng-selected="item.id == ngModel">' +
                '{{item.name}}' +
                '</option>' +
                '</select>' +
                '</div>' +

                '<div class="modal" id="modal-{{id}}" tabindex="-1" role="dialog" aria-labelledby="label-{{id}}" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title" id="title-{{id}}">Frequents</h4>' +
                '</div>' +

                '<div class="modal-body">' +
                '<div class="list-group">' +
                '<a ng-repeat="frequent in frequents" data-dismiss="modal" class="list-group-item" href="#" ng-click="programmaticallySelect(frequent.id)" onclick="return false;">{{frequent.name}}</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>',

            link: function (scope, element, attrs, ctrl) {

                scope.id = attrs['adrrId'];

                var $select = element.find('.s2w');

                scope.$watch
                (
                    'adrrData()', function (newVal) {
                        scope.frequents = _.filter
                        (
                            newVal, function (item) {
                                if (attrs['frequentProp']) {
                                    return item[attrs['frequentProp']] == 1;
                                }
                                else {
                                    return item['mostFrequent'] == 1;
                                }
                            }
                        );
                    }
                );

                scope.programmaticallySelect = function (id) {
                    scope.ngModel = id;
                };

                $select.on
                (
                    'change', function () {

                        scope.ngModel = $select.val();

                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    }
                );

                scope.$watch
                (
                    'ngModel', function (newVal) {

                        if (typeof newVal !== 'undefined') {

                            ctrl.$setViewValue(newVal);

                            $select.val(newVal);
                        }
                    }, true
                );
            }
        }
    }
)

    .directive
(
    'adrrB3radio', function () {
        return {
            restrict: 'A',

            scope: false,

            require: 'ngModel',

            link: function (scope, element, attrs, ctrl) {
                element.on
                (
                    'click', function (evt) {

                        var input = $(evt.target).children('input');

                        scope.$apply(ctrl.$setViewValue(input.val()));

                    }
                );

                ctrl.$render = function () {

                    var da = element.find('input[value=' + ctrl.$viewValue + ']');

                    if (!angular.isUndefined(da)) {

                        element.children().removeClass("active");

                        da.parent().addClass('active');

                    }
                }
            }
        }
    }
);