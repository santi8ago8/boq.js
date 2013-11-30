/**
 * User: santi8ago8
 * GitHub: https://github.com/santi8ago8/boq.js
 * Version 0.0.1
 */


(function (window) {
    var boq = {};
    boq.version = "0.0.1";

    /**
     * Util functions
     * @type {{}}
     */
    boq.utils = {};
    /**
     * Get the keys from second object and insert into the first
     * @param {Object} targetObject Target object
     * @param {Object} sourceObject Source object
     * @param {Boolean} [replace=true] Replace keys, default true
     *
     * @returns {Object} the resultant object
     */
    boq.utils.extends = function (targetObject, sourceObject, replace) {
        if (typeof replace == 'undefined')
            replace = true;
        for (var i in sourceObject) {
            if (!replace){
                if(typeof targetObject[i]=='undefined'){
                    targetObject[i]=sourceObject[i];
                }
            }
            else{
                targetObject[i]=sourceObject[i];
            }

        }
        return targetObject;
    };


    window.Boq = window.boq = boq;
}(window));