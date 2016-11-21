import 'whatwg-fetch';
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventManager} from 'services/event-manager';

@inject(HttpClient, EventManager)
export class Train {
    constructor(HttpClient, EventManager) {
        this.httpClient = HttpClient;
        this.eventManager = EventManager;

        this.strength = 1;
        this.health = 1;
        this.defence = 1;
    }

    train(stat) {
        this.httpClient.fetch('http://localhost:7777/api.php', {
            method: 'post',
            body: json({
                stat: stat
            })
        })
            .then((response) => response.json())
            .then((data) => {
                this[stat] = data.newValue;
                this.eventManager.publish('gold:updated', data.newGold)
            });
    }
}
