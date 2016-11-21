define('app',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = exports.App = function () {
        function App() {
            _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
            this.router = router;

            config.map([{ route: ['home', ''], moduleId: 'modules/home/home' }, { route: 'character', moduleId: 'modules/character/character' }, { route: 'battle', moduleId: 'modules/battle/battle' }, { route: 'battle/:id', moduleId: 'modules/battle-summary/battle-summary' }, { route: 'quests', moduleId: 'modules/quests/quests' }, { route: 'train', moduleId: 'modules/train/train' }]);
        };

        return App;
    }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;

    var _environment2 = _interopRequireDefault(_environment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    Promise.config({
        longStackTraces: _environment2.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });

    function configure(aurelia) {
        aurelia.use.standardConfiguration().feature('resources');

        if (_environment2.default.debug) {
            aurelia.use.developmentLogging();
        }

        if (_environment2.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }

        aurelia.start().then(function () {
            return aurelia.setRoot();
        });
    }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/event-manager',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var EventManager = exports.EventManager = function () {
        function EventManager() {
            _classCallCheck(this, EventManager);

            this.subscriptions = [];
        }

        EventManager.prototype.subscribe = function subscribe(eventName, callback, context) {
            this.subscriptions.push({
                eventName: eventName,
                callback: callback,
                context: context
            });
        };

        EventManager.prototype.publish = function publish(eventName) {
            var args = Array.prototype.slice.call(arguments, 1);

            this.subscriptions.filter(function (subscription) {
                return subscription.eventName === eventName;
            }).forEach(function (subscription) {
                subscription.callback.apply(subscription.context, args);
            });
        };

        return EventManager;
    }();
});
define('modules/navigation/navigation',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Navigation = exports.Navigation = function Navigation() {
        _classCallCheck(this, Navigation);

        this.items = [{ label: 'Home', url: '/#/home' }];
    };
});
define('modules/battle/battle',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'services/event-manager', 'whatwg-fetch'], function (exports, _aureliaFramework, _aureliaFetchClient, _eventManager) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Battle = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Battle = exports.Battle = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _eventManager.EventManager), _dec(_class = function () {
        function Battle(httpClient, eventManager) {
            _classCallCheck(this, Battle);

            this.httpClient = httpClient;
            this.eventManager = eventManager;

            this.creatures = [{ id: 1, name: 'John', level: 5 }, { id: 2, name: 'Simon', level: 10 }, { id: 3, name: 'Richard', level: 20 }, { id: 4, name: 'James2000', level: 35 }, { id: 5, name: 'Guard', level: 55 }, { id: 6, name: 'Troll', level: 80 }, { id: 7, name: 'Orc', level: 110 }];

            this.currentCreatureIndex = 0;
        }

        Battle.prototype.attack = function attack(id) {
            console.log('battle', id);
        };

        return Battle;
    }()) || _class);
});
define('modules/players-online/players-online',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var PlayersOnline = exports.PlayersOnline = function () {
        function PlayersOnline() {
            _classCallCheck(this, PlayersOnline);

            this.value = 0;
        }

        PlayersOnline.prototype.clickTest = function clickTest() {
            alert('test');
        };

        return PlayersOnline;
    }();
});
define('modules/quests/quests',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'services/event-manager', 'whatwg-fetch'], function (exports, _aureliaFramework, _aureliaFetchClient, _eventManager) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Quests = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Quests = exports.Quests = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _eventManager.EventManager), _dec(_class = function () {
        function Quests(httpClient, eventManager) {
            _classCallCheck(this, Quests);

            this.httpClient = httpClient;
            this.eventManager = eventManager;

            this.quests = [{ name: 'Mission 1', energyRequired: 1 }];
        }

        Quests.prototype.complete = function complete() {
            var _this = this;

            console.log('complete quest', this.eventManager, this.httpClient);

            this.httpClient.fetch('package.json').then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.eventManager.publish('quest:complete', 1, 2);
            });
        };

        return Quests;
    }()) || _class);
});
define('modules/quick-stats/quick-stats',['exports', 'services/event-manager', 'aurelia-framework'], function (exports, _eventManager, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.QuickStats = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var QuickStats = exports.QuickStats = (_dec = (0, _aureliaFramework.inject)(_eventManager.EventManager), _dec(_class = function QuickStats(eventManager) {
        var _this = this;

        _classCallCheck(this, QuickStats);

        this.eventManager = eventManager;

        this.level = 1;
        this.currentExp = 3;
        this.expTolevel = 5;
        this.currency = 500;
        this.currencyEnergy = 10;

        this.eventManager.subscribe('currency:updated', function (newCurrency) {
            _this.currency = newCurrency;
        }, this);
    }) || _class);
});
define('modules/stats/stats',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Stats = exports.Stats = function Stats() {
        _classCallCheck(this, Stats);

        this.level = 1;
    };
});
define('modules/character/character',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Character = exports.Character = function Character() {
        _classCallCheck(this, Character);

        this.level = 1;
        this.exp = 0;
    };
});
define('modules/quests/character',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'services/event-manager', 'whatwg-fetch'], function (exports, _aureliaFramework, _aureliaFetchClient, _eventManager) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Character = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Character = exports.Character = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _eventManager.EventManager), _dec(_class = function () {
        function Character(httpClient, eventManager) {
            _classCallCheck(this, Character);

            this.httpClient = httpClient;
            this.eventManager = eventManager;

            this.foo = 1;
        }

        Character.prototype.complete = function complete() {
            var _this = this;

            console.log('complete quest', this.eventManager, this.httpClient);

            this.httpClient.fetch('package.json').then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.eventManager.publish('quest:complete', 1, 2);
            });
        };

        return Character;
    }()) || _class);
});
define('modules/home/character',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'services/event-manager', 'whatwg-fetch'], function (exports, _aureliaFramework, _aureliaFetchClient, _eventManager) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _eventManager.EventManager), _dec(_class = function () {
        function Home(httpClient, eventManager) {
            _classCallCheck(this, Home);

            this.httpClient = httpClient;
            this.eventManager = eventManager;

            this.level = 1;
            this.exp = 0;
        }

        Home.prototype.complete = function complete() {
            var _this = this;

            console.log('complete quest', this.eventManager, this.httpClient);

            this.httpClient.fetch('package.json').then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.eventManager.publish('quest:complete', 1, 2);
            });
        };

        return Home;
    }()) || _class);
});
define('modules/home/home',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'services/event-manager', 'whatwg-fetch'], function (exports, _aureliaFramework, _aureliaFetchClient, _eventManager) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _eventManager.EventManager), _dec(_class = function () {
        function Home(httpClient, eventManager) {
            _classCallCheck(this, Home);

            this.httpClient = httpClient;
            this.eventManager = eventManager;
        }

        Home.prototype.complete = function complete() {
            var _this = this;

            console.log('complete quest', this.eventManager, this.httpClient);

            this.httpClient.fetch('package.json').then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.eventManager.publish('quest:complete', 1, 2);
            });
        };

        return Home;
    }()) || _class);
});
define('modules/train/character',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Character = exports.Character = function Character() {
        _classCallCheck(this, Character);

        this.level = 1;
        this.exp = 0;
    };
});
define('modules/train/train',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'services/event-manager', 'whatwg-fetch'], function (exports, _aureliaFramework, _aureliaFetchClient, _eventManager) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Train = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Train = exports.Train = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _eventManager.EventManager), _dec(_class = function () {
        function Train(HttpClient, EventManager) {
            _classCallCheck(this, Train);

            this.httpClient = HttpClient;
            this.eventManager = EventManager;

            this.strength = 1;
            this.health = 1;
            this.defence = 1;
        }

        Train.prototype.train = function train(stat) {
            var _this = this;

            this.httpClient.fetch('http://localhost:7777/api.php', {
                method: 'post',
                body: (0, _aureliaFetchClient.json)({
                    stat: stat
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this[stat] = data.newValue;
                _this.eventManager.publish('gold:updated', data.newGold);
            });
        };

        return Train;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container\">\n        <header class=\"header\">\n            <compose view-model=\"modules/quick-stats/quick-stats\"></compose>\n        </header>\n        <div class=\"main-content\">\n            <router-view></router-view>\n        </div>\n        <compose view-model=\"modules/navigation/navigation\"></compose>\n    </div>\n</template>\n"; });
define('text!modules/navigation/navigation.css', ['module'], function(module) { module.exports = ".navigation {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    padding: 5px;\n    text-align: center;\n    width: 100%;\n}"; });
define('text!modules/navigation/navigation.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./navigation.css\"></require>\n    <ul class=\"navigation\">\n        <li repeat.for=\"item of items\">\n            <a href=\"${item.url}\">${item.label}</a>\n        </li>\n    </ul>\n</template>\n"; });
define('text!modules/players-online/players-online.css', ['module'], function(module) { module.exports = ".players-online {\n    float: right\n}\n\n.value {\n    font-weight: bold;\n}"; });
define('text!modules/players-online/players-online.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./players-online.css\"></require>\n    <p>Players online: <span class=\"value\">${value}</span></p>\n</template>\n"; });
define('text!modules/battle/battle.css', ['module'], function(module) { module.exports = ""; });
define('text!modules/battle/battle.html', ['module'], function(module) { module.exports = "<template>\n    <h2>Plains</h2>\n    <p>Here you can battle creates for experience and gold.</p>\n    <table>\n        <tr repeat.for=\"creature of creatures\">\n            <td>${creature.name}</td>\n            <td>\n                <a class=\"full-width-button\" href=\"/#/battle-summary/${creature.id}\">Attack</a>\n            </td>\n        </tr>\n    </table>\n</template>"; });
define('text!modules/quests/quests.css', ['module'], function(module) { module.exports = "button {\n    padding: 10px;\n}"; });
define('text!modules/quests/quests.html', ['module'], function(module) { module.exports = "<template>\n    <h2>Quests</h2>\n    <p>You are currently on a mission to <b>slay 10 Rats</b>.</p>\n    <p>\n        Progress: 0/10 (0%)\n    </p>\n</template>"; });
define('text!modules/quick-stats/quick-stats.css', ['module'], function(module) { module.exports = ".quick-stats {\n    background: #666;\n    margin-bottom: 10px;\n    padding: 5px 0;\n    text-align: center;\n}"; });
define('text!modules/quick-stats/quick-stats.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./quick-stats.css\"></require>\n\n    <div class=\"quick-stats\">\n        <p class=\"no-margin\">\n            Level ${level}\n            Exp ${currentExp}/${expTolevel}\n            Currency: ${currency}\n        </p>\n        <p>\n            Energy ${currencyEnergy}\n        </p>\n    </div>\n</template>\n"; });
define('text!modules/stats/stats.css', ['module'], function(module) { module.exports = "button {\n    padding: 10px;\n}"; });
define('text!modules/stats/stats.html', ['module'], function(module) { module.exports = "<template>\n    <h2>Stats</h2>\n    <p>This is the stats route.</p>\n</template>\n"; });
define('text!modules/character/quests.css', ['module'], function(module) { module.exports = "button {\n    padding: 10px;\n}"; });
define('text!modules/character/quests.html', ['module'], function(module) { module.exports = "<template>\n    <h2>Character</h2>\n    <p>Stats will appear here soon.</p>\n    <a href=\"\">Quests</a>\n</template>\n"; });
define('text!modules/character/character.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./character.css\"></require>\n    <h2>Character</h2>\n    <table>\n        <tr>\n            <td>Level</td><td>${level}</td>\n        </tr>\n        <tr>\n            <td>Exp</td><td>${exp}</td>\n        </tr>\n    </table>\n    <a class=\"full-width-button\" href=\"/#/equipment\">Equipment</a>\n</template>\n"; });
define('text!modules/character/character.css', ['module'], function(module) { module.exports = ".players-online {\n    float: right\n}\n\n.value {\n    font-weight: bold;\n}"; });
define('text!modules/quests/character.css', ['module'], function(module) { module.exports = "button {\n    padding: 10px;\n}"; });
define('text!modules/quests/character.html', ['module'], function(module) { module.exports = "<template>\n    <h2>Character</h2>\n    <p>Stats will appear here soon.</p>\n    <a href=\"/#/quests\">Quests</a>\n</template>\n"; });
define('text!modules/home/character.css', ['module'], function(module) { module.exports = "table {\n    margin-bottom: 10px;\n}"; });
define('text!modules/home/character.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./character.css\"></require>\n    <h2>Character</h2>\n    <table>\n        <tr>\n            <td>Level</td><td>${level}</td>\n        </tr>\n        <tr>\n            <td>Exp</td><td>${exp}</td>\n        </tr>\n    </table>\n    <a class=\"full-width-button\" href=\"/#/quests\">Quests</a>\n    <a class=\"full-width-button\" href=\"/#/blacksmith\">Blacksmith</a>\n</template>\n"; });
define('text!modules/home/home.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./home.css\"></require>\n    <h2>Home</h2>\n    <a class=\"full-width-button\" href=\"/#/battle\">Battle</a>\n    <a class=\"full-width-button\" href=\"/#/quests\">Quests</a>\n    <a class=\"full-width-button\" href=\"/#/train\">Train</a>\n    <a class=\"full-width-button\" href=\"/#/character\">Character</a>\n</template>\n"; });
define('text!modules/home/home.css', ['module'], function(module) { module.exports = "table {\n    margin-bottom: 10px;\n}"; });
define('text!modules/character/players-online.css', ['module'], function(module) { module.exports = ".players-online {\n    float: right\n}\n\n.value {\n    font-weight: bold;\n}"; });
define('text!modules/character/players-online.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./players-online.css\"></require>\n    <p>Players online: <span class=\"value\">${value}</span></p>\n</template>\n"; });
define('text!modules/train/character.css', ['module'], function(module) { module.exports = ".players-online {\n    float: right\n}\n\n.value {\n    font-weight: bold;\n}"; });
define('text!modules/train/character.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./character.css\"></require>\n    <h2>Character</h2>\n    <table>\n        <tr>\n            <td>Level</td><td>${level}</td>\n        </tr>\n        <tr>\n            <td>Exp</td><td>${exp}</td>\n        </tr>\n    </table>\n    <a class=\"full-width-button\" href=\"/#/equipment\">Equipment</a>\n</template>\n"; });
define('text!modules/train/train.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./train.css\"></require>\n    <h2>Train</h2>\n    <ul class=\"list\">\n        <li>\n            <span>Strength</span><br/>\n            <span>Currently ${strength}</span><br/><br/>\n            <a class=\"full-width-button action\" click.trigger=\"train('strength')\">Train for ${strength * 10} Coins</a>\n        </li>\n        <li>\n            <span>Health</span><br/>\n            <span>Currently ${health}</span><br/><br/>\n            <a class=\"full-width-button action\" click.trigger=\"train('health')\">Train for ${health * 10} Coins</a>\n        </li>\n        <li>\n            <span>Defence</span><br/>\n            <span>Currently ${defence}</span><br/><br/>\n            <a class=\"full-width-button action\" click.trigger=\"train('defence')\">Train for ${defence * 10} Coins</a>\n        </li>\n    </ul>\n</template>\n"; });
define('text!modules/train/train.css', ['module'], function(module) { module.exports = ".players-online {\n    float: right\n}\n\n.value {\n    font-weight: bold;\n}"; });
//# sourceMappingURL=app-bundle.js.map