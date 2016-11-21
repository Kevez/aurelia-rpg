export class App {
    configureRouter(config, router) {
        this.router = router;

        config.map([
            { route: ['home', ''], moduleId: 'modules/home/home' },
            { route: 'character', moduleId: 'modules/character/character' },
            { route: 'battle', moduleId: 'modules/battle/battle' },
            { route: 'battle/:id', moduleId: 'modules/battle-summary/battle-summary' },
            { route: 'quests', moduleId: 'modules/quests/quests' },
            { route: 'train', moduleId: 'modules/train/train' }
        ]);
    }
}
