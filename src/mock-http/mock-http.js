import mockHttpModule from './mock-http.module';

function mockHttpRun($httpBackend) {
    console.log('Запуск $httpBackend', $httpBackend);
    // $httpBackend.whenGET('/api/greetString')

    $httpBackend.whenGET(/^\w+.*/)
        .respond([200, { data: 'o3o' }]);

    // $httpBackend.whenGET(/.*/).passThrough();
}

export default mockHttpModule.run(mockHttpRun)
    .name;
