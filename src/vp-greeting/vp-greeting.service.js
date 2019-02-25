import VpGreetingServiceBase from './vp-greeting.service.base';

class VpGreetingService extends VpGreetingServiceBase {
    getGreetString(isNeedToFail) {
        const defer = this.$q.defer();

        if (isNeedToFail) {
            // this.$http.get('https://cloud-api.yandex.ru/serp_gnc/v1/data/app/databases/.ext.notifier@notifications_disk/snapshot?collection_id=meta')
            //     .catch((reason) => { defer.reject(reason); });

            const reason = { data: { description: 'Yoopt' } };
            defer.reject(reason);
        } else {
            setTimeout(
                () => defer.resolve({ data: { greet: 'Hello' } }),
                3000,
            );
        }

        return defer.promise;

        // Без размещения на localhost, запуская Index.htm непосредственно с жёсткого диска,
        // нет возможности делать запрос с таким url
        // return this.$http.get('/api/greetString');
    }
}

export default VpGreetingService;
