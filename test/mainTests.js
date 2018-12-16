// var fs = require('fs');
// var handlebars = require('handlebars');

// require.extensions['.hbs'] = function (module, filename) {
//     var compiled;
//     var raw = fs.readFileSync(filename, 'utf8');
//     compiled = Handlebars.compile(raw);
//     module.exports = compiled;
// }

var main = require('../dist/js/app').getDevice;
var assert = require('chai').assert;

var expect = require('chai').expect;
var should = require('chai').should;

describe('Basic Mocha String Test', () => {
    it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 5);
    });
});

/* test async function
*  test that it renders data in a list
*  test that search input returns filtered data
*  test that user can click on icon to return filtered data
*  test that user can filter data by the ratings
*  test that user can filter by several ratings
*/

// describe('', () => {
//     it('should', function() {

//     });

//     it('should', function() {

//     });

//     it('should', function() {

//     });
// });

// describe('', () => {
//     it('should', function() {

//     });

//     it('should', function() {

//     });

//     it('should', function() {

//     });
// });