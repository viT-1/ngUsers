import angular from 'angular';
import ngMockE2E from 'angular-mocks/ngMockE2E';

const mockHttpModule = angular.module('mockHttpModule', [ngMockE2E])
    .config(['$provide', ($provide) => {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }]);

export default mockHttpModule;
