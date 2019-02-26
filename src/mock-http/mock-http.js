import mockHttpModule from './mock-http.module';

function mockHttpRun($httpBackend) {
    'ngInject';

    console.log('Запуск $httpBackend', $httpBackend);
    // $httpBackend.whenGET('/api/greetString')

    $httpBackend.whenGET(/.*cloud-api.yandex.ru\/.*/)
        .respond(200, { data: 'o3o' });

    $httpBackend.whenGET(/.*/).passThrough();
}

export default mockHttpModule.run(mockHttpRun)
    .name;
