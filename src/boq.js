/**
 * User: santi8ago8
 * GitHub: https://github.com/santi8ago8/boq.js
 * Version 0.0.1
 */


(function (window) {
    var boq = {};
    boq._version = "0.0.1";

    /**
     * Util functions
     * @type {{}}
     */
    boq.utils = boq.u = {
        /**
         * Debug params in console, fix problems with internet explorer
         * @param {object} args
         */
        debug: function (args) {
            //control for internet explorer
            if (typeof console !== 'undefined') {
                console.debug.apply(console, arguments);
            }
        },
        /**
         * Log params in console, fix problems with internet explorer
         * @param {object} args
         */
        log: function (args) {
            //control for internet explorer
            if (typeof console !== 'undefined') {
                console.log.apply(console, arguments);
            }
        },
        /**
         * Get the keys from second object and insert into the first
         * @param {Object} targetObject Target object
         * @param {Object} sourceObject Source object
         * @param {Boolean} [replace=true] Replace keys, default true
         *
         * @returns {Object} the resultant object
         */
        extends: function (targetObject, sourceObject, replace) {
            if (typeof replace == 'undefined')
                replace = true;
            for (var i in sourceObject) {
                //check if property is direct from the object
                if (sourceObject.hasOwnProperty && sourceObject.hasOwnProperty(i)) {
                    if (!replace) {
                        if (typeof targetObject[i] == 'undefined') {
                            targetObject[i] = sourceObject[i];
                        }
                    }
                    else {
                        targetObject[i] = sourceObject[i];
                    }
                }
            }
            return targetObject;
        },
        /**
         * get a random float number.
         * @param {number} [min] minimun value
         * @param {number} [max] maximun value
         * @returns {number} a random float number
         */
        random: function (min, max) {
            if (typeof min == 'undefined')
                min = 0;
            if (typeof max == 'undefined')
                max = 1;
            return (Math.random() * (max - min) + min)
        },
        /**
         * get a random integer number
         * @param {number} [min] minimun value
         * @param {number} [max] maximun value
         * @returns {number} a random int number
         */
        randomInt: function (min, max) {
            return parseInt(boq.utils.random(min, max));
        },
        /**
         * get an boq.Array with document.querySelector
         * @param query query selector
         * @returns {boq.Array}
         */
        qs: function (query) {
            var res = document.querySelectorAll(query);
            return new boq.Array(res);
        }
    };

    /**
     * create a boq array
     * @param {Array} [arr=[]] origin array
     * @constructor
     */
    boq.Array = function (arr) {
        var self = typeof arr !== 'undefined' ? arr : [];

        /**
         * each in the array
         * @param {function} fn iteration function
         * @param {number} [start=0]
         * @param {number} [interval=1]
         * @returns {boq.Array}
         */
        self.each = function (fn, start, interval) {
            if (typeof fn !== 'function') {
                interval = start;
                start = fn;
                fn = false;
            }
            if (typeof start == 'undefined')
                start = 0;
            if (typeof interval == 'undefined')
                interval = 1;

            var result = new boq.Array();
            for (var i = start;
                //normal for
                 (interval > 0 && i < self.length) ||
                     //reverse for, used to reverse function.
                     (interval < 0 && i >= 0)

                ; i += interval) {
                var res = true;
                if (fn) {
                    res = fn(self[i], i);
                }
                if (res || typeof res === 'undefined') {
                    result.push(self[i]);
                }
                if (res === 'break') {
                    break;
                }

            }
            return result;
        };

        /**
         * reverse array
         * @returns {boq.Array}
         */
        self.reverse = function () {
            return self.each(self.length - 1, -1);
        };

        if (!self.indexOf) {
            /**
             * Find the object into the array
             * @param {object} findElement element to find
             * @returns {number} the index of the element
             */
            self.indexOf = function (findElement) {
                var index = -1;
                self.each(function (it, ind) {
                    if (findElement == it) {
                        index = ind;
                        return 'break';
                    }
                    else
                        return false;
                });
                return index;
            }
        }

        /**
         *
         * @param {object} element element to remove from array
         * @param {function} [compareFunction]
         * @returns {boq.Array} resultant array
         */
        self.without = function (element, compareFunction) {
            if (!compareFunction)
                compareFunction = function (it) {
                    return !(it === element);
                };
            return self.each(compareFunction);
        };
        /**
         * compare with another array
         * @param {Array} arrayToCompare Array to compare.
         * @returns {boolean}
         */
        self.compare = function (arrayToCompare) {
            var result = true;
            self.each(function (it, ind) {
                if (it === arrayToCompare[ind]) {
                    return false
                }
                else {
                    result = false;
                    return 'break';
                }
            });
            return result;
        };

        return self;
    };

    /**
     *
     * @type {{}}
     */

    var privatesRouter = {
        init: function () {

        },
        on: function (route, config) {
            //add to routes
            var defaultConfig = {
                cb: undefined,
                container: undefined
            };
            if (typeof config === 'function')
                defaultConfig.cb = config;
            else
                boq.utils.extends(defaultConfig, config);
            if (privatesRouter.existRoute(route)) {
                var routeParts = new boq.Array(route.split('/'));
                routeParts = routeParts.without("");
                routeParts = routeParts.each(function (it) {
                    return !(it.charAt(0) === ':');
                });
                boq.Router.routes.each(function (it) {
                    var routeParts2 = new boq.Array(it.route.split('/'));
                    routeParts2 = routeParts2.without("");
                    routeParts2 = routeParts2.each(function (it) {
                        return !(it.charAt(0) === ':');
                    });
                    if (routeParts.compare(routeParts2)) {
                        it.route = route;
                        it.config = defaultConfig;
                    }
                });
            }
            else {
                boq.Router.routes.push({
                    route: route,
                    config: defaultConfig
                });
            }

            //check if is the current route and trigger event.
            var actualRoute = privatesRouter.getRouteObjectByCreatedRoute(window.location.hash);
            if (actualRoute && actualRoute.route == route) {
                //TODO: trigger
                debugger;
            }

        },
        off: function (route) {
            var routeParts = new boq.Array(route.split('/'));
            routeParts = routeParts.without("");
            routeParts = routeParts.each(function (it) {
                return !(it.charAt(0) === ':');
            });
            var routeToDelete;
            boq.Router.routes.each(function (it) {
                var routeParts2 = new boq.Array(it.route.split('/'));
                routeParts2 = routeParts2.without("");
                routeParts2 = routeParts2.each(function (it) {
                    return !(it.charAt(0) === ':');
                });
                if (routeParts.compare(routeParts2)) {
                    routeToDelete = it;
                }
            });
            if (routeToDelete) {
                boq.Router.routes = boq.Router.routes.without(routeToDelete);
            }
        },
        goTo: function (route, trigger) {

        },
        existRoute: function (route) {
            var routeParts = new boq.Array(route.split('/'));
            routeParts = routeParts.without("");
            routeParts = routeParts.each(function (it) {
                return !(it.charAt(0) === ':');
            });
            var res = boq.Router.routes.each(function (it) {
                var routePartsE = new boq.Array(it.route.split('/'));
                routePartsE = routePartsE.without("");
                routePartsE = routePartsE.each(function (it) {
                    return !(it.charAt(0) === ':');
                });
                return routeParts.compare(routePartsE);
            });
            return res.length == 1;
        },
        getRouteObjectByCreatedRoute: function (route) {
            var response;

            route = new boq.Array(route.split('/'));
            route = route.without('').without("#");

            boq.Router.routes.each(function (it) {
                var routeObj = new boq.Array(it.route.split('/')).without('');
                var count = 0;
                route.each(function (str, ind) {
                    if (str == routeObj[ind] && routeObj[ind].charAt(0) !== ':') {
                        count++;
                    }
                    if (routeObj[ind].charAt(0) === ':') {
                        count++;
                    }
                    return false;
                });
                if (count == route.length && count == routeObj.length) {
                    response = it;
                }
            });

            return response;
        }
    };
    privatesRouter.init();

    /**
     * Router
     * @type {{}}
     */
    boq.Router = {
        /**
         * created routes.
         */
        routes: new boq.Array(),
        /**
         * create a new route
         * @param {string} route the new route
         * @param {object|function} config config object or function callback.
         */
        on: function (route, config) {
            return privatesRouter.on.call(this, route, config);
        },
        off: function (route) {
            return privatesRouter.off.call(this, route)
        },
        /**
         *
         * @param route route destination
         * @param {boolean} [trigger=true] is the event triggered?
         * @returns {boolean} if it has been redirected
         */
        goTo: function (route, trigger) {
            return privatesRouter.goTo.call(this, route, trigger);
        }
    };


    window.Boq = window.boq = boq;
    if (typeof window.b === 'undefined')
        window.b = boq;
    if (typeof window._b === 'undefined')
        window._b = boq;
}(window));