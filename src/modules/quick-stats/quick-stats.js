import {EventManager} from 'services/event-manager';
import {inject} from 'aurelia-framework';

@inject(EventManager)
export class QuickStats {
    constructor(eventManager) {
        this.eventManager = eventManager;

        this.level = 1;
        this.currentExp = 3;
        this.expTolevel = 5;
        this.currency = 500;
        this.currencyEnergy = 10;

        this.eventManager.subscribe('currency:updated', (newCurrency) => {
            this.currency = newCurrency;
        }, this);
    }
}
