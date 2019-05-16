import angular from 'angular';

// Откуда проблема с проходящим запросом, когда его вроде-бы перехватил mockHttp
// Решена обратной зависимостью - данный модуль поставлен дочерним к App
// @link: Problem https://groups.google.com/forum/#!topic/angular/iNkSs6yv3mE
// @link: http://angular-tips.com/blog/2015/01/a-backend-less-plunker/

import { fakeHttpTimeout } from '~/config';
import { templates, requires } from './mock-http.config';

import { jsonData as jsonUsers } from '@/pg-users';

// @url asimmittal.blogspot.com/2015/06/faking-backend-in-angularjs.html
// Решение проблемы сделать паузу в ответе $httpBackend.whenGET
// @link https://stackoverflow.com/questions/26083822/angularjs-using-ngmocke2e-httpbackend-how-can-i-delay-a-specific-response

class MockHttp {
    /* @ngInject */
    static httpBackendDecorator($delegate) {
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

    static run($httpBackend) {
        $httpBackend.whenGET('/api/test').respond(200, { foo: 'bar' });

        $httpBackend.whenGET('/api/greeting').respond(200, { greet: 'Complete' });

        $httpBackend.whenGET('/api/user/list').respond(200, { items: jsonUsers.users });
        $httpBackend.whenGET('/api/user-group/list').respond(200, { items: jsonUsers.groups });
        $httpBackend.whenGET('/api/user-ids-by-group-id/list').respond(200, { items: jsonUsers.relUserIdsByGroupId });
        $httpBackend.whenRoute('GET', '/api/user-ids-by-group-id/:id').respond(
            (m, u, d, h, params) => [200, {
                items: jsonUsers.relUserIdsByGroupId
                    .filter(item => item.groupId === Number.parseInt(params.id, 10)),
            }],
        );

        $httpBackend.whenGET('/tmpl/vp-greeting').respond(200, templates['vp-greeting']);
        $httpBackend.whenGET('/tmpl/ui-nav').respond(200, templates['ui-nav']);
        $httpBackend.whenGET('/tmpl/ui-nav/item').respond(200, templates['ui-nav__item']);
        $httpBackend.whenGET('/tmpl/pg-welcome').respond(200, templates['pg-welcome']);
        $httpBackend.whenGET('/tmpl/pg-books').respond(200, templates['pg-books']);
        $httpBackend.whenGET('/tmpl/pg-users').respond(200, templates['pg-users']);
        $httpBackend.whenGET('/tmpl/pg-users-table').respond(200, templates['pg-users-table']);
        $httpBackend.whenGET('/tmpl/pg-users-cards').respond(200, templates['pg-users-cards']);

        // Для single-page роутинга Route-provider
        $httpBackend.whenGET(/\.html/).passThrough();
    }

    static get module() {
        try {
            return angular.module(this.name);
        } catch (err) {
            return angular.module(this.name, requires)
                .run(MockHttp.run)
                .config(($provide) => {
                    'ngInject';

                    $provide.decorator('$httpBackend',
                        fakeHttpTimeout > 0
                            ? MockHttp.httpBackendDecorator
                            : angular.mock.e2e.$httpBackendDecorator);
                });
        }
    }
}

export default MockHttp.module.name;
