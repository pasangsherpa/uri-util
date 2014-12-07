'use strict';
var assert = require('assert');
var util = require('../uri-util.js');

describe('URI Util', function() {
    describe('.getQueryValue()', function(argument) {

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
            it('should handle query strings', function() {
                var querystring = '?foo=bar';
                assert.deepEqual(util.getQueryValue(querystring, 'foo'), 'bar');
            });

            it('should handle multiple query strings', function() {
                var querystring = '?foo=bar&hello=world';
                assert.deepEqual(util.getQueryValue(querystring, 'foo'), 'bar');
                assert.deepEqual(util.getQueryValue(querystring, 'hello'), 'world');
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
                var querystring = '#foo=bar&hello=world';
                assert.deepEqual(util.getQueryValue(querystring, 'foo'), 'bar');
                assert.deepEqual(util.getQueryValue(querystring, 'hello'), 'world');
            });
        });

    });

    describe('.parse()', function() {
        it('should handle query strings starting with a `?`', function() {
            assert.deepEqual(util.parse('?foo=bar'), {
                foo: 'bar'
            });
        });

        it('should handle query strings starting with a `#`', function() {
            assert.deepEqual(util.parse('#foo=bar'), {
                foo: 'bar'
            });
        });

        it('should parse a qseter', function() {
            assert.deepEqual(util.parse('foo=bar'), {
                foo: 'bar'
            });
        });

        it('should parse multiple qseters', function() {
            assert.deepEqual(util.parse('foo=bar&key=val'), {
                foo: 'bar',
                key: 'val'
            });
        });

        it('should parse qseters without a value', function() {
            assert.deepEqual(util.parse('foo'), {
                foo: null
            });
            assert.deepEqual(util.parse('foo&key'), {
                foo: null,
                key: null
            });
            assert.deepEqual(util.parse('foo=bar&key'), {
                foo: 'bar',
                key: null
            });
        });

        it('should return empty object if no qss can be found', function() {
            assert.deepEqual(util.parse('?'), {});
            assert.deepEqual(util.parse('#'), {});
            assert.deepEqual(util.parse(' '), {});
        });

        it('should handle `+` correctly', function() {
            assert.deepEqual(util.parse('foo+faz=bar+baz++'), {
                'foo faz': 'bar baz  '
            });
        });

        it('should handle multiple of the same key', function() {
            assert.deepEqual(util.parse('foo=bar&foo=baz'), {
                foo: ['bar', 'baz']
            });
        });
    });

    describe('.stringify()', function() {
        it('should stringify', function() {
            assert.strictEqual(util.stringify({
                foo: 'bar'
            }), 'foo=bar');
            assert.strictEqual(util.stringify({
                foo: 'bar',
                bar: 'baz'
            }), 'foo=bar&bar=baz');
        });

        it('should handle different types', function() {
            assert.strictEqual(util.stringify(), '');
            assert.strictEqual(util.stringify(0), '');
        });

        it('should URI encode', function() {
            assert.strictEqual(util.stringify({
                'foo bar': 'baz faz'
            }), 'foo%20bar=baz%20faz');
        });

        it('should handle array value', function() {
            assert.strictEqual(util.stringify({
                abc: 'abc',
                foo: ['bar', 'baz']
            }), 'abc=abc&foo=bar&foo=baz');
        });
    });

});
