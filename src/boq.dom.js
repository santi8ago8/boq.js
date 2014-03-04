/**
 * User: santi8ago8
 * GitHub: https://github.com/santi8ago8/boq.js
 */

/**
 * set or get the html of selected nodes
 * @param {string} [html] html to set
 * @returns {string|*}
 */
Boq.utils.qs.adds.html = function (html) {
    if (typeof html === 'undefined') {
        if (typeof this[0] !== 'undefined')
            return this[0].innerHTML;
    }
    this.each(function (it) {
        it.innerHTML = html;
    });
    return this;
};

/**
 * set or get the html of selected nodes
 * @param {string} name name of the attribute
 * @param {string} [value] value to set in the attribute
 * @returns {string|*}
 */
Boq.utils.qs.adds.attr = function (name, value) {
    if (typeof value === 'undefined') {
        if (typeof this[0] !== 'undefined')
            return this[0].getAttribute(name);
    }
    this.each(function (it) {
        it.setAttribute(name, value);
    });
    return this;
};

/**
 * set or get the style rule in the selected nodes
 * @param {string} name name of the style
 * @param {string} [value] value to set in the rule
 * @returns {string|*}
 */
Boq.utils.qs.adds.css = function (name, value) {
    if (typeof value === 'undefined') {
        if (typeof this[0] !== 'undefined')
            return this[0].style[name];
    }
    this.each(function (it) {
        it.style[name] = value;
    });
    return this;
};

/**
 * hide with css the selected nodes
 * @returns {*}
 */
Boq.utils.qs.adds.hide = function () {
    return this.adds.css.call(this, 'display', 'none');
};

/**
 * show with css the selected nodes
 * @returns {*}
 */
Boq.utils.qs.adds.show = function () {
    return this.adds.css.call(this, 'display', '');
};

/**
 * remove from dom the selected nodes
 * @returns {*}
 */
Boq.utils.qs.adds.remove = function () {
    return this.each(function (it) {
        if (it.remove) it.remove();
        else {
            it.parentNode.removeChild(it);
        }
    });
};