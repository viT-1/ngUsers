import mockHttpModule from './mock-http.module';

// Более насыщенный пример перехватчика
// @link: http://jsfiddle.net/softwaredoug/pCMCQ/9/

/* @ngInject */
function mockHttpRun($httpBackend) {
    $httpBackend.whenGET('/api/test').respond(200, { foo: 'bar' });

    $httpBackend.whenGET('/api/greeting').respond(200, { greet: 'Complete' });

    // Для single-page роутинга Route-provider
    $httpBackend.whenGET(/\.html/).passThrough();
}

export default mockHttpModule.run(mockHttpRun)
    .name;
