'use strict';
var assert = require('assert');
var util = require('../uri-util.js');

describe('URI Util', function() {
    describe('getQueryValue', function(argument) {

        describe('uri with query strings starting with a `?`', function() {
            it('should handle uri with query strings', function() {
                var uri = 'http://www.foobar.com?foo=bar';
                assert.deepEqual(util.getQueryValue(uri, 'foo'), 'bar');
            });

            it('should handle uri with multiple query strings', function() {
                var uri = 'http://www.foobar.com?foo=bar&hello=world';
                assert.deepEqual(util.getQueryValue(uri, 'foo'), 'bar');
                assert.deepEqual(util.getQueryValue(uri, 'hello'), 'world');
            });
        });

        describe('query strings only starting witha `?`', function() {
            // body...
            it('should handle query strings', function() {
                var querystring = '?foo=bar';
                assert.deepEqual(util.getQueryValue(querystring, 'foo'), 'bar');
            });

            it('should handle multiple query strings', function() {
                var uri = '?foo=bar&hello=world';
                assert.deepEqual(util.getQueryValue(uri, 'foo'), 'bar');
                assert.deepEqual(util.getQueryValue(uri, 'hello'), 'world');
            });
        });

        describe('uri with query strings starting with a `#`', function() {
            it('should handle uri with query strings', function() {
                var uri = 'http://www.foobar.com#foo=bar';
                assert.deepEqual(util.getQueryValue(uri, 'foo'), 'bar');
            });

            it('should handle uri with multiple query strings', function() {
                var uri = 'http://www.foobar.com#foo=bar&hello=world';
                assert.deepEqual(util.getQueryValue(uri, 'foo'), 'bar');
                assert.deepEqual(util.getQueryValue(uri, 'hello'), 'world');
            });

        });

        describe('query strings only starting witha `#`', function() {
            it('should handle query strings', function() {
                var querystring = '#foo=bar';
                assert.deepEqual(util.getQueryValue(querystring, 'foo'), 'bar');
            });

            it('should handle multiple query strings', function() {
                var uri = '#foo=bar&hello=world';
                assert.deepEqual(util.getQueryValue(uri, 'foo'), 'bar');
                assert.deepEqual(util.getQueryValue(uri, 'hello'), 'world');
            });
        });

    });
});
