// -----------------
// JSDom
// -----------------
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;
global.document = document;
global.window = document.defaultView;
global.requestAnimationFrame = callback => {
    setTimeout(callback, 0);
};

global.window.matchMedia =
    window.matchMedia ||
    (() => {
        return { matches: false, addListener: () => {}, removeListener: () => {} };
    });

global.navigator = {
    userAgent: 'node.js',
    platform: 'Win32'
};

// ------------------
// Chai
// ------------------
const chai = require('chai');
global.expect = chai.expect;


// ------------------
// Helpers
// ------------------
global.itRenders = Component => {
    const wrapper = shallow(Component);
    expect(shallow(Component).length).to.eql(1);
    return wrapper;
};

/*
  Disable webpack-specific 'loaders' for tests
  extensions: [".styl",".css",".png",".jpg",".gif",".svg",".ico"]
*/
require.extensions['.scss'] = function() {
    return null;
};