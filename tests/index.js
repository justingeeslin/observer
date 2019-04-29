const Observer = require('../src/index.js');

describe('Observer', function() {

  beforeAll(function() {
    theObserver = new Observer();
    // Define a component
    SuperComponent = function(options) {
      var self = this;

      var defaults = {};

      $.extend(self, defaults, options);

      return self;
    }
  });

  it('should register a component', function() {
    theObserver.registerComponent('div[super]', SuperComponent);

    expect(theObserver.getInsertableSelectors().indexOf('div[super]') > -1).toBe(true);
  });

  it('should construct the component upon insertion to the document', function(done) {
    // On complete, as it bubbles up from the component
    $(document.body).on('complete', function() {
      console.log('Complete event on body..')
      expect($('div[super]')[0].hasAttribute('constructed')).toBe(true);
      done();
    });

    $(document.body).append('<div super="true"></div>');
  });

});
