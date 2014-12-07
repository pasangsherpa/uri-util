(function() {
    'use strict';

    var isCommonjs = typeof module !== 'undefined' && module.exports;
    var isAMD = typeof define === 'function' && define.amd;

    var URIUtil = {
        getQueryValue: function(str, name) {
            if (typeof str !== 'string') return '';
            str = str.trim().replace(/^.*(?=\?|#)/, '');
            if (!str) return '';
            return decodeURIComponent((new RegExp('[?|&|#]' + name + '=([^&;]+?)(&|#|;|$)')
            	.exec(str) || [, ''])[1].replace(/\+/g, '%20')) || null;
        }
    }
    if (isCommonjs) {
        module.exports = URIUtil;
    } else if (isAMD) {
        define(function() {
            return URIUtil;
        });
    } else {
        window.URIUtil = URIUtil;
    }

})();
