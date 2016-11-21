import 'whatwg-fetch';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {EventManager} from 'services/event-manager';

@inject(HttpClient, EventManager)
export class Home {
    constructor(httpClient, eventManager) {
        this.httpClient = httpClient;
        this.eventManager = eventManager;
    }

    complete() {
        console.log('complete quest', this.eventManager, this.httpClient);

        this.httpClient.fetch('package.json')
            .then((response) => response.json())
            .then((data) => {
                this.eventManager.publish('quest:complete', 1, 2);
            })
    }
}
