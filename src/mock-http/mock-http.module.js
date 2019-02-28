import angular from 'angular';

// Откуда проблема с проходящим запросом, когда его вроде-бы перехватил mockHttp
// Решена обратной зависимостью - данный модуль поставлен дочерним к App
// @link: Problem https://groups.google.com/forum/#!topic/angular/iNkSs6yv3mE
// @link: http://angular-tips.com/blog/2015/01/a-backend-less-plunker/

import ngMockE2E from 'angular-mocks/ngMockE2E';

import { fakeHttpTimeout } from '~/config';

// @url asimmittal.blogspot.com/2015/06/faking-backend-in-angularjs.html
// Решение проблемы сделать паузу в ответе $httpBackend.whenGET
// @link https://stackoverflow.com/questions/26083822/angularjs-using-ngmocke2e-httpbackend-how-can-i-delay-a-specific-response
/* @ngInject */
function decorateWithTimeout($delegate) {
    function proxy(method, url, data, callback, headers) {
        let timer = 0;
        if (url.match(/^\/api\//)) {
            timer = fakeHttpTimeout;
        }

        function interceptorDelayed(...args) {
            const self = this;

            setTimeout(() => {
                callback.apply(self, args);
            }, timer);
        }

        return $delegate.call(this, method, url, data, interceptorDelayed, headers);
    }

    Object.keys($delegate).forEach((key) => { proxy[key] = $delegate[key]; });

    return proxy;
}

/* @ngInject */
function testHttpRun($http) {
    $http.get('/api/test')
        .then((resp) => {
            console.log('Ответ then по /api/test:', resp);
        });
}

// Модуль, чтобы протестировать заглушку, не подключая основной App
const testModuleName = angular.module('testModule', [])
    .run(testHttpRun)
    .name;

const mockHttpModule = angular.module('mockHttpModule', [
    // Для какого angular-модуля вешаем fake-обработчики на $http-запросы - элементарное приложение
    // testModuleName,
    // Внедрение провайдера $httpBackend
    ngMockE2E,
]).config(($provide) => {
    'ngInject';

    $provide.decorator('$httpBackend',
        fakeHttpTimeout > 0 ? decorateWithTimeout : angular.mock.e2e.$httpBackendDecorator);
});

export default mockHttpModule;
