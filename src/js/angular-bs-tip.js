///<reference path="../../../minute/_all.d.ts"/>
var Directives;
(function (Directives) {
    var AngularBsTip = (function () {
        function AngularBsTip() {
            this.restrict = 'A';
            this.scope = {
                tooltip: '@',
                tooltipPosition: '@?',
                tooltipContainer: '@?',
                tooltipTrigger: '@?',
                tooltipHtml: '@?'
            };
            this.link = function ($scope, elem, attrs) {
                $scope.$watch('tooltip + tooltipPosition + tooltipContainer + tooltipTrigger', function () {
                    var isVisible = elem.siblings('.tooltip').length > 0; // Is the tooltip already shown?
                    if (elem.hasClass('ng-tooltip')) {
                        elem.tooltip('destroy');
                    }
                    elem.tooltip({
                        title: $scope.tooltip,
                        placement: $scope.tooltipPosition || 'top',
                        container: $scope.tooltipContainer || null,
                        trigger: $scope.tooltipTrigger || 'hover',
                        html: $scope.tooltipHtml || false,
                        animation: false
                    }).addClass('ng-tooltip');
                    if (isVisible) {
                        elem.tooltip('show');
                    }
                });
            };
        }
        AngularBsTip.instance = function () {
            return new AngularBsTip();
        };
        return AngularBsTip;
    }());
    Directives.AngularBsTip = AngularBsTip;
    angular.module('angular-bs-tooltip', []) //angular-bs-tooltip to maintain compatibility with old module that discontinued bower
        .directive('tooltip', AngularBsTip.instance);
})(Directives || (Directives = {}));
