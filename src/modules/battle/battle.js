import 'whatwg-fetch';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {EventManager} from 'services/event-manager';

@inject(HttpClient, EventManager)
export class Battle {
    constructor(httpClient, eventManager) {
        this.httpClient = httpClient;
        this.eventManager = eventManager;

        this.creatures = [
            {id: 1, name: 'John', level: 5},
            {id: 2, name: 'Simon', level: 10},
            {id: 3, name: 'Richard', level: 20},
            {id: 4, name: 'James2000', level: 35},
            {id: 5, name: 'Guard', level: 55},
            {id: 6, name: 'Troll', level: 80},
            {id: 7, name: 'Orc', level: 110}
        ];

        this.currentCreatureIndex = 0;
    }

    attack(id) {
        console.log('battle', id);

        // this.httpClient.fetch('package.json')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         this.eventManager.publish('quest:complete', 1, 2);
        //     });
    }
}
