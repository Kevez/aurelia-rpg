export class EventManager {
    constructor() {
        this.subscriptions = [];
    }

    subscribe(eventName, callback, context) {
        this.subscriptions.push({
            eventName: eventName,
            callback: callback,
            context: context
        });
    }

    publish(eventName) {
        let args = Array.prototype.slice.call(arguments, 1);

        this.subscriptions.filter((subscription) => {
            return subscription.eventName === eventName;
        }).forEach((subscription) => {
            subscription.callback.apply(subscription.context, args);
        });
    }
}