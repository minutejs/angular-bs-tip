///<reference path="../../../minute/_all.d.ts"/>

module Directives {

    export class AngularBsTip implements ng.IDirective {
        restrict = 'A';
        scope: any = {
            tooltip: '@',
            tooltipPosition: '@?',
            tooltipContainer: '@?',
            tooltipTrigger: '@?',
            tooltipHtml: '@?'
        };

        static instance = () => {
            return new AngularBsTip();
        };

        link = ($scope: any, elem: any, attrs: ng.IAttributes) => {
            $scope.$watch('tooltip + tooltipPosition + tooltipContainer + tooltipTrigger', function () {
                let isVisible = elem.siblings('.tooltip').length > 0; // Is the tooltip already shown?

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

                if (isVisible) { // Reshow the tooltip if we WERE using it before
                    elem.tooltip('show');
                }
            });
        }
    }

    angular.module('angular-bs-tooltip', []) //angular-bs-tooltip to maintain compatibility with old module that discontinued bower
        .directive('tooltip', AngularBsTip.instance);
}