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
    boq.utils = {
        /**
         * Debug params in console, fix problems with internet explorer
         * @param {object} args
         */
        debug: function (args) {
            //control for internet explorer
            if (typeof console !== 'undefined') {
                console.debug(arguments.length == 1 ? arguments[0] : args);
            }
        },
        /**
         * Log params in console, fix problems with internet explorer
         * @param {object} args
         */
        log: function (args) {
            //control for internet explorer
            if (typeof console !== 'undefined') {
                console.log(arguments.length == 1 ? arguments[0] : args);
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
         * @returns {number}
         */
        randomInt: function (min, max) {
            return parseInt(boq.utils.random(min, max));
        }
    };

    window.Boq = window.boq = boq;
}(window));